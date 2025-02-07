import type { postType } from "./types/post";
import { usePostsDispatch } from "../feed/context/postReducerContext";
import { POST_ACTION } from "./reducers/postsReducer";
import PostForm, { type postFormSchemaType } from "../shared/postForm";
import axios from "axios";
import { AuthContext } from "../../../global-contexts/authProvider";
import { useContext } from "react";
interface editPostType {
	post: postType;
	toggleEditCreatePost: () => void;
}

export function EditPost({ post, toggleEditCreatePost }: editPostType) {
	const dispatch = usePostsDispatch();
	const { user } = useContext(AuthContext);
	const submitEdit = async (data: postFormSchemaType) => {
		try {
			if (data.title !== post.title && data.content !== post.content) {
				dispatch({
					type: POST_ACTION.EDIT_POST,
					payload: {
						post: post,
						newTitle: data.title,
						newContent: data.content,
						uid: user?.id ?? "",
					},
				});
			}
			await axios.put(`/api/Post/${post.id}`, {
				title: data.title,
				content: data.content,
				id: post.id,
			});
		} catch (error) {
			console.error(error);
		} finally {
			toggleEditCreatePost();
		}
	};

	return (
		<PostForm
			submitAction={submitEdit}
			togglePostForm={toggleEditCreatePost}
			componentTitle="Edit Post"
			defaultTitle={post.title}
			defaultContent={post.content}
		/>
	);
}
