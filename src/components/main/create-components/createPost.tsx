import { useNavigate, useParams } from "react-router-dom";
import PostForm, { type postFormSchemaType } from "../shared/postForum";

export default function CreatePost() {
	const navigate = useNavigate();
	const param = useParams();

	const createPost = async (data: postFormSchemaType) => {
		console.log(data);
		navigate(`/r/${param.id}`);
	};

	return (
		<div className="flex flex-col flex-1 dark:bg-neutral-700 bg-white self-center dark:border-none border-neutral-400 border pl-5 pr-5 pb-3 pt-3 max-w-2xl w-screen md:w-11/12 rounded-xl mt-3 mb-3">
			<PostForm
				submitAction={createPost}
				togglePostForm={() => {
					navigate(`/r/${param.id}`);
				}}
				componentTitle="Create Post"
			/>
		</div>
	);
}
