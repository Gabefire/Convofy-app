import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useContext, useEffect } from "react";
import { FirebaseApp } from "../firebase";

export default function Home() {
  const app = useContext(FirebaseApp);

  useEffect(() => {
    const getForumData = async () => {
      const db = getFirestore(app);

      try {
        const data = await getDocs(collectionGroup(db, "forums"));
        if (data !== undefined) {
          data.forEach((doc) => {
            console.log(doc.id);
          });
        }
      } catch (e) {
        console.error(e);
      }
      getForumData()
  }, []);
  return <div className="content">Test\</div>;
}
