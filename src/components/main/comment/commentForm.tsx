import { type FormEvent, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type { commentType } from "./types/comment";

interface CommentFormType {
	parentComment: commentType | null;
	toggleView: () => void;
	addComment: (parentComment: commentType, newComment: commentType) => void;
}

export default function CommentForm({
	parentComment,
	toggleView,
	addComment,
}: CommentFormType) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const param = useParams();

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.focus();
		}
	}, []);

	const submitComment = (e: FormEvent) => {
		const user = {
			displayName: "gabe",
			id: "1",
			color: "#78858B",
		};
		e.preventDefault();
		if (textAreaRef.current?.value && textAreaRef.current?.value !== "") {
			// api call to submit comment
			const comment: commentType = {
				from: user,
				content: textAreaRef.current?.value,
				date: new Date(),
				children: [],
				postId: param.parentId as string,
				root: !parentComment,
			};
			console.log(comment);
			if (parentComment) {
				addComment(parentComment, comment);
			}
			toggleView();
		} else {
			textAreaRef.current?.focus();
		}
	};

	return (
		<form
			className="rounded-xl w-full border border-neutral-400 dark:border-neutral-500 p-1"
			onSubmit={submitComment}
		>
			<label htmlFor="comment-input">
				<textarea
					id="comment-input"
					className="md:text-base text-sm bg-inherit focus:outline-none focus:ring-0 w-full resize-y"
					ref={textAreaRef}
				/>
			</label>
			<section className="flex justify-end gap-3">
				<input
					type="button"
					value={"Cancel"}
					onClick={toggleView}
					className="cursor-pointer text-xs
                     pt-1 pb-1 pl-2 pr-2 rounded-xl bg-red-600 text-center text-white"
				/>
				<input
					type="submit"
					value={"Submit"}
					className="cursor-pointer text-xs
                    pt-1 pb-1 pl-2 pr-2 rounded-xl bg-green-900 text-center text-white"
				/>
			</section>
		</form>
	);
}
