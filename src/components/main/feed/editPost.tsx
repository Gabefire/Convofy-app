import { useContext, useState } from "react";
import type { postType } from "./types/post";
import { usePostsDispatch } from "./context/postReducerContext";
import { POST_ACTION } from "./reducers/postsReducer";

interface editPostType {
	post: postType;
	toggleEditPost: () => void;
}

export function EditPost({ post, toggleEditPost }: editPostType) {
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);

	const dispatch = usePostsDispatch();

	const submitEdit = (e: React.PointerEvent<HTMLFormElement>) => {
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
		toggleEditPost();
	};

	return (
		<form
			className="flex flex-col justify-center items-center gap-4"
			onSubmit={submitEdit}
		>
			<div className="flex justify-between items-center w-full">
				<input
					type="button"
					value="x"
					className="cursor-pointer size-8 text-2xl font-light"
					onClick={(e) => {
						e.preventDefault();
						toggleEditPost();
					}}
				/>
				<h5>Edit Post</h5>
				<input
					type="submit"
					className="cursor-pointer h-8 text-base w-20
                    p-1 rounded-xl bg-green-900 text-center dark:text-black text-white"
					value={"Submit"}
				/>
			</div>
			<label
				className="w-full border dark:border-white border-gray-400 rounded-xl p-2"
				htmlFor={`edit-input-title-${post.id}`}
			>
				<div className="text-xs dark:text-gray-300 text-neutral-500">
					Title<span className="text-red-600">*</span>
				</div>
				<textarea
					className="bg-inherit font-bold text-l w-full resize-none focus:outline-none focus:ring-0"
					id={`edit-input-title-${post.id}`}
					maxLength={150}
					rows={3}
					defaultValue={post.title}
					onChange={(e) => {
						if (e.target.value !== null) {
							setTitle(e.target.value);
						}
					}}
				/>
			</label>
			<label
				className="w-full border rounded-xl p-2 dark:border-white border-gray-400"
				htmlFor={`edit-input-content-${post.id}`}
			>
				<div className="text-xs dark:text-gray-300 text-neutral-500">
					Content<span className="text-red-600">*</span>
				</div>
				<textarea
					className="bg-inherit w-full focus:outline-none focus:ring-0 resize-y "
					id={`edit-input-content-${post.id}`}
					rows={20}
					defaultValue={post.content}
					onChange={(e) => {
						if (e.target.value !== null) {
							setContent(e.target.value);
						}
					}}
				/>
			</label>
		</form>
	);
}
