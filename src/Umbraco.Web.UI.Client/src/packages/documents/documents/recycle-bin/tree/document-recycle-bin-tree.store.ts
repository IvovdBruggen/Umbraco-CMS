import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import type { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller-api';
import { UmbUniqueTreeStore } from '@umbraco-cms/backoffice/tree';

/**
 * @export
 * @class UmbDocumentRecycleBinTreeStore
 * @extends {UmbStoreBase}
 * @description - Tree Data Store for Document Recycle Bin Tree Items
 */
export class UmbDocumentRecycleBinTreeStore extends UmbUniqueTreeStore {
	/**
	 * Creates an instance of UmbDocumentRecycleBinTreeStore.
	 * @param {UmbControllerHostElement} host
	 * @memberof UmbDocumentRecycleBinTreeStore
	 */
	constructor(host: UmbControllerHostElement) {
		super(host, UMB_DOCUMENT_RECYCLE_BIN_TREE_STORE_CONTEXT.toString());
	}
}

export const UMB_DOCUMENT_RECYCLE_BIN_TREE_STORE_CONTEXT = new UmbContextToken<UmbDocumentRecycleBinTreeStore>(
	'UmbDocumentRecycleBinTreeStore',
);
