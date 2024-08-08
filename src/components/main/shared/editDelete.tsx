/// <reference types="vite-plugin-svgr/client" />
import { useContext } from "react";
import { ReactComponent as Delete } from "../../../assets/delete.svg";
import { ReactComponent as Edit } from "../../../assets/file-edit.svg";
import { ThemeContext } from "../../../global-contexts/themeContext";

interface EditDeleteType {
	deleteObj: (e: React.PointerEvent<HTMLButtonElement>) => void;
	editObj: (e: React.PointerEvent<HTMLButtonElement>) => void;
	ownerUid: string;
	type: "forum" | "post";
}

export function EditDelete({
	deleteObj,
	editObj,
	ownerUid,
	type,
}: EditDeleteType) {
	// auth context for uid
	const uid = "2";

	const { enabled } = useContext(ThemeContext);

	return (
		<>
			{ownerUid === uid ? (
				<div className="flex gap-4 items-center justify-center rounded-2xl pt-1 pb-1 pl-1 pr-1 w-18 min-w-18 md:pl-2 md:pr-2 h-7 min-h-7 dark:border-white dark:border bg-neutral-300 dark:bg-transparent">
					<button
						type="button"
						aria-label={`delete ${type}`}
						onClick={deleteObj}
						className="cursor-pointer"
					>
						<Delete
							fill={enabled ? "white" : "black"}
							className="size-3 md:size-4 min-w-4"
						/>
					</button>
					<button
						type="button"
						aria-label={`edit ${type}`}
						onClick={editObj}
						className="cursor-pointer"
					>
						<Edit
							fill={enabled ? "white" : "black"}
							className="size-3 md:size-4 min-w-4"
						/>
					</button>
				</div>
			) : null}
		</>
	);
}
