import postType from "../components/feed/post";
import { POSTS_ACTION_TYPE } from "./postsReducerTypes";

export const POST_ACTION = {
    ADD_POSTS: "add-post",
    UP_VOTE: "up-vote",
    DOWN_VOTE: "down-vote",
    DELETE_POST: "delete-post",
    EDIT_POST: "edit-post",
    RESTART: "restart",
  };

export const postsInitialState = [] as postType[];

export function postsReducer(posts: postType[], action: POSTS_ACTION_TYPE): postType[] {
  switch (action.type) {
    case POST_ACTION.ADD_POSTS:
      if (action.payload !== undefined && action.payload.posts !== undefined) {
        return posts.concat(action.payload.posts);
      }
      console.error("no posts to add");
      return posts;
    case POST_ACTION.DELETE_POST:
      if (action.payload !== undefined && action.payload.id !== undefined) {
        return posts.filter((post) => post.id !== action.payload?.id);
      }
      return posts;
    case POST_ACTION.RESTART:
      return initialState;
    case POST_ACTION.UP_VOTE:
      if (action.payload !== undefined) {
        return posts.map((post) => {
          if (
            action.payload !== undefined &&
            post.id === action.payload.id &&
            action.payload.uid !== undefined &&
            post.upVotes !== undefined
          ) {
            if (!post.upVotes.includes(action.payload.uid)) {
              return {
                ...post,
                upVotes: post.upVotes.concat(action.payload.uid),
                downVotes: post.downVotes.filter(
                  (uid) => uid !== action.payload?.uid
                ),
              };
            } else {
              return {
                ...post,
                upVotes: post.upVotes.filter(
                  (uid) => uid !== action.payload?.uid
                ),
              };
            }
          }
          return post;
        });
      }
      return posts;
    case POST_ACTION.DOWN_VOTE:
      if (action.payload !== undefined) {
        return posts.map((post) => {
          if (
            action.payload !== undefined &&
            post.id === action.payload.id &&
            action.payload.uid !== undefined &&
            post.downVotes !== undefined
          ) {
            if (!post.downVotes.includes(action.payload.uid)) {
              return {
                ...post,
                downVotes: post.downVotes.concat(action.payload.uid),
                upVotes: post.upVotes.filter(
                  (uid) => uid !== action.payload?.uid
                ),
              };
            } else {
              return {
                ...post,
                downVotes: post.downVotes.filter(
                  (uid) => uid !== action.payload?.uid
                ),
              };
            }
          }
          return post;
        });
      }
      return posts;
    case POST_ACTION.EDIT_POST:
      if (
        action.payload !== undefined &&
        action.payload.id !== undefined &&
        action.payload.title !== undefined &&
        action.payload.content !== undefined
      ) {
        return posts.map((post) => {
          if (post.id === action.payload?.id) {
            return {
              ...post,
              title: action.payload.title as string,
              content: action.payload.content as string,
            };
          }
          return post;
        });
      }
      return posts;
    default:
      return posts;
  }
}