import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logo from "./favicon.ico";
import "./NavBar.css";


export default function NavBar() {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const toogle = () => {
    if (isContainerActive === true) {
      setIsContainerActive(false);
    } else if (isContainerActive === false) setIsContainerActive(true);
  };
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <h1>Henry Videogames</h1>
        </div>
        <div className="menu">
          <Link className="link" to="/Home">
            <a className="isActive">Home</a>
          </Link>
          <Link className="link" to="/CreateVideogame">
            <a>Create Videogame</a>
          </Link>
          <Link className="link" to="/About">
            <a>About</a>
          </Link>
        </div>
        
        <button
          className={`hamburguer${isContainerActive ? " isActive" : ""}`}
          onClick={toogle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
