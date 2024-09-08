import type { ReactNode } from "react";
import type { commentDtoType } from "../types/comment";
import Comment from "../comment";

export const createComments = (
	comments: commentDtoType[],
	increment = -1,
): ReactNode => {
	if (comments.length === 0) {
		return <></>;
	}
	const newIncrement = increment + 1;
	return comments.map((comment) => {
		return (
			<div key={comment.id}>
				<div className="flex w-full">
					<Comment commentData={comment} indentLevel={newIncrement} />
				</div>
				{createComments(comment.children, newIncrement)}
			</div>
		);
	});
};
