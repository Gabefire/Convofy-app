import { useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import { QuerySnapshot, getFirestore } from "firebase/firestore";
import { getDocs, collection, collectionGroup } from "firebase/firestore";
import { FirebaseApp } from "../../utli/firebase";
import postType from "../../types/post";
import Feed from "./feed";

export const ACTION = {
  ADD_POSTS: "add-post",
  UP_VOTE: "up-vote",
  DOWN_VOTE: "down-vote",
  DELETE_POST: "delete-post",
  EDIT_POST: "delete-post",
  RESTART: "restart",
};

export type ACTION_TYPE = {
  type: string;
  payload?: { posts?: postType[]; id?: string; uid?: string };
};

const initialState = [] as postType[];

function reducer(posts: postType[], action: ACTION_TYPE): postType[] {
  switch (action.type) {
    case ACTION.ADD_POSTS:
      if (action.payload !== undefined && action.payload.posts !== undefined) {
        return posts.concat(action.payload.posts);
      }
      console.error("no posts to add");
      return posts;
    case ACTION.RESTART:
      return initialState;
    case ACTION.UP_VOTE:
      if (action.payload !== undefined) {
        return posts.map((post) => {
          if (
            action.payload !== undefined &&
            post.id === action.payload.id &&
            action.payload.uid !== undefined
          ) {
            if (!post.upVotes.includes(action.payload.uid)) {
              return {
                ...post,
                upVotes: post.upVotes.concat(action.payload.uid),
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
            action.payload.uid !== undefined
          ) {
            return {
              ...post,
              downVotes: post.downVotes.concat(action.payload.uid),
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

export default function FeedAPI({ home }: { home: boolean }) {
  const [posts, dispatch] = useReducer(reducer, initialState);
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);

  const getPosts = async (forum: string) => {
    const db = getFirestore(app);
    const tempMessages: postType[] = [];
    try {
      const messages = await getDocs(
        collection(db, "forums", forum, "messages")
      );
      if (messages !== undefined) {
        messages.forEach((doc) => {
          const message = doc.data() as postType;
          message.id = doc.id;
          message.forum = forum;
          tempMessages.push(message);
        });
        tempMessages.sort((a, b) => {
          if (
            b.upVotes.length - b.downVotes.length >
            a.upVotes.length - a.downVotes.length
          ) {
            return 1;
          } else if (
            b.upVotes.length - b.downVotes.length ===
            a.upVotes.length - a.downVotes.length
          ) {
            return 0;
          } else {
            return -1;
          }
        });
        dispatch({ type: ACTION.ADD_POSTS, payload: { posts: tempMessages } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    dispatch({ type: ACTION.RESTART });
    const getPostsData = async () => {
      const db = getFirestore(app);
      try {
        if (home) {
          const forums: QuerySnapshot = await getDocs(
            collectionGroup(db, "forums")
          );
          forums.forEach((forum) => {
            getPosts(forum.id);
          });
        } else {
          getPosts(param);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getPostsData();
  }, [param]);

  return <Feed posts={posts} home={home} postFunctions={dispatch} />;
}
