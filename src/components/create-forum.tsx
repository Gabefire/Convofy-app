import "./create-forum.css";

export default function CreateForum() {
  return (
    <form className="content">
      <label
        htmlFor="forum-name"
        className="forum-container"
        id="forum-name-contain"
      >
        Name
        <input type="text" id="forum-name" placeholder="r/" maxLength={20} />
        <span>*max length 20 characters</span>
      </label>
      <label
        htmlFor="forum-desc"
        className="forum-container"
        id="forum-desc-contain"
      >
        Name
        <input
          type="text"
          id="forum-desc"
          placeholder="Enter Description "
          maxLength={20}
        />
        <span>*max length 20 characters</span>
      </label>
    </form>
  );
}
