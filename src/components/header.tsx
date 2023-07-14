import DropDownNav from "./drop-down-nav";
import { Link } from "react-router-dom";
import "./styles/header.css";
import mainIcon from "../assets/reddit-circle.svg";
import chevronDown from "../assets/chevron-down.svg";
import home from "../assets/home.svg";
import magnify from "../assets/magnify.svg";
import { useContext, useEffect, useState } from "react";
import { FirebaseApp } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export default function Header() {
  const app = useContext(FirebaseApp);
  const [showDropDownNav, setShowDropDownNav] = useState(false as boolean);
  const [forumNames, setForumNames] = useState([] as string[]);
  useEffect(() => {
    const db = getFirestore(app);
    const getForums = async () => {
      const forums: string[] = [];
      try {
        const forumObjects = await getDocs(collection(db, "forums"));
        forumObjects.forEach((doc) => {
          forums.push(doc.id);
        });
        setForumNames(forums);
      } catch (e) {
        console.log(e);
      }
    };
    getForums();
  }, [showDropDownNav]);

  const showNav = (e: React.PointerEvent<HTMLImageElement>): void => {
    e.preventDefault();
    setShowDropDownNav(!showDropDownNav);
  };

  return (
    <nav id="header">
      <div id="title">
        <img src={mainIcon} alt="site symbol" />
        <h3>Fake Forum</h3>
      </div>

      <div id="search-items">
        <div id="drop-down-menu">
          <div id="icons">
            <Link to="/">
              <div id="home-icons">
                <img src={home} alt="home icon" />
                <div>Home</div>
              </div>
            </Link>
            <img src={chevronDown} alt="expand menu" onClick={showNav} />
          </div>
          {showDropDownNav ? <DropDownNav forums={forumNames} /> : null}
        </div>
        <div id="search-bar">
          <img src={magnify} />
          <input type="text" />
        </div>
      </div>

      {/*If login show name and icon*/}
      <div id="user-icons">
        <Link to="/create-forum">
          <div id="add-forum">+</div>
        </Link>
        <button id="login-btn">Login</button>
      </div>
    </nav>
  );
}
