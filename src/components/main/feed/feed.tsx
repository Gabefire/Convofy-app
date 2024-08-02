import { Post } from "./post";
import type postType from "./types/post";
import "./feed.css";
import { useReducer } from "react";
import { postsReducer } from "./reducers/postsReducer";
import { PostsDispatchContext } from "./context/postReducerContext";

interface FeedType {
	initialPosts: postType[];
	showForumInfo: boolean;
}

export default function Feed({ initialPosts, showForumInfo }: FeedType) {
	const [posts, dispatch] = useReducer(postsReducer, initialPosts);

	return (
		<PostsDispatchContext.Provider value={dispatch}>
			<div id="messages">
				{posts.length === 0 ? (
					<div id="no-messages">No Messages</div>
				) : (
					posts.map((post) => {
						return (
							<div
								className="message"
								key={`message-${post.id}`}
								id={`message-${post.id}`}
							>
								<Post showForumInfo={showForumInfo} post={post} />
							</div>
						);
					})
				)}
			</div>
		</PostsDispatchContext.Provider>
	);
}
