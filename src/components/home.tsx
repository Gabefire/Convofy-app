import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FirebaseApp } from "../firebase";
import { messageType } from "./forum";
import Messages from "./messages";
import "./styles/home.css";

export default function Home() {
  const app = useContext(FirebaseApp);
  const [messagesArray, setMessages] = useState([] as messageType[]);

  const getMessages = async (forum: string) => {
    const db = getFirestore(app);
    const tempMessages: messageType[] = [];
    try {
      const messages = await getDocs(
        collection(db, "forums", forum, "messages")
      );

      if (messages !== undefined) {
        messages.forEach((doc) => {
          const message = doc.data() as messageType;
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
        setMessages((prev: messageType[]): messageType[] => {
          return prev.concat(tempMessages);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getForumData = async () => {
      const db = getFirestore(app);
      console.log("test");

      try {
        const data = await getDocs(collectionGroup(db, "forums"));
        if (data) {
          console.log(data);
          data.forEach((doc) => {
            console.log(doc.id);
            getMessages(doc.id);
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getForumData();
  }, []);

  return (
    <div id="home">
      <Messages messages={messagesArray} home={true} />
    </div>
  );
}
