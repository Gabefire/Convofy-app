import dateType from "./date";

export default interface postType {
  from: string;
  content: string;
  date: Date | dateType;
  title: string;
  votes: number;
  id: string;
  uid: string;
  forum: string;
  iconURL: string | null;
}
