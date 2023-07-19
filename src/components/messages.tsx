import dateConverter from "../utli/date";
import { NavLink } from "react-router-dom";
import { messageType } from "./forum";
import arrowUp from "../assets/arrow-up-bold.svg";
import arrowDown from "../assets/arrow-down-bold.svg";
import "./styles/messages.css";

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

  const createForumComponent = (forumName: string, url: string | undefined) => {
    return (
      <div className="forum-message">
        {url ? (
          <img
            src={url}
            alt={`forum icon ${forumName}`}
            className="icon-message"
          />
        ) : (
          <div className="icon-message" style={{ backgroundColor: "red" }}>
            {forumName.slice(0, 1)}
          </div>
        )}
        <div className="forum-name" data-testid={forumName}>
          {`r/${forumName}`}
        </div>
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
                {home
                  ? createForumComponent(message.forum, message.iconURL)
                  : null}
                <div className="from">{`Posted by u/${
                  message.from
                } ${dateConverter(message.date)}`}</div>
              </div>
              <div className="message-content">
                <h4>{message.title}</h4>
                <div>{message.content}</div>
              </div>
              <div className="bottom-icons">
                <div
                  className="likes"
                  data-testid="likes"
                  id={`likes-${message.id}`}
                >
                  <button
                    className="up-vote-btn arrow-btn"
                    id={`up-vote-btn-${message.id}`}
                    aria-label="up vote"
                  >
                    <img src={arrowUp} className="arrow" />
                  </button>
                  {message.votes}
                  <button
                    className="down-vote-btn arrow-btn"
                    id={`down-vote-btn-${message.id}`}
                    aria-label="down vote"
                  >
                    <img src={arrowDown} className="arrow" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
