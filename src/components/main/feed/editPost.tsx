import { FormEvent, useState } from "react";
import type { postType } from "./types/post";
import { usePostsDispatch } from "./context/postReducerContext";
import { POST_ACTION } from "./reducers/postsReducer";
import PostForm from "../shared/postForum";

interface editPostType {
	post: postType;
	toggleEditCreatePost: () => void;
}

export function EditPost({ post, toggleEditCreatePost }: editPostType) {
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);

	const dispatch = usePostsDispatch();

	const submitEdit = (e: React.PointerEvent<HTMLFormElement>) => {
		console.log(e);
		e.preventDefault();
		if (
			title &&
			content &&
			(post.title !== title || post.content !== content)
		) {
			dispatch({
				type: POST_ACTION.EDIT_POST,
				payload: {
					post: post,
					newTitle: title,
					newContent: content,
					uid: "2",
				},
			});
		}
		toggleEditCreatePost();
	};

	return (
		<PostForm
			submitForm={submitEdit}
			togglePostForm={toggleEditCreatePost}
			componentTitle="Edit Post"
		/>
	);
}
