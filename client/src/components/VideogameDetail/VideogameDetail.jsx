import React, { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../../redux/actions";

import "./VideogameDetail.css";

export default function VideogameDetail(props){
    const dispatch=useDispatch();
    const vgD=useSelector(state=>state.videogameDetail);
    
    const {id}=props.match.params;
    useEffect(()=>{
        dispatch(getVideogameDetail(id))
    },[])
    
    console.log("🚀 ~ file: VideogameDetail.jsx ~ line 17 ~ VideogameDetail ~ g", vgD)
    return (
        <div>
            <Link to={'/Home'}>Home</Link>
            <div>
                <h1>{vgD.name}</h1>
                <img src={vgD.image} alt='Image not found'/>
                <nav>Genres: {vgD.genres}</nav>
                <h3>Realeased: {vgD.released}</h3>
                <h4>Rating: </h4>
            </div>


        </div>
    )
}
