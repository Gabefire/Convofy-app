import arrowUp from "../../assets/arrow-up-bold.svg";
import arrowDown from "../../assets/arrow-down-bold.svg";
import postType from "../../types/post";
import { ACTION_TYPE } from "./feed-api";
import React from "react";
import { ACTION } from "./feed-api";

interface postBottomIconsProps {
  post: postType;
  postFunctions: React.Dispatch<ACTION_TYPE>;
  uid: string | undefined;
}

export function PostBottomIcons({
  post,
  postFunctions,
  uid,
}: postBottomIconsProps) {
  const upVote = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postFunctions();
  };

  return (
    <div className="bottom-icons">
      <div className="likes" data-testid="likes" id={`likes-${post.id}`}>
        <button
          className="up-vote-btn arrow-btn"
          id={`up-vote-btn-${post.id}`}
          aria-label="up vote"
        >
          <img src={arrowUp} className="arrow" />
        </button>
        {post.upVotes.length - post.downVotes.length}
        <button
          className="down-vote-btn arrow-btn"
          id={`down-vote-btn-${post.id}`}
          aria-label="down vote"
        >
          <img src={arrowDown} className="arrow" />
        </button>
      </div>
    </div>
  );
}
