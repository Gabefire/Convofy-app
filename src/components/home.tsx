import { collectionGroup, getDocs, getFirestore } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { FirebaseApp } from "../firebase";

export default function Home() {
  const app = useContext(FirebaseApp);

  useEffect(() => {
    const getForumData = async () => {
      const db = getFirestore(app);
      console.log("test");

      try {
        const data = await getDocs(collectionGroup(db, "forums"));
        if (data) {
          console.log(data);
          data.forEach((doc) => {
            console.log(doc.data());
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getForumData();
  }, []);
  return <div className="content">Test\</div>;
}
