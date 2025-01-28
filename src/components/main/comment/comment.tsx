import type { commentDtoType } from "./types/comment";
import dateConverter from "../../../utli/date";
import type { user } from "../../auth/types/user";
import { EditDelete, EditDeleteEnum } from "../shared/editDelete";
import { useState } from "react";
import CommentForm from "./commentForm";

interface CommentType {
	commentData: commentDtoType;
	indentLevel: number;
}

export default function Comment({ commentData, indentLevel }: CommentType) {
	const [reply, setReply] = useState(false);

	//TODO: add dispatch service for comments once api is added

	const createMargin = (numElements: number) => {
		let arraySize = numElements;

		// Only allowing nested comments to display to level 4 will change this later
		// Will likely need to paginate the comment levels to work.
		if (arraySize > 4) {
			arraySize = 4;
		}
		return Array(arraySize)
			.fill(0)
			.map((_, i) => {
				// biome-ignore lint/suspicious/noArrayIndexKey: This is just for visual elements and at max only 4 will be shown.
				return <span key={i} className="w-5 flex-none border-l-[1px]" />;
			});
	};

	const deleteComment = () => {
		//api to delete comment
		console.log("deleted");
	};

	const editComment = () => {
		//api to edit comment
		console.log("edit");
	};

	const generateIcon = (obj: user) => {
		const displayName = obj.displayName;

		// api call for icon
		return (
			<>
				{obj.fileLink ? (
					<img
						src={obj.fileLink}
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
		<div className="flex w-full">
			{createMargin(indentLevel)}
			<div className="flex flex-col border-l-[1px] p-2 w-full">
				<div className="flex dark:text-neutral-300 text-base items-center text-center text-neutral-500">
					<div className="flex gap-6">
						<div className="flex gap-1">
							{generateIcon(commentData.from)}
							<div className="self-center text-sm text-center">{`u/${commentData.from.displayName} • ${dateConverter(
								commentData.date,
							)}`}</div>
						</div>
					</div>
				</div>
				<div className="mt-3 mb-3 flex flex-col gap-2">
					<div className="font-light line-clamp-6 text-base">
						{commentData.content}
					</div>
				</div>
				<div className="flex gap-2 self-end sm:self-start">
					<button
						type="button"
						className="flex items-center justify-center rounded-2xl p-2 w-18 min-w-18 h-7 min-h-7 dark:border-white dark:border bg-neutral-300 dark:bg-transparent md:text-base text-sm"
						onClick={() => setReply(true)}
					>
						Reply
					</button>
					<div className="w-14">
						<EditDelete
							deleteObj={deleteComment}
							editObj={editComment}
							ownerUid={"2"}
							type={EditDeleteEnum.Comment}
						/>
					</div>
				</div>
				{reply ? (
					<div className="w-full mt-2 mb-2">
						<CommentForm
							parentComment={commentData}
							toggleView={() => setReply(false)}
							addComment={() => {
								setReply(false);
							}}
						/>
					</div>
				) : undefined}
			</div>
		</div>
	);
}
