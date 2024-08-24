import type { user } from "../../auth/types/user";
import type { forumDataType } from "../forum/types/forumData";

interface objIconType {
	obj: forumDataType | user;
}

export function ObjIcon({ obj }: objIconType) {
	return (
		<>
			{obj.icon ? (
				<img
					src={obj.icon}
					alt={`${"title" in obj ? obj.title : obj.displayName} icon`}
					className="h-6 w-6 min-h-6 min-w-6 rounded-2xl dark:border border-neutral-400 "
				/>
			) : (
				<div
					className="h-6 w-6 min-h-6 min-w-6 rounded-2xl text-sm text-center border border-neutral-400  text-white"
					style={{ backgroundColor: obj.color }}
				>
					{"title" in obj ? obj.title.slice(0, 1) : obj.displayName.slice(0, 1)}
				</div>
			)}
		</>
	);
}
