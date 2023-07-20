import dateConverter from "../../utli/date";
import { NavLink } from "react-router-dom";
import postType from "../../types/post";
import arrowUp from "../assets/arrow-up-bold.svg";
import arrowDown from "../assets/arrow-down-bold.svg";
import "./styles/feed.css";

interface feedProps {
  posts: postType[];
  home: boolean;
}

export default function Feed({ posts, home }: feedProps) {
  const createPostComponent = () => {
    return (
      <div id="create-message">
        <NavLink to={`create-message`}>
          <div id="create-message-nav">Create Post</div>
        </NavLink>
      </div>
    );
  };

  const createForumComponent = (forumName: string, url: string | null) => {
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
      {home ? null : createPostComponent()}
      {posts.length === 0 ? (
        <div id="no-messages">No Messages</div>
      ) : (
        posts.map((post, index) => {
          return (
            <div
              className="message"
              key={`message-${index}`}
              id={`message-${post.id}`}
            >
              <div className="message-title">
                {home ? createForumComponent(post.forum, post.iconURL) : null}
                <div className="from">{`Posted by u/${
                  post.from
                } ${dateConverter(post.date)}`}</div>
              </div>
              <div className="message-content">
                <h4>{post.title}</h4>
                <div>{post.content}</div>
              </div>
              <div className="bottom-icons">
                <div
                  className="likes"
                  data-testid="likes"
                  id={`likes-${post.id}`}
                >
                  <button
                    className="up-vote-btn arrow-btn"
                    id={`up-vote-btn-${post.id}`}
                    aria-label="up vote"
                  >
                    <img src={arrowUp} className="arrow" />
                  </button>
                  {post.votes}
                  <button
                    className="down-vote-btn arrow-btn"
                    id={`down-vote-btn-${post.id}`}
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
