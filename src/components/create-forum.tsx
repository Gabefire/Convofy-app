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
        Description
        <textarea id="forum-desc" rows={4} cols={50}></textarea>
      </label>
      <section id="style-section">
        <label htmlFor="forum-banner-color">
          Banner Color
          <input type="color" id="forum-banner-color" value={"#ff3300"} />
        </label>
        <label htmlFor="forum-icon">
          Icon File
          <input type="file" id="forum-icon" />
        </label>
      </section>
    </form>
  );
}
