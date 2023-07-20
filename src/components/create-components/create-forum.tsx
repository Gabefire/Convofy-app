import "./styles/create-forum.css";

interface createForumProps {
  createForum: (e: React.PointerEvent<HTMLInputElement>) => Promise<void>;
}

export default function CreateForum({ createForum }: createForumProps) {
  // ToDO form validation with tests
  return (
    <form className="content">
      <label
        htmlFor="forum-name"
        className="forum-container"
        id="forum-name-contain"
      >
        Name
        <input
          type="text"
          id="forum-name"
          placeholder="r/"
          maxLength={20}
          required={true}
        />
        <span>*max length 20 characters</span>
      </label>
      <label
        htmlFor="forum-desc"
        className="forum-container"
        id="forum-desc-contain"
      >
        Description
        <textarea id="forum-desc" rows={4} cols={50} required></textarea>
      </label>
      <section id="style-section">
        <label htmlFor="forum-banner-color">
          Banner Color
          <input
            type="color"
            id="forum-banner-color"
            defaultValue={"#ff3300"}
          />
        </label>
        <label htmlFor="forum-icon">
          Icon File
          <input type="file" id="forum-icon" />
        </label>
      </section>
      <input
        type="submit"
        value={"Submit"}
        id="submit-forum"
        className="submit"
        onClick={createForum}
      />
    </form>
  );
}
