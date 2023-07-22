import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { FirebaseApp } from "../../utli/firebase";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import CreatePost from "./create-post";
import postType from "../../types/post";

export default function CreatePostAPI() {
  const app = useContext(FirebaseApp);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const storage = getStorage(app);

  const createPost = async (forumName: string | null): Promise<void> => {
    if (forumName === null) {
      console.error(`${forumName} can not be null`);
      return;
    }
    let url: string | null;
    try {
      url = await getDownloadURL(ref(storage, `subforum-icons/${forumName}`));
    } catch (e) {
      url = null;
    }

    const messageTitle = document.getElementById(
      "message-title"
    ) as HTMLInputElement;
    const messageContent = document.getElementById(
      "message-content"
    ) as HTMLInputElement;
    let user: null | string | undefined = auth.currentUser?.displayName;
    let uid: null | string | undefined = auth.currentUser?.uid;
    if (user === null || user === undefined) {
      user = "anonymous";
    }
    if (uid === undefined) {
      uid = null;
    }
    if (messageTitle !== null && messageContent !== null) {
      await addDoc(collection(db, "forums", forumName, "messages"), {
        title: messageTitle.value,
        content: messageContent.value,
        uid: uid,
        id: null,
        from: user,
        date: new Date(),
        upVotes: [],
        downVotes: [],
        forum: forumName,
        iconURL: url,
      } as postType)
        .then(() => {
          navigate(`/r/${forumName}`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  return <CreatePost createPost={createPost} />;
}
