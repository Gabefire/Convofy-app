import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { commentDtoType } from "./types/comment";
import { createComments } from "./util/createComment";

export default function CommentFeed() {
	const param = useParams();
	const [loading, setLoading] = useState(false);
	const [rootComments, setRootComments] = useState([] as commentDtoType[]);

	useEffect(() => {
		const getRootComments = async () => {
			// api to get root comments of post
			const user = {
				displayName: "gabe",
				id: "1",
				color: "#78858B",
			};
			const comment1: commentDtoType = {
				from: user,
				date: new Date(),
				content: "This is a test",
				children: [],
				postId: param.postId as string,
				root: false,
				id: "4",
			};
			const comment2: commentDtoType = {
				from: user,
				date: new Date(),
				content: "This is a test 2",
				children: [comment1],
				postId: param.postId as string,
				root: false,
				id: "3",
			};
			const comment3: commentDtoType = {
				from: user,
				date: new Date(),
				content: "This is a test 3",
				children: [],
				postId: param.postId as string,
				root: false,
				id: "2",
			};
			const comment5: commentDtoType = {
				from: user,
				date: new Date(),
				content: "This is a test 5",
				children: [],
				postId: param.postId as string,
				root: false,
				id: "1",
			};
			const comment4: commentDtoType = {
				from: user,
				date: new Date(),
				content: "This is a test 4",
				children: [comment2, comment3, comment5],
				postId: param.postId as string,
				root: true,
				id: "5",
			};
			setRootComments([comment4]);
			setLoading(false);
		};
		getRootComments();
	}, [param]);

	return <>{loading ? undefined : <div>{createComments(rootComments)}</div>}</>;
}
