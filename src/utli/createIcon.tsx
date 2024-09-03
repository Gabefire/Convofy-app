/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as DefaultForum } from "../assets/default-forum.svg";

export const textColorBasedOnBackground = (backgroundColor: string) => {
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

export const createIcon = (file: FileList | Blob | null, color: string) => {
	if (file instanceof File) {
		return (
			<img
				alt="forum-icon"
				src={URL.createObjectURL(file)}
				className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
			/>
		);
	}
	if (file instanceof FileList && file.length > 0) {
		return (
			<img
				alt="forum-icon"
				src={URL.createObjectURL(file[0])}
				className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
			/>
		);
	}

	if (
		Object.prototype.toString.call(file) ===
		"[object Blob]" /*https://stackoverflow.com/questions/25677681/javascript-file-is-instance-of-file-but-instanceof-file-is-false*/
	) {
		return (
			<img
				alt="forum-icon"
				src={URL.createObjectURL(file as Blob)}
				className="absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
			/>
		);
	}
	return (
		<DefaultForum
			style={{
				background: color,
			}}
			fill={textColorBasedOnBackground(color)}
			className="size-52 p-10 absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2"
		/>
	);
};
