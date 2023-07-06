import DropDownNav from "./drop-down-nav";
import "./header.css";

export default function Header() {
  return (
    <div id="header">
      <div id="title">
        <img src="" alt="" />
        <h3>Fake Forum</h3>
      </div>
      <div id="drop-down-menu">
        <div id="icons">
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <div id="menu">
          <DropDownNav />
        </div>
      </div>
      <img src="" alt="" className="maginify-glass" />
      <input type="text" id="Search" />

      {/*If login show name and icon*/}
      <button id="login-btn">Login</button>
    </div>
  );
}
