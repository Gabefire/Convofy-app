import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FirebaseApp } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function Forum() {
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);
  const [forumExists, setForumExists] = useState(true);
  const [iconUrl, setIconURL] = useState("" as any);
  const [messagesExists, setMessagesExists] = useState(true);
  const [messages, setMessages] = useState(
    [] as { from: string; content: string; date: Date }[]
  );
  const [forumData, setForumData] = useState(
    {} as { color: string; description: string; iconURL: string | null }
  );

  useEffect(() => {
    const getForumData = async () => {
      const db = getFirestore(app);

      try {
        const data = await getDoc(doc(db, "forums", param));
        const dataObject = data.data();
        if (dataObject !== undefined) {
          console.log(dataObject.icon);
          const forumData: {
            color: string;
            description: string;
            iconURL: string | null;
          } = {
            color: dataObject.color,
            description: dataObject.description,
            iconURL: dataObject.icon,
          };
          console.log(forumData);
          setForumData(forumData);
        } else {
          setForumExists(false);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      const tempMessages: { from: string; content: string; date: Date }[] = [];
      try {
        const messages = await getDocs(
          collection(db, "forums", param, "/messages")
        );
        if (messages instanceof Array && messages.length !== 0) {
          messages.forEach((doc) => {
            tempMessages.push(
              doc.data() as { from: string; content: string; date: Date }
            );
          });
          tempMessages.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            } else if (a.date === b.date) {
              return 0;
            } else {
              return -1;
            }
          });
          setMessages(tempMessages);
        } else {
          setMessagesExists(false);
        }
      } catch (e) {
        console.error(e);
      }
      const storage = getStorage();
      console.log(forumData.iconURL);
      if (forumData.iconURL !== null) {
        await getDownloadURL(ref(storage, forumData.iconURL))
          .then((url) => {
            console.log(url);
            setIconURL(url);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    };
    getForumData();
  }, []);

  const makeForum = () => {
    return (
      <div className="forum-content">
        <div id="header">
          <div
            className="banner"
            style={{ backgroundColor: forumData.color }}
          ></div>
          <div className="title">
            {forumData.iconURL ? (
              <img src={iconUrl} />
            ) : (
              <div
                className="icon"
                style={{ backgroundColor: forumData.color }}
              >
                {param.slice(0, 1)}
              </div>
            )}
            <h1>{`r/${param}`}</h1>
          </div>
          <div id="forum-description">{forumData.description}</div>
        </div>
        <div id="messages">
          {messages.map((message) => {
            return (
              <div className="message">
                <div className="message-title">
                  <div className="from">{message.from}</div>
                  <div className="date">{message.date.toString()}</div>
                </div>
                <div className="content">{message.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return forumExists ? (
    makeForum()
  ) : (
    <div id="forum-not-made">Page Does Not Exist</div>
  );
}
