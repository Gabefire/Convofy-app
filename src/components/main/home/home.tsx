import { useEffect, useState } from "react";
import Feed from "../header/feed";
import type { postType } from "../feed/types/post";
import type { forumDataType } from "../forum/types/forumData";

export default function Home() {
	const [posts, setPosts] = useState([] as postType[]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const getForumData = async () => {
			// api to get forumData and posts
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
				id: "3",
				color: "#31372B",
			};
			const forumData: forumDataType = {
				color: "#0000ff",
				description: "Test description",
				following: true,
				title: "test",
				owner: user,
			};
			const posts: postType[] = [
				{
					owner: user,
					content: "I like dogs",
					date: new Date(),
					title:
						"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque.",
					upVotes: 6,
					downVotes: 8,
					id: "1",
					forumData,
					comments: 2200000,
				},
				{
					owner: leah,
					content:
						"Just the day before, our host had written of the challenges of writing short. In journalism–my friend’s chosen trade, and mostly my own, too–Mark Twain’s observation undoubtedly applies: “I didn’t have time to write a short letter, so I wrote a long one instead.” The principle holds across genres, in letters, reporting, and other writing. It’s harder to be concise than to blather. (Full disclosure, this blog post will clock in at a blather-esque 803 words.) Good writing is boiled down, not baked full of air like a souffl??. No matter how yummy souffl??s may be. Which they are. Yummy like a Grisham novel.",
					date: new Date(),
					title: "dogs v2",
					upVotes: 150,
					downVotes: 8,
					id: "2",
					forumData,
					comments: 22222,
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
					comments: 0,
				},
			];

			setPosts(posts);
			setLoaded(true);
		};
		getForumData();
	}, []);

	return (
		<div className="m-0 w-auto">
			{loaded ? <Feed initialPosts={posts} showForumInfo={true} /> : null}
		</div>
	);
}
