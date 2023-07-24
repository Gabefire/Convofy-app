import dateConverter from "../../utli/date";
import { PostBottomIconsAPI } from "./post-bottom-icons-api";
import postType from "../../types/post";
import { ACTION_TYPE } from "./feed";
import { useState } from "react";

interface postPropsType {
  home: boolean;
  post: postType;
  dispatch: React.Dispatch<ACTION_TYPE>;
}

export function Post({ home, post, dispatch }: postPropsType) {
  const [editPost, setEditPost] = useState(false);

  const toggleEditPost = () => {
    setEditPost(!editPost);
  };

  const createForumTitle = (forumName: string, url: string | null) => {
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

  const createEditPost = () => {
    return (
      <form className="message-content">
        <label
          htmlFor={`edit-input-title-${post.id}`}
          className="edit-message-label"
        >
          Title:
          <input
            type="text"
            className="message-header edit-title"
            defaultValue={post.title}
            id={`edit-input-title-${post.id}`}
          />
        </label>
        <label htmlFor={`edit-input-content-${post.id}`}>
          Content:
          <textarea
            className="message-main edit-main"
            id={`edit-input-content-${post.id}`}
            rows={20}
            cols={50}
            defaultValue={post.content}
          ></textarea>
        </label>
        <input
          type="button"
          value="Cancel"
          className="cancel form-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleEditPost();
          }}
        />
        <input type="submit" className="submit form-btn" value={"Submit"} />
      </form>
    );
  };

  const createPost = () => {
    return (
      <>
        <div className="message-title">
          {home ? createForumTitle(post.forum, post.iconURL) : null}
          <div className="from">{`Posted by u/${post.from} ${dateConverter(
            post.date
          )}`}</div>
        </div>
        <div className="message-content">
          <h4 className="message-header">{post.title}</h4>
          <div className="message-main">{post.content}</div>
        </div>
        <PostBottomIconsAPI
          post={post}
          postFunctions={dispatch}
          toggleEditPost={toggleEditPost}
        />
      </>
    );
  };

  return editPost ? createEditPost() : createPost();
}
