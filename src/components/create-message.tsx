import { useLocation } from "react-router-dom";

interface createMessageType {
  createMessage: (forumName: string) => Promise<void>;
}

export default function CreateMessage({ createMessage }: createMessageType) {
  const forumNameRegex = useLocation().pathname.match(
    /\/r\/(.*)\/create-message/i
  ) as RegExpMatchArray;

  const createMessageOnClick = (e: React.PointerEvent<HTMLInputElement>) => {
    let forumName;
    if (forumNameRegex !== null) {
      forumName = forumNameRegex[1];
    }
    e.preventDefault();
    createMessage(forumName as string);
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
