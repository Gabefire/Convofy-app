import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  QuerySnapshot,
  deleteField,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getDocs, collection, collectionGroup } from "firebase/firestore";
import { FirebaseApp } from "../../utli/firebase";
import postType from "../../types/post";
import Feed from "./feed";

export default function FeedAPI({ home }: { home: boolean }) {
  const [posts, setPosts] = useState([] as postType[]);
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
        setPosts((posts) => posts.concat(tempMessages));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setPosts([]);
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

  return <Feed posts={posts} home={home} />;
}
