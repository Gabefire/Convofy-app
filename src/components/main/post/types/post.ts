import type { user } from "../../../auth/types/user";
import type { forumDataType } from "../../forum/types/forumData";

export interface postType {
	content: string;
	date: Date;
	title: string;
	upVotes: number;
	downVotes: number;
	id: string;
	owner: user;
	liked?: boolean; // if current user has upvote, downvote or neither (undefined)
	comments: number;
	forumData: forumDataType;
}

export interface submitPostType {
	content: string;
	title: string;
	forumData: forumDataType;
}

export interface editPostType {
	content: string;
	title: string;
	id: string;
}
