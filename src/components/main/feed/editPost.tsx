import type { postType } from "./types/post";
import { usePostsDispatch } from "./context/postReducerContext";
import { POST_ACTION } from "./reducers/postsReducer";
import PostForm, { type postFormSchemaType } from "../shared/postForum";

interface editPostType {
	post: postType;
	toggleEditCreatePost: () => void;
}

export function EditPost({ post, toggleEditCreatePost }: editPostType) {
	const dispatch = usePostsDispatch();

	const submitEdit = (data: postFormSchemaType) => {
		dispatch({
			type: POST_ACTION.EDIT_POST,
			payload: {
				post: post,
				newTitle: data.title,
				newContent: data.content,
				uid: "2",
			},
		});

		toggleEditCreatePost();
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
