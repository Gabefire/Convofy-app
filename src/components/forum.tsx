import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FirebaseApp } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "./styles/forum.css";
import dateConverter from "../utli/date";

export default function Forum() {
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);
  const [forumExists, setForumExists] = useState(true);
  const [icon, setIcon] = useState("" as any);
  const [messages, setMessages] = useState(
    [] as {
      from: string;
      content: string;
      date: Date;
      title: string;
      votes: number;
      id: string;
    }[]
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
          const forumData: {
            color: string;
            description: string;
            icon: string | null;
          } = {
            color: dataObject.color,
            description: dataObject.description,
            icon: dataObject.icon,
          };
          setForumData(forumData);
        } else {
          setForumExists(false);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      const tempMessages: {
        from: string;
        content: string;
        date: Date;
        title: string;
        votes: number;
        id: string;
      }[] = [];
      try {
        const messages = await getDocs(
          collection(db, "forums", param, "messages")
        );

        if (messages !== undefined) {
          messages.forEach((doc) => {
            const message = doc.data() as {
              from: string;
              content: string;
              date: Date;
              title: string;
              votes: number;
              id: string;
            };
            message.id = doc.id;
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
          setMessages(tempMessages);
        }
      } catch (e) {
        console.error(e);
      }
      const storage = getStorage();

      if (forumData.icon !== null) {
        getDownloadURL(ref(storage, `subforum-icons/${param}`))
          .then((url) => {
            setIcon(url);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    };
    getForumData();
  }, [param]);

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
          <div id="create-message">
            <NavLink to={`create-message`}>
              <div id="create-message-nav">Create Post</div>
            </NavLink>
          </div>
          {messages.length === 0 ? (
            <div id="no-messages">No Messages</div>
          ) : (
            messages.map((message, index) => {
              return (
                <div
                  className="message"
                  key={`message-${index}`}
                  id={`message-${message.id}`}
                >
                  <div className="message-title">
                    <div className="from">{`Posted by u/${
                      message.from
                    } ${dateConverter(message.date)}`}</div>
                  </div>
                  <div className="message-content">
                    <h4>{message.title}</h4>
                    <div>{message.content}</div>
                  </div>
                  <div className="bottom-icons">
                    <div className="likes">{message.votes}</div>
                  </div>
                </div>
              );
            })
          )}
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
