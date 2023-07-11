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
import "./forum.css";

export default function Forum() {
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);
  const [forumExists, setForumExists] = useState(true);
  const [icon, seticon] = useState("" as any);
  const [messages, setMessages] = useState(
    [] as { from: string; content: string; date: Date }[]
  );
  const [forumData, setForumData] = useState(
    {} as { color: string; description: string; icon: string | null }
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
            icon: string | null;
          } = {
            color: dataObject.color,
            description: dataObject.description,
            icon: dataObject.icon,
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
        }
      } catch (e) {
        console.error(e);
      }
      const storage = getStorage();

      if (forumData.icon !== null) {
        console.log(ref(storage, forumData.icon));
        getDownloadURL(ref(storage, `subforum-icons/${param}`))
          .then((url) => {
            console.log(url);
            seticon(url);
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
        <div id="forum-header">
          <div
            className="banner"
            style={{ backgroundColor: forumData.color }}
          ></div>
          <div className="title">
            {forumData.icon ? (
              <img
                src={icon}
                className="icon image"
                style={{ backgroundColor: forumData.color }}
              />
            ) : (
              <div
                className="icon default"
                style={{ backgroundColor: forumData.color }}
              >
                {param.slice(0, 1)}
              </div>
            )}
            <h1>{`r/${param}`}</h1>
          </div>
          <div className="description">
            Description:
            <div id="forum-description">{forumData.description}</div>
          </div>
        </div>
        <div id="messages">
          {/*messages.map((message) => {
            return (
              <div className="message">
                <div className="message-title">
                  <div className="from">{message.from}</div>
                  <div className="date">{message.date.toString()}</div>
                </div>
                <div className="content">{message.content}</div>
              </div>
            );
          })*/}
        </div>
      </div>
    );
  };

  return (
    <>
      {forumExists ? (
        makeForum()
      ) : (
        <div id="forum-not-made">Page Does Not Exist</div>
      )}
    </>
  );
}
