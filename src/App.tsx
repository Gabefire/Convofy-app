import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Forum from "./components/forum";
import Login from "./components/login";

import CreateForum from "./components/create-forum";
import CreateMessage from "./components/create-message";
import "./App.css";
import { FirebaseApp } from "./firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

function App() {
  const app = useContext(FirebaseApp);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const createMessage = async (
    forumName: string,
    url: string | null
  ): Promise<void> => {
    console.log(forumName);
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
        from: user,
        date: new Date(),
        votes: 0,
        forum: forumName,
        iconURL: url,
      })
        .then((docRef) => {
          console.log(docRef);
          navigate(`/r/${forumName}`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

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

  useEffect(() => {
    const anonymously = async () => {
      try {
        await signInAnonymously(auth);
      } catch (e) {
        console.error(e);
      }
    };
    anonymously();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route
            path="create-forum"
            element={<CreateForum createForum={createForum} />}
          />{" "}
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="r/:id">
          <Route index element={<Forum />} />
          <Route
            path="create-message"
            element={<CreateMessage createMessage={createMessage} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
