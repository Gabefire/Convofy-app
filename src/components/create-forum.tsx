import { useContext } from "react";
import "./create-forum.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { FirebaseApp } from "../firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default function CreateForum() {
  const app = useContext(FirebaseApp);
  const storage = getStorage(app);
  const db = getFirestore(app);

  const createForum = async (
    e: React.PointerEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    const forumName = document.getElementById("forum-name") as HTMLInputElement;
    const forumDesc = document.getElementById("forum-desc") as HTMLInputElement;
    const forumBannerColor = document.getElementById(
      "forum-banner-color"
    ) as HTMLInputElement;
    const forumIcon = document.getElementById("forum-icon") as HTMLInputElement;
    const forumRef = ref(storage, `subforum-icons/${forumName.value}/`);
    const testDoc = await getDoc(doc(db, "forums", forumName.value));
    if (testDoc.data() !== undefined) {
      console.log("forum already exists");
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

    await setDoc(doc(db, "forums", forumName.value), {
      color: forumBannerColor.value,
      description: forumDesc.value,
      iconUrl: url,
      owner: "uid",
    }).catch((e) => console.error(e));
  };
  // ToDO form validation
  return (
    <form className="content">
      <label
        htmlFor="forum-name"
        className="forum-container"
        id="forum-name-contain"
      >
        Name
        <input
          type="text"
          id="forum-name"
          placeholder="r/"
          maxLength={20}
          required={true}
        />
        <span>*max length 20 characters</span>
      </label>
      <label
        htmlFor="forum-desc"
        className="forum-container"
        id="forum-desc-contain"
      >
        Description
        <textarea id="forum-desc" rows={4} cols={50} required></textarea>
      </label>
      <section id="style-section">
        <label htmlFor="forum-banner-color">
          Banner Color
          <input
            type="color"
            id="forum-banner-color"
            defaultValue={"#ff3300"}
          />
        </label>
        <label htmlFor="forum-icon">
          Icon File
          <input type="file" id="forum-icon" />
        </label>
      </section>
      <input
        type="submit"
        value={"Submit"}
        id="submit-forum"
        onClick={createForum}
      />
    </form>
  );
}
