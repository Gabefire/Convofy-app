import "./styles/home.css";
import FeedAPI from "../feed/feed-api";

export default function Home() {
  return (
    <div id="home">
      <FeedAPI home={true} />
    </div>
  );
}
