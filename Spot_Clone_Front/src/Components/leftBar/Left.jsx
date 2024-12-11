import { useState } from "react";
import "./left.css";
import Ade from "../leftBar/Ad/Ade";
import Searchbar from "./SearchBar/Searchbar";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Left({ likedSongsCount }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`leftMenu ${isCollapsed ? "collapsed" : ""}`}>
      <div className="menu_Container">
        {/*----- Toggle Button -----*/}
        <div className="toggleSection">
          <button className="toggleButton" onClick={toggleSidebar}>
            <i className="fa-solid fa-layer-group"></i>
          </button>
          <p>Your Library</p>
        </div>

        {/*-----Logo-----*/}
        <div className="logoCotainer">
          {/* Dynamically change the logo based on the sidebar state */}
          <img
            className="Logo"
            src={
              isCollapsed
                ? "/public/Images/Collased logo.png" // Logo for collapsed sidebar
                : "/public/Images/main_logo.png" // Logo for expanded sidebar
            }
            alt="Logo"
          />
        </div>
        {/*-----Search Bar-----*/}
        {!isCollapsed && <Searchbar />}

        {/*-----Menu List-----*/}
        <div className="menu_List">
          <p>Menu</p>
          <ul>
            <li>
              <i className="fa-solid fa-house"></i>
              <Link className="linkColor" to="/">
                Home
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-heart"></i>
              <NavLink
                to="/liked-songs"
                className={({ isActive }) =>
                  `${isActive ? "active" : ""} linkColor`
                }
              >
                Liked Songs{" "}
                <span className="liked-count">({likedSongsCount})</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Ad Component */}
        {!isCollapsed && <Ade />}
      </div>
    </aside>
  );
}
