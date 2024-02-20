import type { UmbDocumentEntityType } from './entity.js';
import type { UmbVariantModel } from '@umbraco-cms/backoffice/variant';
import { DocumentVariantStateModel as UmbDocumentVariantState } from '@umbraco-cms/backoffice/external/backend-api';
export { UmbDocumentVariantState };

export interface UmbDocumentDetailModel {
	documentType: {
		unique: string;
		hasCollection: boolean;
	};
	entityType: UmbDocumentEntityType;
	isTrashed: boolean;
	template: { unique: string } | null;
	unique: string;
	parentUnique: string | null;
	urls: Array<UmbDocumentUrlInfoModel>;
	values: Array<UmbDocumentValueModel>;
	variants: Array<UmbDocumentVariantModel>;
}

export interface UmbDocumentVariantModel extends UmbVariantModel {
	state: UmbDocumentVariantState | null;
	publishDate: string | null;
}

export interface UmbDocumentUrlInfoModel {
	culture: string | null;
	url: string;
}

export interface UmbDocumentValueModel<ValueType = unknown> {
	culture: string | null;
	segment: string | null;
	alias: string;
	value: ValueType;
}
