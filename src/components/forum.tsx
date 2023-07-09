import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FirebaseApp } from "../firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Forum() {
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);
  const [forumExists, setForumExists] = useState(true);
  const [messages, setMessages] = useState(
    [] as { from: string; content: string; date: Date }[]
  );

  useEffect(() => {
    const getForumMessages = async () => {
      const db = getFirestore(app);
      const tempMessages: { from: string; content: string; date: Date }[] = [];
      try {
        const messages = await getDocs(
          collection(db, "forums", param, "/messages")
        );
        messages.forEach((doc) => {
          tempMessages.push(
            doc.data() as { from: string; content: string; date: Date }
          );
        });
        tempMessages.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else {
            return -1;
          }
        });
        setMessages(tempMessages);
      } catch (e) {
        console.error(e);
      }
    };
    getForumMessages();
  });
  return <div className="test">Test\</div>;
}
