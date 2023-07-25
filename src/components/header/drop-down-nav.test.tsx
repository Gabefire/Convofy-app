import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropDownNav from "./drop-down-nav";
import { BrowserRouter } from "react-router-dom";

describe("drop down component", () => {
  it("renders forums", () => {
    const showNav = jest.fn();
    render(
      <BrowserRouter>
        <DropDownNav
          forums={["test1", "test2", "test3"]}
          showDropDownNav={showNav}
        />
      </BrowserRouter>
    );
    const forumElements = document.querySelectorAll("li");
    expect(forumElements.length).toBe(3);
    expect(forumElements[0].textContent).toBe("r/test1");
  });
  it("switches url", async () => {
    const showNav = jest.fn();
    render(
      <BrowserRouter>
        <DropDownNav
          forums={["test1", "test2", "test3"]}
          showDropDownNav={showNav}
        />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const forumElements = document.querySelectorAll("li");
    expect(location.href).toBe("http://localhost/");
    await user.click(forumElements[0]);
    expect(location.href).toBe("http://localhost/r/test1");
  });
});
