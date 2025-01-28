import type { user } from "../../../auth/types/user";

export type forumDataType = {
	color: string;
	description: string;
	fileLink?: string | undefined;
	title: string;
	following: boolean;
	owner: user;
};

export type forumFormData = {
	title: string;
	content: string;
	bannerColor: string;
	file?: Blob;
};
