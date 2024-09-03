import type { forumDataType } from "../components/main/forum/types/forumData";
import type { postType } from "../components/main/post/types/post";

export const generatePosts = () => {
	const owner1 = {
		displayName: "owner1",
		id: "1",
		color: "#EFA94A",
	};
	const owner2 = {
		displayName: "owner2",
		id: "2",
		color: "#78858B",
	};
	const forumData1: forumDataType = {
		color: "#ff0000",
		description: "Test description",
		following: true,
		title: "test1",
		owner: owner1,
	};
	const forumData3: forumDataType = {
		color: "#ff0000",
		description: "Test description",
		following: true,
		title: "test1",
		owner: owner1,
		file: "icon",
	};
	const forumData2: forumDataType = {
		color: "#ff0000",
		description: "Test description",
		following: true,
		title: "test2",
		owner: owner2,
	};
	const message1: postType = {
		owner: owner2,
		content: "test",
		date: new Date(),
		title: "test",
		upVotes: 0,
		downVotes: 0,
		id: "1",
		forumData: forumData1,
		comments: 0,
	};
	const message2: postType = {
		owner: owner1,
		content: "test",
		date: new Date(),
		title: "test",
		upVotes: 0,
		downVotes: 0,
		id: "2",
		forumData: forumData2,
		comments: 0,
	};
	const message3: postType = {
		owner: owner1,
		content: "test",
		date: new Date(),
		title: "test",
		upVotes: 0,
		downVotes: 0,
		id: "3",
		forumData: forumData3,
		comments: 0,
	};

	return [message1, message2, message3];
};
