import { Post } from "./post";
import { NavLink } from "react-router-dom";
import postType from "./types/post";
import "./feed.css";
import { useEffect, useReducer, useState } from "react";
import {
  POST_ACTION,
  postsInitialState,
  postsReducer,
} from "../../reducers/postsReducer";

interface feedProps {
  forumId: string;
}

export default function Feed({ forumId }: feedProps) {
  const [home, setHome] = useState(true);
  const [postsDispatch, dispatch] = useReducer(postsReducer, postsInitialState);
  useEffect(() => {
    // API for getting all posts based on params
    const getPosts = async () => {
      console.log(forumId);
      try {
        const posts = [
          {
            from: "Gabe",
            content: "I like dogs",
            date: new Date(),
            title: "dogs",
            upVotes: 6,
            downVotes: 8,
            id: 1,
            owner: true,
          },
          {
            from: "Leah",
            content: "Yup dogs are cool",
            date: new Date(),
            title: "dogs v2",
            upVotes: 15,
            downVotes: 8,
            id: 2,
            owner: false,
          },
          {
            from: "Cece",
            content: "But I like cats",
            date: new Date(),
            title: "dogs v67",
            upVotes: 15000,
            downVotes: 8,
            id: 3,
            owner: false,
          },
        ];
        dispatch({ type: POST_ACTION.RESTART });
        dispatch({ type: POST_ACTION.ADD_POSTS, payload: { posts: posts } });
        setHome(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);

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
              <Post home={home} post={post} />
            </div>
          );
        })
      )}
    </div>
  );
}
