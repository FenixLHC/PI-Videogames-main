import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../../actions";

import "./VideogameDetail.css";

export default function VideogameDetail(props){
    const dispatch=useDispatch();
    const vgD=useSelector(state=>state.videogameDetail);
    //const id =props.params.match.id;
    console.log(props,'console.log PROPS')
    React.useEffect(()=>{
        dispatch(getVideogameDetail(props.match.params.id))
    },[])
    
    console.log("🚀 ~ file: VideogameDetail.jsx ~ line 17 ~ VideogameDetail ~ g", vgD)
    return (
        <div>
            <Link to={'/Home'}>Home</Link>
            <h1>Trabajando para usted</h1>
           
        </div>
    )
}
