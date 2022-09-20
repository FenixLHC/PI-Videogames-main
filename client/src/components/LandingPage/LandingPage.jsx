//import styles from './LandingPage.css'
import React from "react";
import { Link} from "react-router-dom";
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div className="landingPage">
            <h1>Welcome to the best Website about Videogames you've ever seen</h1>
            <Link to ='/Home'>
                <button>Enter</button>
            </Link>
        </div>
    )
}