import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseApp } from "../../utli/firebase";
import { getAuth } from "firebase/auth";

import CreateForum from "./create-forum";

export default function CreateForumAPI() {
  const app = useContext(FirebaseApp);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const createForum = async (e: React.PointerEvent<HTMLInputElement>) => {
    e.preventDefault();
    const forumName = document.getElementById("forum-name") as HTMLInputElement;
    const forumDesc = document.getElementById("forum-desc") as HTMLInputElement;
    const forumBannerColor = document.getElementById(
      "forum-banner-color"
    ) as HTMLInputElement;
    const forumIcon = document.getElementById("forum-icon") as HTMLInputElement;
    const forumRef = ref(storage, `subforum-icons/${forumName.value}/`);
    const forumDoc = await getDoc(doc(db, "forums", forumName.value));
    if (forumDoc.data() !== undefined) {
      console.log("forum already exists by this name");
      return;
    }
    let url: string | null = null;
    if (forumIcon.files !== null && forumIcon.files.length !== 0) {
      url = `subforum-icons/${forumName.value}/`;
      await uploadBytes(forumRef, forumIcon.files[0])
        .then(() => {
          console.log("file uploaded");
        })
        .catch((error) => console.error(error));
    }

    let uid: null | string | undefined = auth.currentUser?.uid;
    if (uid === undefined) {
      uid = null;
    }
    await setDoc(doc(db, "forums", forumName.value), {
      color: forumBannerColor.value,
      description: forumDesc.value,
      icon: url,
      uid: uid,
    }).catch((error) => console.error(error));

    navigate(`/r/${forumName.value}`);
  };

  return <CreateForum createForum={createForum} />;
}
