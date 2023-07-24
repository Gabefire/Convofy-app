import { Post } from "./post";
import { NavLink } from "react-router-dom";
import postType from "../../types/post";
import "./feed.css";
import { useEffect, useReducer } from "react";

export const ACTION = {
  ADD_POSTS: "add-post",
  UP_VOTE: "up-vote",
  DOWN_VOTE: "down-vote",
  DELETE_POST: "delete-post",
  EDIT_POST: "edit-post",
  RESTART: "restart",
};

export type ACTION_TYPE = {
  type: string;
  payload?: {
    posts?: postType[];
    id?: string;
    uid?: string;
    title?: string;
    content?: string;
  };
};

const initialState = [] as postType[];

export function reducer(posts: postType[], action: ACTION_TYPE): postType[] {
  switch (action.type) {
    case ACTION.ADD_POSTS:
      if (action.payload !== undefined && action.payload.posts !== undefined) {
        return posts.concat(action.payload.posts);
      }
      console.error("no posts to add");
      return posts;
    case ACTION.DELETE_POST:
      if (action.payload !== undefined && action.payload.id !== undefined) {
        return posts.filter((post) => post.id !== action.payload?.id);
      }
      return posts;
    case ACTION.RESTART:
      return initialState;
    case ACTION.UP_VOTE:
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
    case ACTION.DOWN_VOTE:
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
    case ACTION.EDIT_POST:
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

interface feedProps {
  posts: postType[];
  home: boolean;
}

export default function Feed({ posts, home }: feedProps) {
  const [postsDispatch, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: ACTION.ADD_POSTS, payload: { posts: posts } });
  }, [posts]);

  const createPostComponent = () => {
    return (
      <div id="create-message">
        <NavLink to={`create-message`}>
          <div id="create-message-nav">Create Post</div>
        </NavLink>
      </div>
    );
  };

  return (
    <div id="messages">
      {home ? null : createPostComponent()}
      {postsDispatch.length === 0 ? (
        <div id="no-messages">No Messages</div>
      ) : (
        postsDispatch.map((post, index) => {
          return (
            <div
              className="message"
              key={`message-${index}`}
              id={`message-${post.id}`}
            >
              <Post home={home} post={post} dispatch={dispatch} />
            </div>
          );
        })
      )}
    </div>
  );
}
