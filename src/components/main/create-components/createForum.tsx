import ForumForm, { type forumFormSchemaType } from "../shared/forumForm";

export default function CreateForum() {
	return (
		<>
			<ForumForm
				componentTitle={"Create Forum"}
				submitAction={(data: forumFormSchemaType) => {
					console.log(data);
					throw new Error("Function not implemented.");
				}}
			/>
		</>
	);
}
