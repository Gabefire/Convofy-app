import Feed from "../feed/feed";
import "./home.css";

export default function Home() {
	return (
		<div id="home">
			<Feed initialPosts={[]} showForumInfo={false} />
		</div>
	);
}
