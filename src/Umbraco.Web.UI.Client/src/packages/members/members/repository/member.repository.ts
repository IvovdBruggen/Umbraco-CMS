import { UmbMemberTreeStore, UMB_MEMBER_TREE_STORE_CONTEXT_TOKEN } from './member.tree.store.js';
import { UmbMemberTreeServerDataSource } from './sources/member.tree.server.data.js';
import { UmbBaseController, type UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import type { UmbTreeRepository } from '@umbraco-cms/backoffice/repository';
import { UmbApi } from '@umbraco-cms/backoffice/extension-api';

export class UmbMemberRepository extends UmbBaseController implements UmbTreeRepository<any>, UmbApi {
	#dataSource: UmbMemberTreeServerDataSource;
	#treeStore?: UmbMemberTreeStore;
	#init;

	constructor(host: UmbControllerHostElement) {
		super(host);
		// TODO: figure out how spin up get the correct data source
		this.#dataSource = new UmbMemberTreeServerDataSource(this);

		this.#init = Promise.all([
			this.consumeContext(UMB_MEMBER_TREE_STORE_CONTEXT_TOKEN, (instance) => {
				this.#treeStore = instance;
			}).asPromise(),
		]);
	}

	// TREE:
	async requestTreeRoot() {
		await this.#init;

		const data = {
			id: null,
			parentId: null,
			type: 'member-root',
			name: 'Members',
			icon: 'icon-folder',
			hasChildren: true,
		};

		return { data };
	}

	async requestRootTreeItems() {
		await this.#init;

		const { data, error } = await this.#dataSource.getRootItems();

		if (data) {
			this.#treeStore?.appendItems(data.items);
		}

		return { data, error };
	}

	async requestTreeItemsOf(parentId: string | null) {
		return { data: undefined, error: { title: 'Not implemented', message: 'Not implemented' } };
	}

	async requestItemsLegacy(ids: Array<string>) {
		await this.#init;

		if (!ids) {
			throw new Error('Ids are missing');
		}

		const { data, error } = await this.#dataSource.getItems(ids);

		return { data, error };
	}

	async rootTreeItems() {
		await this.#init;
		return this.#treeStore!.rootItems;
	}

	async treeItemsOf(parentId: string | null) {
		await this.#init;
		return this.#treeStore!.childrenOf(parentId);
	}

	async itemsLegacy(ids: Array<string>) {
		await this.#init;
		return this.#treeStore!.items(ids);
	}
}
