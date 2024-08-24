import { useNavigate, useParams } from "react-router-dom";
import type { FormEvent } from "react";
import PostForm from "../shared/postForum";

export default function CreatePost() {
	const navigate = useNavigate();
	const param = useParams();

	// TODO form validation with tests
	return (
		<div
			className="flex flex-col
								flex-1
								dark:bg-neutral-700 
								bg-white self-center
								dark:border-none
								border-neutral-400
								border
								pl-5
								pr-5
								pb-3
								pt-3
								max-w-2xl
								w-screen
								md:w-11/12
								rounded-xl
								mt-3
								mb-3"
		>
			<PostForm
				submitForm={(event: FormEvent<HTMLFormElement>) => {
					event.preventDefault();
					throw new Error("Function not implemented.");
				}}
				togglePostForm={() => {
					navigate(`/r/${param.id}`);
				}}
				componentTitle="Create Post"
			/>
		</div>
	);
}
