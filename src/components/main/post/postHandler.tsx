import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { postType } from "./types/post";
import type { forumDataType } from "../forum/types/forumData";
import PostCommentView from "./postCommentView";

export default function PostHandler() {
	const param = useParams();
	const [loading, setLoading] = useState(true);
	const [post, setPost] = useState({} as postType);

	useEffect(() => {
		const getPost = () => {
			const user = {
				displayName: "gabe",
				id: "1",
				color: "#78858B",
			};
			const forumData: forumDataType = {
				color: "#ff0000",
				description:
					"Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??s may be. Which they are. Yummy like a Grisham novel.",
				following: true,
				title: param.id as string,
				owner: user,
			};
			const post: postType = {
				owner: user,
				content: "I like dogs",
				date: new Date(),
				title: "dogs",
				upVotes: 6,
				downVotes: 8,
				id: "1",
				forumData,
				comments: 0,
			};
			setPost(post);
			setLoading(false);
		};
		getPost();
	}, [param]);

	return <>{loading ? null : <PostCommentView post={post} />}</>;
}
