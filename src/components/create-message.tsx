import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FirebaseApp } from "../firebase";

interface createMessageType {
  createMessage: (forumName: string, url: string | null) => Promise<void>;
}

export default function CreateMessage({ createMessage }: createMessageType) {
  const forumNameRegex = useLocation().pathname.match(
    /\/r\/(.*)\/create-message/i
  ) as RegExpMatchArray;
  const app = useContext(FirebaseApp);
  const storage = getStorage(app);

  const createMessageOnClick = (e: React.PointerEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (forumNameRegex !== null) {
      const forumName: string = forumNameRegex[1];
      console.log(forumName);
      getDownloadURL(ref(storage, `subforum-icons/${forumName}`))
        .then((url) => {
          createMessage(forumName, url);
        })
        .catch(() => {
          createMessage(forumName, null);
        });
    }
  };

  // ToDO form validation with tests
  return (
    <form action="na" className="content">
      <label htmlFor="message-title">
        Title
        <input type="text" id="message-title" />
      </label>
      <label htmlFor="message-content">
        Content
        <textarea id="message-content" rows={4} cols={50} required></textarea>
      </label>
      <input
        type="submit"
        value="submit"
        id="message-submit-button"
        onClick={createMessageOnClick}
      />
    </form>
  );
}
