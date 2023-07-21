import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { QuerySnapshot, getFirestore } from "firebase/firestore";
import { getDocs, collection, collectionGroup } from "firebase/firestore";
import { FirebaseApp } from "../../utli/firebase";
import postType from "../../types/post";
import Feed from "./feed";

export default function FeedAPI({ home }: { home: boolean }) {
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);
  const [posts, setPosts] = useState([] as postType[]);

  const getPosts = async (forum: string) => {
    setPosts([]);
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
          if (b.votes > a.votes) {
            return 1;
          } else if (b.votes === a.votes) {
            return 0;
          } else {
            return -1;
          }
        });
        setPosts((prev: postType[]): postType[] => {
          return prev.concat(tempMessages);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
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
