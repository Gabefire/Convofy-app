import ForumForm, { type forumFormSchemaType } from "../shared/forumForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { forumFormData } from "../forum/types/forumData";

export default function CreateForum() {
	const navigate = useNavigate();
	const createForum = async (data: forumFormSchemaType) => {
		try {
			const forum = await axios.post<forumFormData>("/api/Forum", data);
			navigate(`/r/${forum.data.title}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<ForumForm componentTitle={"Create Forum"} submitAction={createForum} />
		</>
	);
}
