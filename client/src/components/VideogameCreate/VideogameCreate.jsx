import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createVideogame } from "../../actions";

export default function VideogameCreate (){
    const [videogame,setVideogame]=useState({name:'',description:'',releaseDate:'',rating:''})
    const dispatch=useDispatch();

    const handleOnchange=(e)=>{
        setVideogame({
          ...videogame,
          [e.target.name]:e.target.value
        })
      }
    
     const handleOnsubmit=(e)=>{
        e.preventDefault();
        dispatch(createVideogame(videogame));
      }
    
      return (
        <div>
            <Link to={'/Home'}>Home</Link>
          <form onSubmit={handleOnsubmit}>
            <label >Name: </label>
            <input name="name" onChange={handleOnchange}/>
            <label forHTML="releaseDate">Date of release: </label>
            <input name="releaseDate" onChange={handleOnchange}/>
            <label forHTML="Description">Description: </label>
            <input name="description" onChange={handleOnchange} />
            <label forHTML="rating">Rating: </label>
            <input name="rating" onChange={handleOnchange} />
            <button type="submit" >Create</button>
          </form>
        </div>
      );

}
