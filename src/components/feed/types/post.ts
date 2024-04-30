import dateType from "../../../types/date";

export default interface postType {
  from: string;
  content: string;
  date: Date;
  title: string;
  upVotes: number;
  downVotes: number;
  id: string;
  owner: boolean;
}
