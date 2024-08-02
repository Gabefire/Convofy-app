import { useEffect, useState } from "react";
import "./forum.css";
import Feed from "../feed/feed";
import type postType from "../feed/types/post";
import type { forumDataType } from "./types/forumData";
import { useParams } from "react-router-dom";

export default function Forum() {
	const [forumExists, setForumExists] = useState(false);
	const [forumData, setForumData] = useState({} as forumDataType);
	const [posts, setPosts] = useState([] as postType[]);
	const param = useParams();

	useEffect(() => {
		const getForumData = async () => {
			try {
				// api to get forumData and posts
				const user = {
					displayName: "gabe",
					id: "1",
				};
				const leah = {
					displayName: "leah",
					id: "2",
				};
				const cece = {
					displayName: "cece",
					id: "3",
				};
				const forumData: forumDataType = {
					color: "#ff0000",
					description: "Test description",
					following: true,
					title: param.id as string,
					owner: user,
				};
				const posts: postType[] = [
					{
						owner: user,
						content: "I like dogs",
						date: new Date(),
						title: "dogs",
						upVotes: 6,
						downVotes: 8,
						id: "1",
						forumData,
					},
					{
						owner: leah,
						content: "Yup dogs are cool",
						date: new Date(),
						title: "dogs v2",
						upVotes: 15,
						downVotes: 8,
						id: "2",
						forumData,
					},
					{
						owner: cece,
						content: "But I like cats",
						date: new Date(),
						title: "dogs v67",
						upVotes: 15000,
						downVotes: 8,
						id: "3",
						forumData,
					},
				];

				setForumData(forumData);
				setPosts(posts);
				setForumExists(true);
			} catch (e) {
				console.error(e);
			}
		};
		getForumData();
	}, [param.id]);

	const makeForum = () => {
		return (
			<div className="forum-content">
				<div id="forum-header">
					<div
						className="banner"
						style={{ backgroundColor: forumData.color }}
					/>
					<div className="title">
						{forumData.icon ? (
							<img
								src={forumData.icon}
								className="icon image"
								alt={`${forumData.title} icon`}
								style={{ backgroundColor: forumData.color }}
							/>
						) : (
							<div
								className="icon default"
								style={{ backgroundColor: forumData.color }}
							>
								{forumData.title.slice(0, 1)}
							</div>
						)}
						<h1>{`r/${forumData.title}`}</h1>
					</div>
					<div className="description">
						Description:
						<div id="forum-description">{forumData.description}</div>
					</div>
				</div>
				<Feed initialPosts={posts} showForumInfo={true} />
			</div>
		);
	};

	return (
		<>
			{forumExists ? (
				makeForum()
			) : (
				<div className="forum-content" id="no-forum">
					<div id="no-messages">Page Does Not Exist</div>
				</div>
			)}
		</>
	);
}
