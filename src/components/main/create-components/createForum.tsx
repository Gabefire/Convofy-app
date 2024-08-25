import ForumForm, { type forumFormSchemaType } from "../shared/forumform";

export default function CreateForum() {
	// TODO form validation with tests
	return (
		<>
			<ForumForm
				title={"Create Forum"}
				submitAction={(data: forumFormSchemaType) => {
					throw new Error("Function not implemented.");
				}}
			/>
		</>
	);
}
