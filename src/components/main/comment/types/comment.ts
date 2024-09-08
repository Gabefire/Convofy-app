import type { user } from "../../../auth/types/user";

export type commentType = {
	from: user;
	date: Date;
	content: string;
	children: commentType[];
	postId: string;
	root: boolean;
};

export interface commentDtoType extends commentType {
	id: string;
	children: commentDtoType[];
}
