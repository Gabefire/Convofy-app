import arrowUp from "../../assets/arrow-up-bold.svg";
import arrowDown from "../../assets/arrow-down-bold.svg";
import postType from "../../types/post";
import { ACTION_TYPE } from "./feed";
import React from "react";
import { ACTION } from "./feed";

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
    e.preventDefault();
    let id = (e.currentTarget.id as string).split("-");
    postFunctions({ type: ACTION.UP_VOTE, payload: { uid: uid, id: id[3] } });
  };

  const downVote = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let id = (e.currentTarget.id as string).split("-");
    postFunctions({ type: ACTION.DOWN_VOTE, payload: { uid: uid, id: id[3] } });
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
          <img src={arrowUp} className="arrow" />
        </button>
        {getVoteValue(post)}
        <button
          className="down-vote-btn arrow-btn"
          id={`down-vote-btn-${post.id}`}
          onClick={downVote}
          aria-label="down vote"
        >
          <img src={arrowDown} className="arrow" />
        </button>
      </div>
    </div>
  );
}
