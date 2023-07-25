import FeedAPI from "../feed/feed-api";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FirebaseApp } from "../../utli/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "./forum.css";

export default function Forum() {
  const param = decodeURI(useParams().id as string);
  const app = useContext(FirebaseApp);
  const [forumExists, setForumExists] = useState(false);
  const [icon, setIcon] = useState("" as any);
  const [forumData, setForumData] = useState({
    color: "",
    description: "",
    icon: "",
    title: "",
  } as {
    color: string;
    description: string;
    icon: string | undefined;
    title: string;
  });

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
            icon: string | undefined;
            title: string;
          } = {
            color: dataObject.color,
            description: dataObject.description,
            icon: dataObject.icon,
            title: param,
          };
          setForumData(forumData);
          if (typeof forumData.icon === "string") {
            const storage = getStorage();
            await getDownloadURL(ref(storage, `subforum-icons/${param}`))
              .then((url) => {
                setIcon(url);
              })
              .catch((e) => {
                console.error(e);
              });
          }
          setForumExists(true);
        }
      } catch (e) {
        console.error(e);
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
                {forumData.title.slice(0, 1)}
              </div>
            )}
            <h1>{`r/${forumData.title}`}</h1>
          </div>
          <div className="description">
            Description:
            <div id="forum-description">{forumData.description}</div>
          </div>
        </div>
        <FeedAPI forumName={param} />
      </div>
    );
  };

  return (
    <>
      {forumExists ? (
        makeForum()
      ) : (
        <div className="forum-content" id="no-forum">
          <div id="no-messages">Page Does Not Exist</div>
        </div>
      )}
    </>
  );
}
