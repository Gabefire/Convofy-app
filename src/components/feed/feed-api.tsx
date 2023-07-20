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

  useEffect(() => {
    const getPostsData = async () => {
      const db = getFirestore(app);
      try {
        if (home) {
          const forums: QuerySnapshot = await getDocs(
            collectionGroup(db, "forums")
          );
          const tempPosts: postType[] = [];
          for (const forum in forums) {
            const posts: QuerySnapshot = await getDocs(
              collection(db, "forums", forum, "messages")
            );
            if (posts !== undefined) {
              posts.forEach((doc) => {
                const post = doc.data() as postType;
                post.id = doc.id;
                tempPosts.push(post);
              });
            }
          }
          tempPosts.sort((a, b) => {
            if (b.votes > a.votes) {
              return 1;
            } else if (b.votes === a.votes) {
              return 0;
            } else {
              return -1;
            }
          });
          setPosts((prev: postType[]): postType[] => {
            return prev.concat(tempPosts);
          });
        } else {
          const tempPosts: postType[] = [];
          const posts: QuerySnapshot = await getDocs(
            collection(db, "forums", param, "messages")
          );
          if (posts !== undefined) {
            posts.forEach((doc) => {
              const post = doc.data() as postType;
              post.id = doc.id;
              tempPosts.push(post);
            });
            tempPosts.sort((a, b) => {
              if (b.votes > a.votes) {
                return 1;
              } else if (b.votes === a.votes) {
                return 0;
              } else {
                return -1;
              }
            });
            setPosts((prev: postType[]): postType[] => {
              return prev.concat(tempPosts);
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getPostsData();
  }, [param]);

  return <Feed posts={posts} home={home} />;
}
