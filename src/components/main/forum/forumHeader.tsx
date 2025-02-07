import { useNavigate, useParams } from "react-router-dom";
import type { forumDataType } from "./types/forumData";
import { useState } from "react";
import { EditDelete, EditDeleteEnum } from "../shared/editDelete";

interface forumHeaderType {
	forumData: forumDataType;
}

export default function ForumHeader({ forumData }: forumHeaderType) {
	const navigate = useNavigate();
	const param = useParams();
	const [headerForumData, setHeaderForumData] = useState(forumData);

	const toggleJoinForum = () => {
		// api call to join forum
		setHeaderForumData((forumData) => ({
			...headerForumData,
			following: !forumData.following,
		}));
	};

	const joinButtonStyle = (
		forumData: forumDataType,
	): undefined | React.CSSProperties => {
		if (!forumData.following) {
			return {
				background: "#1e3a8a",
				border: "1px solid #1e3a8a",
				color: "white",
			};
		}
		return;
	};

	const deleteForum = (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// api to delete forum
		navigate("/r");
	};

	const editForum = (e: React.PointerEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// move to editing page will be create forum component
		navigate(`/r/${forumData.title}/edit-forum`);
	};

	return (
		<div className="dark:bg-neutral-700 bg-white flex flex-col gap-5 pb-8 border-b-neutral-400 border-b dark:border-none">
			<div
				className="h-1/3 min-h-44 w-full"
				style={{ backgroundColor: headerForumData.color }}
			/>
			<div className="flex pl-2 pr-2 items-center gap-2 dark:text-white justify-between flex-wrap">
				<div className="flex items-center gap-2">
					{headerForumData.fileLink ? (
						<img
							src={headerForumData.fileLink}
							className="text-center size-14 rounded-full
								object-fill"
							alt={`${headerForumData.title} icon`}
						/>
					) : (
						<div
							className="text-center size-14 rounded-full
								text-5xl text-white"
							style={{ backgroundColor: headerForumData.color }}
						>
							{headerForumData.title.slice(0, 1)}
						</div>
					)}
					<h1 className="text-3xl">{`r/${headerForumData.title}`}</h1>
				</div>
				<div className="flex gap-2 justify-end">
					<button
						type="button"
						className="text-xs md:text-sm rounded-2xl pt-1 pb-1 pl-2 pr-2 cursor-pointer h-7 min-h-7 text-center leading-normal dark:border-white dark:border bg-neutral-300 dark:bg-transparent font-bold"
						onClick={() => navigate(`/r/${param.id}/create-post`)}
					>
						Create Post
					</button>
					<button
						type="button"
						className="text-xs md:text-sm border
								rounded-2xl pt-1 pb-1 pl-2 pr-2 cursor-pointer
								w-16 min-w-16 max-w-16 h-7 min-h-7 text-center leading-none dark:border-white dark:border bg-neutral-300 dark:bg-transparent font-bold"
						style={joinButtonStyle(headerForumData)}
						onClick={toggleJoinForum}
					>
						{headerForumData.following ? "Joined" : "Join"}
					</button>
					<EditDelete
						deleteObj={deleteForum}
						editObj={editForum}
						ownerUid={headerForumData.owner.id}
						type={EditDeleteEnum.Forum}
					/>
				</div>
			</div>
			<div className="pl-2 pr-2 dark:text-white max-w-6xl ">
				{forumData.description}
			</div>
		</div>
	);
}
