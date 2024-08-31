import { useEffect, useState } from "react";
import Feed from "../feed/feed";
import type { postType } from "../feed/types/post";
import type { forumDataType } from "./types/forumData";
import { useParams } from "react-router-dom";
import ForumHeader from "./forumHeader";

export default function Forum() {
	const [loading, setLoading] = useState(true);
	const [forumData, setForumData] = useState({} as forumDataType);
	const [posts, setPosts] = useState([] as postType[]);
	const param = useParams();

	useEffect(() => {
		const getForumData = async () => {
			const user = {
				displayName: "gabe",
				id: "1",
				color: "#78858B",
			};
			const leah = {
				displayName: "leah",
				id: "2",
				color: "#EFA94A",
			};
			const cece = {
				displayName: "cece",
				id: "2",
				color: "#31372B",
			};
			const forumData: forumDataType = {
				color: "#ff0000",
				description:
					"Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??s may be. Which they are. Yummy like a Grisham novel.",
				following: true,
				title: param.id as string,
				owner: leah,
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
					comments: 0,
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
					comments: 500,
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
					comments: 22222,
				},
			];

			setForumData(forumData);
			setPosts(posts);
			setLoading(false);
		};
		const getForumDataIcon = async () => {
			const user = {
				displayName: "gabe",
				id: "1",
				color: "#78858B",
			};
			const leah = {
				displayName: "leah",
				id: "2",
				color: "#EFA94A",
			};
			const cece = {
				displayName: "cece",
				id: "2",
				color: "#31372B",
			};
			const forumData: forumDataType = {
				color: "#ff0000",
				description:
					"Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??s may be. Which they are. Yummy like a Grisham novel.",
				following: true,
				title: param.id as string,
				owner: leah,
				file: "cool",
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
					comments: 0,
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
					comments: 500,
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
					comments: 22222,
				},
			];

			setForumData(forumData);
			setPosts(posts);
			setLoading(false);
		};
		if (param.id === "test") {
			getForumData();
		} else {
			getForumDataIcon();
		}
	}, [param.id]);

	return (
		<>
			{loading ? null : (
				<div className="flex flex-col">
					<ForumHeader forumData={forumData} />
					<Feed initialPosts={posts} showForumInfo={false} />
				</div>
			)}
		</>
	);
}
