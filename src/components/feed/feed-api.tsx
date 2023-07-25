import { useEffect, useContext, useState } from "react";
import { QuerySnapshot, getFirestore } from "firebase/firestore";
import { getDocs, collection, collectionGroup } from "firebase/firestore";
import { FirebaseApp } from "../../utli/firebase";
import postType from "../../types/post";
import Feed from "./feed";

export default function FeedAPI({ forumName }: { forumName: string | false }) {
  const [posts, setPosts] = useState([] as postType[]);
  const app = useContext(FirebaseApp);
  const [home, setHome] = useState(false);

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
    if (!forumName) {
      setHome(true);
    }
    setPosts([]);
    const getPostsData = async () => {
      const db = getFirestore(app);
      try {
        if (!forumName) {
          setHome(true);
          const forums: QuerySnapshot = await getDocs(
            collectionGroup(db, "forums")
          );
          forums.forEach((forum) => {
            getPosts(forum.id);
          });
        } else {
          getPosts(forumName);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getPostsData();
  }, [forumName]);

  return <Feed posts={posts} home={home} />;
}
