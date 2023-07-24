import { useLocation } from "react-router-dom";

interface createPostProps {
  createPost: (forumName: string | null) => Promise<void>;
}

export default function CreatePost({ createPost }: createPostProps) {
  const forumNameRegex = useLocation().pathname.match(
    /\/r\/(.*)\/create-message/i
  ) as RegExpMatchArray;

  const createMessageOnClick = (e: React.PointerEvent<HTMLInputElement>) => {
    e.preventDefault();
    let forumName: string | null;
    if (forumNameRegex !== null) {
      forumName = forumNameRegex[1];
    } else {
      forumName = null;
    }
    createPost(forumName);
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
        className="submit form-btn"
        onClick={createMessageOnClick}
      />
    </form>
  );
}
