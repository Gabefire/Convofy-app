import { PostBottomIcons } from "./post-bottom-icons";
import dateConverter from "../../utli/date";
import { NavLink } from "react-router-dom";
import postType from "../../types/post";

import "./feed.css";

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
              <PostBottomIcons post={post} />
            </div>
          );
        })
      )}
    </div>
  );
}
