import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logo from './favicon.ico'
import  './NavBar.css'

// function button(){
// let clas=styles.hamburguer;
// function hanldeButton(){
//     clas=`styles.hamburguer isActive`;
// }
// }

export default function NavBar(){
    const [isContainerActive,setIsContainerActive]=useState(false);
    const toogle=()=>{if (isContainerActive===true){setIsContainerActive(false)}else if (isContainerActive===false) setIsContainerActive(true)}
    return(
        <nav>
            <div className="container">
                <div className='logo'>
                    <img src={logo} alt="" />
                    <h1>Henry Videogames</h1>
                </div>
                <div className='menu'>
                    {/* <a href="/Home">Home</a><a href="/CreateVideogame">Create videogame</a><a href="About">About</a> */}
                    <Link className='link' to="/Home"><a className='isActive'>Home</a></Link>
                    <Link className='link' to="/CreateVideogame"><a>Create Videogame</a></Link>
                    <Link className='link' to="/About"><a>About</a></Link>
                </div>
                {/* <div className='searchBar'>
                    <SearchBar /> 
                </div> */}
                <button className={`hamburguer${isContainerActive?' isActive':''}`} onClick={toogle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
        
    )
}