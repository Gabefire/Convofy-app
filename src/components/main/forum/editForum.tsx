import { useEffect, useState } from "react";
import ForumForm, { type forumFormSchemaType } from "../shared/forumForm";
import type { forumDataType } from "./types/forumData";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditForum() {
	const [defaultForum, setDefaultForum] = useState<
		forumFormSchemaType | undefined
	>(undefined);
	const [loading, setLoading] = useState(true);
	const param = useParams();

	useEffect(() => {
		const setForumData = async () => {
			const forum = await axios.get<forumDataType>(`/api/Forum/${param.id}`);
			setDefaultForum({
				title: forum.data.title,
				description: forum.data.description,
				color: forum.data.color,
				file: forum.data.fileLink
					? await fetch(forum.data.fileLink)
							.then((r) => r.blob())
							.catch(() => null)
					: null,
			});
			setLoading(false);
		};

		setForumData();
	}, [param]);

	const editForum = async (data: forumFormSchemaType) => {
		try {
			await axios.put(`/api/Forum/${param.id}`, data);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{loading ? undefined : (
				<ForumForm
					submitAction={editForum}
					componentTitle="Edit Forum"
					defaultForum={defaultForum}
				/>
			)}
		</>
	);
}
