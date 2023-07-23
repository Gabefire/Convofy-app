/// <reference types="vite-plugin-svgr/client" />
import postType from "../../types/post";
import { ACTION_TYPE } from "./feed";
import React from "react";
import { ACTION } from "./feed";
import { ReactComponent as ArrowUp } from "../../assets/arrow-up-bold.svg";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down-bold.svg";
import { ReactComponent as Comment } from "../../assets/comment.svg";

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
  const activatedUp = () => {
    if (post.upVotes.includes(uid as string) && uid !== undefined) {
      return "red";
    }
    return "white";
  };

  const activatedDown = () => {
    if (post.downVotes.includes(uid as string) && uid !== undefined) {
      return "red";
    }
    return "white";
  };

  const getVoteValue = (post: postType): number => {
    let upVoteNum: number;
    if (post.upVotes !== undefined) {
      upVoteNum = post.upVotes.length;
    } else {
      upVoteNum = 0;
    }
    let downVoteNum: number;
    if (post.downVotes !== undefined) {
      downVoteNum = post.downVotes.length;
    } else {
      downVoteNum = 0;
    }
    return upVoteNum - downVoteNum;
  };

  const upVote = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (uid !== undefined) {
      e.preventDefault();
      let id = (e.currentTarget.id as string).split("-");
      postFunctions({ type: ACTION.UP_VOTE, payload: { uid: uid, id: id[3] } });
    }
  };

  const downVote = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (uid !== undefined) {
      e.preventDefault();
      let id = (e.currentTarget.id as string).split("-");
      postFunctions({
        type: ACTION.DOWN_VOTE,
        payload: { uid: uid, id: id[3] },
      });
    }
  };

  return (
    <div className="bottom-icons">
      <div className="likes" data-testid="likes" id={`likes-${post.id}`}>
        <button
          className="up-vote-btn arrow-btn"
          aria-label="up vote"
          onClick={upVote}
          id={`up-vote-btn-${post.id}`}
        >
          <ArrowUp fill={activatedUp()} className="arrow" />
        </button>
        {getVoteValue(post)}
        <button
          className="down-vote-btn arrow-btn"
          id={`down-vote-btn-${post.id}`}
          onClick={downVote}
          aria-label="down vote"
        >
          <ArrowDown fill={activatedDown()} className="arrow" />
        </button>
      </div>
      <button className="comment-btn">
        <Comment fill={"white"} className="comment-icon" />0
      </button>
    </div>
  );
}
