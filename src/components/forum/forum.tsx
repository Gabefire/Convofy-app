import FeedAPI from "../feed/feed-api";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FirebaseApp } from "../../utli/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "./forum.css";

export default function Forum() {
  const param = useParams().id as string;
  const app = useContext(FirebaseApp);
  const [forumExists, setForumExists] = useState(true);
  const [icon, setIcon] = useState("" as any);
  const [forumData, setForumData] = useState(
    {} as { color: string; description: string; icon: string | undefined }
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
            icon: string | undefined;
          } = {
            color: dataObject.color,
            description: dataObject.description,
            icon: dataObject.icon,
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
        } else {
          setForumExists(false);
          return;
        }
      } catch (e) {
        console.error(e);
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
        <FeedAPI home={false} />
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
