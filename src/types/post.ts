import dateType from "./date";

export default interface postType {
  from: string;
  content: string;
  date: Date | dateType;
  title: string;
  upVotes: string[];
  downVotes: string[];
  id: string | null;
  uid: string;
  forum: string;
  iconURL: string | null;
}
