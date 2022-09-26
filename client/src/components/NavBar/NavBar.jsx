import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logo from './favicon.ico'
import styles from './NavBar.module.css'


export default function NavBar(){
    return(
        <div className={styles.flexContainer}>
            <div className={styles.box}>
                <img src={logo} alt="" />
                <span>Henry Videogames</span>
            </div>
            <div className={`${styles.box} ${styles.links}`}>
                <Link to="/CreateVideogame">Create Videogame</Link>
                <Link to="/Home">Home</Link>
                <Link to="/About">About</Link>
            </div>
            {/* <div clasName={`${styles.box} ${styles.logo}`}>
                <img src={logo} alt="" />
                <span>Henry Videogames</span>
            </div> */}
            <div className={`${styles.box} ${styles.SearchBar}`}>
                <SearchBar />

            </div>

        </div>
    )
}