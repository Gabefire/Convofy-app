// import { useLocation } from "react-router-dom";

interface createMessageType {
  createMessage: (e: React.PointerEvent<HTMLInputElement>) => Promise<void>;
}

export default function CreateMessage({ createMessage }: createMessageType) {
  /* const forumName = useLocation().pathname.match(
    /\/r\/(.*)\/create-message/i
  ) as RegExpMatchArray; */
  // ToDO form validation with tests
  return (
    <form action="na" className="content">
      <label htmlFor="message-title">
        <input type="text" id="message-title" />
      </label>
      <label htmlFor="message-content">
        <input type="text" id="message-content" />
      </label>
      <input
        type="submit"
        value="submit"
        id="message-submit-button"
        onClick={createMessage}
      />
    </form>
  );
}
