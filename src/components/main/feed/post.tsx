import dateConverter from "../../../utli/date";
import { PostBottomIcons } from "./post-bottom-icons";
import type postType from "./types/post";
import { useState } from "react";
import { POST_ACTION } from "./reducers/postsReducer";
import { usePostsDispatch } from "./context/postReducerContext";

interface postPropsType {
	showForumInfo: boolean;
	post: postType;
}

export function Post({ showForumInfo, post }: postPropsType) {
	const [editPost, setEditPost] = useState(false);
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);

	const dispatch = usePostsDispatch();

	const toggleEditPost = () => {
		setEditPost(!editPost);
	};

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
					uid: "test",
				},
			});
		}
		setEditPost(!editPost);
	};

	const createForumTitle = (forumName: string, url?: string) => {
		return (
			<div className="forum-message">
				{url ? (
					<img
						src={url}
						alt={`forum icon ${forumName}`}
						className="icon-message"
					/>
				) : (
					<div className="icon-message" style={{ backgroundColor: "red" }}>
						{forumName.slice(0, 1)}
					</div>
				)}
				<div className="forum-name" data-testid={forumName}>
					{`r/${forumName}`}
				</div>
			</div>
		);
	};

	const createEditPost = () => {
		return (
			<form className="message-content" onSubmit={submitEdit}>
				<label
					htmlFor={`edit-input-title-${post.id}`}
					className="edit-message-label"
				>
					Title:
					<input
						type="text"
						className="message-header edit-title"
						defaultValue={post.title}
						onChange={(e) => {
							if (e.target.value !== null) {
								setTitle(e.target.value);
							}
						}}
						id={`edit-input-title-${post.id}`}
					/>
				</label>
				<label htmlFor={`edit-input-content-${post.id}`}>
					Content:
					<textarea
						className="message-main edit-main"
						id={`edit-input-content-${post.id}`}
						rows={20}
						cols={50}
						defaultValue={post.content}
						onChange={(e) => {
							if (e.target.value !== null) {
								setContent(e.target.value);
							}
						}}
					/>
				</label>
				<input
					type="button"
					value="Cancel"
					className="cancel form-btn"
					onClick={(e) => {
						e.preventDefault();
						toggleEditPost();
					}}
				/>
				<input type="submit" className="submit form-btn" value={"Submit"} />
			</form>
		);
	};

	const createPost = () => {
		return (
			<>
				<div className="message-title">
					{showForumInfo
						? createForumTitle(post.forumData.title, post.forumData.icon)
						: null}
					<div className="from">{`Posted by u/${post.from} ${dateConverter(
						post.date,
					)}`}</div>
				</div>
				<div className="message-content">
					<h4 className="message-header">{post.title}</h4>
					<div className="message-main">{post.content}</div>
				</div>
				<PostBottomIcons post={post} toggleEditPost={toggleEditPost} />
			</>
		);
	};

	return editPost ? createEditPost() : createPost();
}
