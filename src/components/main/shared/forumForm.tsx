/// <reference types="vite-plugin-svgr/client" />
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactComponent as DefaultForum } from "../../../assets/default-forum.svg";

const forumFormSchema = z.object({
	title: z.string().min(1, "Title is required").max(20),
	description: z.string().max(600).optional(),
	color: z.string().length(7, "Not a valid color"),
	file: typeof window === "undefined" ? z.undefined() : z.instanceof(FileList),
});

export type forumFormSchemaType = z.infer<typeof forumFormSchema>;

interface ForumFormType {
	title: string;
	submitAction: (data: forumFormSchemaType) => void;
	defaultTitle?: string;
	defaultDescription?: string;
}

export default function ForumForm({
	title,
	submitAction,
	defaultTitle,
	defaultDescription,
}: ForumFormType) {
	const { register, handleSubmit, watch } = useForm<forumFormSchemaType>({
		resolver: zodResolver(forumFormSchema),
		defaultValues: {
			title: defaultTitle,
			description: defaultDescription,
			color: "#ff3300",
		},
	});

	const navigate = useNavigate();

	const submitForm: SubmitHandler<forumFormSchemaType> = async (data) => {
		try {
			const results = await submitAction(data);
			console.log(results);
		} catch (error) {
			console.error(error);
		}
	};

	const textColorBasedOnBackground = (backgroundColor: string) => {
		const color = backgroundColor.substring(1);
		const r = Number.parseInt(color.substring(0, 2), 16); // 0 ~ 255
		const g = Number.parseInt(color.substring(2, 4), 16);
		const b = Number.parseInt(color.substring(4, 6), 16);

		const srgb = [r / 255, g / 255, b / 255];
		const x = srgb.map((i) => {
			if (i <= 0.04045) {
				return i / 12.92;
			}
			return ((i + 0.055) / 1.055) ** 2.4;
		});

		const L = 0.2126 * x[0] + 0.7152 * x[1] + 0.0722 * x[2];
		return L > 0.179 ? "#000" : "#fff";
	};

	const imgSrc = () => {
		const file = watch("file");
		if (file === undefined || file.length === 0) {
			return (
				<DefaultForum
					style={{
						background: watch("color"),
					}}
					fill={textColorBasedOnBackground(watch("color"))}
					className="size-52 p-10 absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
				/>
			);
		}
		return (
			<img
				alt="forum-icon"
				src={URL.createObjectURL(file[0])}
				className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
			/>
		);
	};

	return (
		<form
			className="flex flex-col flex-1 dark:bg-neutral-700 bg-white dark:border-none border-neutral-400 border pl-2 pr-2 pb-3
					   pt-3 mt-3 max-w-2xl w-screen md:w-11/12 rounded-xl dark:text-white self-center gap-4"
			onSubmit={handleSubmit(submitForm)}
		>
			<section className="flex justify-between items-center w-full">
				<input
					type="button"
					value="x"
					className="cursor-pointer size-8 text-2xl font-light w-20"
					onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
				/>
				<h5>{title}</h5>
				<input
					type="submit"
					className="cursor-pointer h-8 text-base w-20
                    p-1 rounded-xl bg-green-900 text-center text-white"
					value={"Submit"}
				/>
			</section>
			<section className="flex flex-col justify-between min-w-full p-2 text-sm gap-3">
				<div className="rounded-full overflow-hidden size-52 relative flex flex-col size-30 self-center">
					{imgSrc()}
					<label
						htmlFor="icon-add"
						className="absolute left-1/2 bg-black -translate-x-1/2 bottom-3 translate-y-1/2 w-52 text-center h-10 text-white pt-1 text-xs cursor-pointer"
					>
						Edit Image
						<input
							type="file"
							id="icon-add"
							className="hidden"
							{...register("file")}
							accept="image/*"
						/>
					</label>
				</div>
				<label htmlFor="forum-banner-color" className="flex flex-col w-full">
					<div style={{ backgroundColor: watch("color") }} className="h-20" />
					<input
						type="color"
						id="forum-banner-color"
						className="cursor-pointer hidden"
						{...register("color")}
					/>
					<div className="dark:bg-black p-2 border-gray-400 border dark:border-none ">
						<span>Forum Theme Color</span>
						<br />
						<span>{`${watch("color")}`}</span>
					</div>
				</label>
			</section>
			<div className="flex flex-col">
				<label
					htmlFor="forum-name"
					className="flex flex-col justify-self-center items-start dark:border-white border-gray-400 border rounded-lg p-1"
				>
					<div className="text-xs dark:text-gray-300 text-neutral-500">
						Name<span className="text-red-600">*</span>
					</div>
					<input
						type="text"
						id="forum-name"
						maxLength={20}
						required={true}
						className="bg-inherit focus:outline-none focus:ring-0 min-w-full text-base"
						{...register("title")}
					/>
				</label>
				<div className="self-end sm:text-base text-xs">{`${watch("title") ? watch("title").length : 0}/20`}</div>
			</div>
			<div className="flex flex-col">
				<label
					className="flex flex-col justify-self-center items-start dark:border-white border-gray-400 border rounded-lg p-1"
					htmlFor="forum-desc"
					id="forum-desc-contain"
				>
					<div className="text-xs dark:text-gray-300 text-neutral-500">
						Description<span className="text-red-600">*</span>
					</div>
					<textarea
						id="forum-desc"
						className="text-base bg-inherit focus:outline-none focus:ring-0 w-full"
						rows={4}
						maxLength={600}
						required={true}
						{...register("description")}
					/>
				</label>
				<div className="self-end mt-0 sm:text-base text-xs">{`${watch("description") ? watch("description")?.length : 0}/600`}</div>
			</div>
		</form>
	);
}
