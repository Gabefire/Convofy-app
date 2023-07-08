import { render } from "@testing-library/react";
import DropDownNav from "../drop-down-nav";

describe("drop down component", () => {
  it("renders forums", () => {
    render(<DropDownNav forums={["test1", "test2", "test3"]} />);
    expect(document.querySelectorAll("li").length).toBe(3);
  });
});
