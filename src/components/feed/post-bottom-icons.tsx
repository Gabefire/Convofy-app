import arrowUp from "../../assets/arrow-up-bold.svg";
import arrowDown from "../../assets/arrow-down-bold.svg";
import postType from "../../types/post";

interface postBottomIconsProps {
  post: postType;
}

export function PostBottomIcons({ post }: postBottomIconsProps) {
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
  );
}
