import postType from "../components/feed/post";

export type POSTS_ACTION_TYPE = {
    type: string;
    payload?: {
      posts?: postType[];
      id?: string;
      uid?: string;
      title?: string;
      content?: string;
    };
  };