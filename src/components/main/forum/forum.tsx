import { useEffect, useState } from "react";
import Feed from "../feed/feed";
import type { postType } from "../post/types/post";
import type { forumDataType } from "./types/forumData";
import { useParams } from "react-router-dom";
import ForumHeader from "./forumHeader";
import axios from "axios";
export default function Forum() {
	const [loading, setLoading] = useState(true);
	const [forumData, setForumData] = useState({} as forumDataType);
	const [posts, setPosts] = useState([] as postType[]);
	const param = useParams();

	useEffect(() => {
		const getForumData = async () => {
			try {
				const [forum, posts] = await Promise.all([
					axios.get<forumDataType>(`/api/Forum/${param.id}`),
					axios.get<postType[]>(`/api/Forum/${param.id}/posts`),
				]);

				setForumData(forum.data);
				setPosts(posts.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		getForumData();
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
