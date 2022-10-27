import { rest } from 'msw';
import type { UserGroupDetails } from '@umbraco-cms/models';

export const handlers = [
	rest.get('/umbraco/backoffice/user-groups/list/items', (req, res, ctx) => {
		const items = fakeData;

		const response = {
			total: items.length,
			items,
		};

		return res(ctx.status(200), ctx.json(response));
	}),

	rest.get('/umbraco/backoffice/user-groups/details/:key', (req, res, ctx) => {
		const key = req.params.key as string;
		if (!key) return;

		const userGroup = fakeData.find((x) => x.key === key);

		return res(ctx.status(200), ctx.json(userGroup));
	}),

	rest.get('/umbraco/backoffice/user-groups/getByKeys', (req, res, ctx) => {
		const keys = req.url.searchParams.getAll('key');
		if (keys.length === 0) return;
		const userGroups = fakeData.filter((x) => keys.includes(x.key));

		return res(ctx.status(200), ctx.json(userGroups));
	}),
];

const fakeData: Array<UserGroupDetails> = [
	{
		key: '10000000-0000-0000-0000-000000000000',
		name: 'Administrators',
		icon: 'umb:medal',
		parentKey: '',
		type: 'userGroup',
		hasChildren: false,
		isTrashed: false,
		sections: [],
	},
	{
		key: '20000000-0000-0000-0000-000000000000',
		name: 'Editors',
		icon: 'umb:tools',
		parentKey: '',
		type: 'userGroup',
		hasChildren: false,
		isTrashed: false,
		sections: [],
	},
	{
		key: '30000000-0000-0000-0000-000000000000',
		name: 'Sensitive Data',
		icon: 'umb:lock',
		parentKey: '',
		type: 'userGroup',
		hasChildren: false,
		isTrashed: false,
		sections: [],
	},
	{
		key: '40000000-0000-0000-0000-000000000000',
		name: 'Translators',
		icon: 'umb:globe',
		parentKey: '',
		type: 'userGroup',
		hasChildren: false,
		isTrashed: false,
		sections: [],
	},
	{
		key: '50000000-0000-0000-0000-000000000000',
		name: 'Writers',
		icon: 'umb:edit',
		parentKey: '',
		type: 'userGroup',
		hasChildren: false,
		isTrashed: false,
		sections: [],
	},
];
