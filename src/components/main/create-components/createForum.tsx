import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateForum() {
	const [titleLength, setTitleLength] = useState(0);
	const [descriptionLength, setDescriptionLength] = useState(0);
	const navigate = useNavigate();
	// TODO form validation with tests
	return (
		<form
			className="flex 
						flex-col
						flex-1
						dark:bg-neutral-700 
						bg-white
						dark:border-none
						border-neutral-400
						border
						pl-2
						pr-2
						pb-3
						pt-3
						mt-3
						max-w-2xl
						w-screen
						md:w-11/12
						rounded-xl
						dark:text-white
						self-center
						gap-4"
		>
			<div className="flex justify-between items-center w-full">
				<input
					type="button"
					value="x"
					className="cursor-pointer size-8 text-2xl font-light"
					onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
				/>
				<h5>Create Forum</h5>
				<input
					type="submit"
					className="cursor-pointer h-8 text-base w-20
                    p-1 rounded-xl bg-green-900 text-center text-white"
					value={"Submit"}
				/>
			</div>
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
						onChange={(e) => setTitleLength(e.currentTarget.value.length)}
					/>
				</label>
				<div className="self-end">{`${titleLength}/20`}</div>
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
						onChange={(e) => setDescriptionLength(e.currentTarget.value.length)}
					/>
				</label>
				<div className="self-end mt-0">{`${descriptionLength}/600`}</div>
			</div>
			<section className="flex flex-col md:flex-row justify-between min-w-full p-2 text-sm gap-3">
				<label htmlFor="forum-banner-color" className="flex flex-col">
					Banner Color
					<input
						type="color"
						id="forum-banner-color"
						defaultValue={"#ff3300"}
						className="cursor-pointer"
					/>
				</label>
				<label htmlFor="forum-icon" className="flex flex-col size-30">
					Icon File
					<input
						type="file"
						id="forum-icon"
						className="
								file:mr-5 file:py-1 file:px-3 file:border
								file:text-xs file:font-medium
								file:text-black
								hover:file:cursor-pointer hover:file:bg-blue-50
								hover:file:text-blue-700"
					/>
				</label>
			</section>
		</form>
	);
}
