import dateConverter from "../../utli/date";
import { PostBottomIconsAPI } from "./post-bottom-icons-api";
import postType from "../../types/post";
import { ACTION_TYPE } from "./feed";

interface postPropsType {
  home: boolean;
  createForumComponent: (forumName: string, url: string | null) => JSX.Element;
  post: postType;
  dispatch: React.Dispatch<ACTION_TYPE>;
}

export function Post({
  home,
  createForumComponent,
  post,
  dispatch,
}: postPropsType) {
  return (
    <>
      <div className="message-title">
        {home ? createForumComponent(post.forum, post.iconURL) : null}
        <div className="from">{`Posted by u/${post.from} ${dateConverter(
          post.date
        )}`}</div>
      </div>
      <div className="message-content">
        <h4>{post.title}</h4>
        <div>{post.content}</div>
      </div>
      <PostBottomIconsAPI post={post} postFunctions={dispatch} />
    </>
  );
}
