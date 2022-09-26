import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";


export default function SearchBar(){
    const dispatch=useDispatch();
    const [name,setName]=useState('');

    function handleSearch(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleOnSubmit(e){
        e.preventDefault(e)
        dispatch(getVideogamesByName(name));
        setName('')

    }

    return(
        <div>
            <input type={'text'} placeholder='Search videogame' value={name} onChange={e=>handleSearch(e)}/>
            <button type="submit" onClick={e=>handleOnSubmit(e)}>Search</button>
        </div>
    )
}