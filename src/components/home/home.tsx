import FeedAPI from "../feed/feed-api";
import "./home.css";

export default function Home() {
  return (
    <div id="home">
      <FeedAPI home={true} />
    </div>
  );
}
