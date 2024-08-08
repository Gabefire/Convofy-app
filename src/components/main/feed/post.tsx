import dateConverter from "../../../utli/date";
import PostBottomIcons from "./postBottomIcons";
import type { postType } from "./types/post";
import { useState } from "react";
import { EditPost } from "./editPost";
import type { forumDataType } from "../forum/types/forumData";
import type { user } from "../../auth/types/user";
import { Link } from "react-router-dom";

interface postPropsType {
	showForumInfo: boolean;
	post: postType;
}

export default function Post({ showForumInfo, post }: postPropsType) {
	const [editPost, setEditPost] = useState(false);

	const toggleEditPost = () => {
		setEditPost(!editPost);
	};

	const generateIcon = (obj: forumDataType | user) => {
		let displayName: string;
		if ("displayName" in obj) {
			displayName = obj.displayName;
		} else {
			displayName = obj.title;
		}
		// api call for icon
		return (
			<>
				{obj.icon ? (
					<img
						src={obj.icon}
						alt={`${displayName} icon`}
						className="h-6 w-6 rounded-2xl dark:border border-neutral-400 "
					/>
				) : (
					<div
						className="h-6 w-6 rounded-2xl text-sm text-center border border-neutral-400  text-white"
						style={{ backgroundColor: obj.color }}
					>
						{displayName.slice(0, 1)}
					</div>
				)}
			</>
		);
	};

	return (
		<>
			{editPost ? (
				<EditPost post={post} toggleEditPost={toggleEditPost} />
			) : (
				<>
					<div className="flex dark:text-neutral-300 text-base items-center text-center text-neutral-500">
						{showForumInfo ? (
							<div className="flex gap-6">
								<Link to={`${post.forumData.title}`}>
									<div className="flex gap-1">
										{generateIcon(post.forumData)}
										<div className="self-center text-sm text-center">{`r/${post.forumData.title}`}</div>
									</div>
								</Link>
								<div className="text-sm self-center">{`Posted by u/${post.owner.displayName} • ${dateConverter(
									post.date,
								)}`}</div>
							</div>
						) : (
							<div className="flex gap-6">
								<div className="flex gap-1">
									{generateIcon(post.owner)}
									<div className="self-center text-sm text-center">{`u/${post.owner.displayName} • ${dateConverter(
										post.date,
									)}`}</div>
								</div>
							</div>
						)}
					</div>
					<div className="mt-3 mb-3 flex flex-col gap-2">
						<h3 className="flex font-bold text-l">{post.title}</h3>
						<div className="font-light line-clamp-6 text-base">
							{post.content}
						</div>
					</div>
					<PostBottomIcons post={post} toggleEditPost={toggleEditPost} />
				</>
			)}
		</>
	);
}
