import { useEffect, useState } from "react";
import ForumForm, { type forumFormSchemaType } from "../shared/forumForm";
import type { forumDataType } from "./types/forumData";
import { useParams } from "react-router-dom";

export default function EditForum() {
	const [defaultForum, setDefaultForum] = useState<
		forumFormSchemaType | undefined
	>(undefined);
	const [loading, setLoading] = useState(true);
	const param = useParams();

	useEffect(() => {
		const setForumData = async () => {
			const leah = {
				displayName: "leah",
				id: "2",
				color: "#EFA94A",
			};

			const forumData: forumDataType = {
				color: "#ff0000",
				description:
					"Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??",
				following: true,
				title: param.id as string,
				owner: leah,
				file: "https://picsum.photos/id/237/200/300",
			};
			const file = forumData.file
				? await fetch(forumData.file)
						.then((r) => r.blob())
						.catch(() => null)
				: null;
			setDefaultForum({
				title: forumData.title,
				description: forumData.description,
				color: forumData.color,
				file: file,
			});
			setLoading(false);
		};

		setForumData();
	}, [param]);

	const editForum = (data: forumFormSchemaType) => {
		console.log(data);
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
