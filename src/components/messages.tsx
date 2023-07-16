import dateConverter from "../utli/date";
import { NavLink } from "react-router-dom";
import { messageType } from "./forum";

export default function Messages({
  messages,
  home,
}: {
  messages: messageType[];
  home: boolean;
}) {
  const createMessageComponent = () => {
    return (
      <div id="create-message">
        <NavLink to={`create-message`}>
          <div id="create-message-nav">Create Post</div>
        </NavLink>
      </div>
    );
  };

  return (
    <div id="messages">
      {home ? null : createMessageComponent()}
      {messages.length === 0 ? (
        <div id="no-messages">No Messages</div>
      ) : (
        messages.map((message, index) => {
          return (
            <div
              className="message"
              key={`message-${index}`}
              id={`message-${message.id}`}
            >
              <div className="message-title">
                <div className="from">{`Posted by u/${
                  message.from
                } ${dateConverter(message.date)}`}</div>
              </div>
              <div className="message-content">
                <h4>{message.title}</h4>
                <div>{message.content}</div>
              </div>
              <div className="bottom-icons">
                <div className="likes">{message.votes}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
