import type { forumDataType } from "../../forum/types/forumData";

export default interface postType {
	from: string;
	content: string;
	date: Date;
	title: string;
	upVotes: number;
	downVotes: number;
	id: string;
	ownerUid: string; // uid of owner of post
	liked?: boolean; // if current user has upvote, downvote or neither (undefined)
	forumData: forumDataType;
}
