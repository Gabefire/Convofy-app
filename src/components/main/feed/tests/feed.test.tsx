import { beforeEach, describe, expect, it, vi } from "vitest";
import type { postType } from "../../post/types/post";
import { generatePosts } from "../../../../test-util/posts";
import Post from "../../post/post";
import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import PostBottomIcons from "../../post/postBottomIcons";
import userEvent from "@testing-library/user-event";
import Feed from "../feed";
import {
	PostsDispatchContext,
	usePostsDispatch,
} from "../context/postReducerContext";
import { EditPost } from "../../post/editPost";
import { act } from "react";
import type { POSTS_ACTION_TYPE } from "../../post/reducers/postsReducerTypes";

describe("Post component", () => {
	let messages: postType[];

	beforeEach(() => {
		messages = generatePosts();
	});

	it("renders correctly", () => {
		const tree = render(
			<BrowserRouter>
				<Post showForumInfo={true} post={messages[0]} />
			</BrowserRouter>,
		);

		expect(tree).toMatchFileSnapshot("./snapshots/post");
	});

	it("shows forum information", () => {
		render(
			<BrowserRouter>
				<Post showForumInfo={true} post={messages[0]} />
			</BrowserRouter>,
		);
		const header = screen.getByText(/test1/);

		expect(header).toBeInTheDocument();
	});

	it("shows user information", () => {
		render(
			<BrowserRouter>
				<Post showForumInfo={false} post={messages[0]} />
			</BrowserRouter>,
		);
		const header = screen.getByText(/owner2/);

		expect(header).toBeInTheDocument();
	});
});

describe("post bottom icons component", () => {
	let messages: postType[];

	beforeEach(() => {
		messages = generatePosts();
	});

	it("activates edit post function", async () => {
		const user = userEvent.setup();
		const mock = vi.fn(() => 0);
		render(
			<BrowserRouter>
				<PostBottomIcons post={messages[0]} toggleEditPost={mock} />
			</BrowserRouter>,
		);

		const editPost = screen.getByRole("button", { name: /edit post/ });

		await act(() => user.click(editPost));

		expect(mock).toBeCalled();
	});

	it("up vote increases value", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Feed initialPosts={messages} showForumInfo={true} />
			</BrowserRouter>,
		);

		const upVote = screen.getAllByRole("button", { name: /up vote/ })[0];
		let count = screen.getAllByText("0")[0].innerHTML;

		expect(count).toBe("0");

		await act(() => user.click(upVote));

		count = screen.getByText("1").innerHTML;
		expect(count).toBe("1");
	});

	it("down vote decreases value", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Feed initialPosts={messages} showForumInfo={true} />
			</BrowserRouter>,
		);

		const downVote = screen.getAllByRole("button", { name: /down vote/ })[0];
		let count = screen.getAllByText("0")[0].innerHTML;

		expect(count).toBe("0");

		await act(() => user.click(downVote));

		count = screen.getByText("-1").innerHTML;
		expect(count).toBe("-1");
	});

	it("deletes post", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Feed initialPosts={messages} showForumInfo={true} />
			</BrowserRouter>,
		);

		const deleteButton = screen.getAllByRole("button", {
			name: /delete post/,
		})[0];

		expect(deleteButton).toBeInTheDocument();

		await act(() => user.click(deleteButton));

		expect(deleteButton).not.toBeInTheDocument();
	});

	it("delete and edit don't show up for non owner", () => {
		render(
			<BrowserRouter>
				<Post showForumInfo={false} post={messages[1]} />
			</BrowserRouter>,
		);
		const deleteButton = screen.queryByRole("button", {
			name: /delete post/,
		});
		const editPost = screen.queryByRole("button", { name: /edit post/ });

		expect(deleteButton).toBe(null);
		expect(editPost).toBe(null);
	});
});

describe("edit posts component", () => {
	let messages: postType[];

	beforeEach(() => {
		messages = generatePosts();
	});

	it("edit post header pops up", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Feed initialPosts={messages} showForumInfo={true} />
			</BrowserRouter>,
		);

		const editPost = screen.getByRole("button", { name: /edit post/ });

		await act(() => user.click(editPost));

		const header = screen.getByRole("heading", { name: /Edit Post/ });
		expect(header).toBeInTheDocument();
	});

	it("submits new title and content to post", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Feed initialPosts={messages} showForumInfo={true} />
			</BrowserRouter>,
		);

		const editPost = screen.getByRole("button", { name: /edit post/ });

		await act(() => user.click(editPost));

		const newTitle = screen.getByRole("textbox", { name: /Title/ });
		const newContent = screen.getByRole("textbox", { name: /Content/ });
		const submit = screen.getByRole("button", { name: /Submit/ });

		await act(() => user.clear(newTitle));
		await act(() => user.clear(newContent));

		await act(() => user.type(newTitle, "new text"));
		await act(() => user.type(newContent, "new content"));
		await act(() => user.click(submit));

		expect(screen.getByText("new text")).toBeInTheDocument();
		expect(screen.getByText("new content")).toBeInTheDocument();
	});

	it("same title or content does not submit new title or content to post", async () => {
		const user = userEvent.setup();
		const mock = vi.fn();
		render(
			<BrowserRouter>
				<PostsDispatchContext.Provider value={mock}>
					<EditPost post={messages[0]} toggleEditCreatePost={vi.fn()} />
				</PostsDispatchContext.Provider>
			</BrowserRouter>,
		);

		const newTitle = screen.getByRole("textbox", { name: /Title/ });
		const newContent = screen.getByRole("textbox", { name: /Content/ });
		const submit = screen.getByRole("button", { name: /Submit/ });

		await act(() => user.clear(newTitle));
		await act(() => user.clear(newContent));

		await act(() => user.type(newTitle, "test"));
		await act(() => user.type(newContent, "test"));

		await act(() => user.click(submit));

		expect(mock).not.toBeCalled();
	});

	it("cancels does not submit new title or content to post", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Feed initialPosts={messages} showForumInfo={true} />
			</BrowserRouter>,
		);

		const editPost = screen.getByRole("button", { name: /edit post/ });

		await act(() => user.click(editPost));

		const newTitle = screen.getByRole("textbox", { name: /Title/ });
		const newContent = screen.getByRole("textbox", { name: /Content/ });
		const cancel = screen.getByRole("button", { name: /x/ });

		await act(() => user.clear(newTitle));
		await act(() => user.clear(newContent));

		await act(() => user.type(newTitle, "new text"));
		await act(() => user.type(newContent, "new content"));
		await act(() => user.click(cancel));

		expect(screen.queryByText("new text")).toBe(null);
		expect(screen.queryByText("new content")).toBe(null);
	});
});

describe("post reducer context", () => {
	let messages: postType[];

	beforeEach(() => {
		messages = generatePosts();
	});
	it("provides expected context obj to child", async () => {
		const mock = vi.fn();
		const user = userEvent.setup();

		render(
			<BrowserRouter>
				<PostsDispatchContext.Provider value={mock}>
					<Post post={messages[0]} showForumInfo={true} />
				</PostsDispatchContext.Provider>
			</BrowserRouter>,
		);

		const deleteButton = screen.getAllByRole("button", {
			name: /delete post/,
		})[0];
		await act(() => user.click(deleteButton));

		const upVote = screen.getAllByRole("button", { name: /up vote/ })[0];
		await act(() => user.click(upVote));

		const downVote = screen.getAllByRole("button", { name: /up vote/ })[0];
		await act(() => user.click(downVote));

		expect(mock).toBeCalledTimes(3);
	});

	it("usePostsDispatch hook returns default values", () => {
		const { result } = renderHook(usePostsDispatch);
		const func = result.current;
		expect(result).toBeTruthy();
		expect(result.current).toBeInstanceOf(Function);
		expect(func("fake" as unknown as POSTS_ACTION_TYPE)).toBe(undefined);
	});
});

describe("feed component", () => {
	let messages: postType[];

	beforeEach(() => {
		messages = generatePosts();
	});
	it("renders correctly", () => {
		const tree = render(
			<BrowserRouter>
				<Feed showForumInfo={true} initialPosts={messages} />
			</BrowserRouter>,
		);

		expect(tree).toMatchFileSnapshot("./snapshots/feed");
	});
	it("no messages is shown if no posts provided", () => {
		render(
			<BrowserRouter>
				<Feed initialPosts={[]} showForumInfo={true} />
			</BrowserRouter>,
		);
		expect(screen.queryByText(/No Messages/)).toBeInTheDocument();
	});
});
