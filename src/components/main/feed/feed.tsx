import { Post } from "./post";
import type { postType } from "./types/post";
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
			<div className="flex flex-col justify-center gap-3 				text-white mt-3 mb-3">
				{posts.length === 0 ? (
					<div className="self-center text-lg">No Messages</div>
				) : (
					posts.map((post) => {
						return (
							<div
								className="flex flex-col
								flex-1
								bg-neutral-700 self-center
								pl-5
								pr-5
								pb-3
								pt-3
								max-w-2xl
								w-11/12
								rounded-xl"
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
