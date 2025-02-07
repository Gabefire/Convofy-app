import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const postFormSchema = z.object({
	title: z.string().min(1, "Title is required").max(20),
	content: z.string().min(1, "Content is required"),
});

export type postFormSchemaType = z.infer<typeof postFormSchema>;

interface postFormType {
	submitAction: (data: postFormSchemaType) => Promise<void>;
	togglePostForm: () => void;
	defaultTitle?: string;
	defaultContent?: string;
	componentTitle: string;
}

export default function PostForm({
	submitAction,
	togglePostForm,
	defaultTitle,
	defaultContent,
	componentTitle,
}: postFormType) {
	const { register, handleSubmit } = useForm<postFormSchemaType>({
		resolver: zodResolver(postFormSchema),
		defaultValues: {
			title: defaultTitle,
			content: defaultContent,
		},
	});

	const submitForm: SubmitHandler<postFormSchemaType> = async (data) => {
		try {
			await submitAction(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form
			className="flex flex-col justify-center items-center gap-4 dark:text-white"
			onSubmit={handleSubmit(submitForm)}
		>
			<div className="flex justify-between items-center w-full">
				<input
					type="button"
					value="x"
					className="cursor-pointer size-8 text-2xl font-light dark:text-white"
					onClick={(e) => {
						e.preventDefault();
						togglePostForm();
					}}
				/>
				<h5>{componentTitle}</h5>
				<input
					type="submit"
					className="cursor-pointer h-8 text-base w-20
                    p-1 rounded-xl bg-green-900 text-center text-white"
					value={"Submit"}
				/>
			</div>
			<label
				className="w-full border dark:border-white border-gray-400 rounded-xl p-2"
				htmlFor="create-input-title"
			>
				<div className="text-xs dark:text-gray-300 text-neutral-500">
					Title<span className="text-red-600">*</span>
				</div>
				<textarea
					className="bg-inherit font-bold text-l w-full resize-none focus:outline-none focus:ring-0"
					id="create-input-title"
					maxLength={150}
					rows={3}
					{...register("title")}
				/>
			</label>
			<label
				className="w-full border rounded-xl p-2 dark:border-white border-gray-400"
				htmlFor={"edit-input-content"}
			>
				<div className="text-xs dark:text-gray-300 text-neutral-500">
					Content<span className="text-red-600">*</span>
				</div>
				<textarea
					className="bg-inherit w-full focus:outline-none focus:ring-0 resize-y "
					id={"edit-input-content"}
					rows={20}
					{...register("content")}
				/>
			</label>
		</form>
	);
}
