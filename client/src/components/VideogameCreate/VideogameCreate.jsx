import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogame, getGenres, getPlataforms } from "../../redux/actions";
import { isEmptyObj } from "../../utils";

export default function VideogameCreate() {
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  const dispatch = useDispatch();
  const history=useHistory();
  const genres = useSelector((state) => state.genres);
  const platformsFromApi = useSelector((state) => state.platforms);
  let videogameCreated=useSelector(state=>state.videogameCreated);
  videogameCreated={}

  useEffect(() => {
    dispatch(getPlataforms());
    dispatch(getGenres());
  }, []);

  useEffect(()=>{
    if (isEmptyObj(videogameCreated)) return 'it may cause an error'
    else{
      alert('Videogame created succesfully');
      console.log(videogameCreated);
      videogameCreated={}
      history.push('/Home')
    }
  },[videogameCreated])

  const handleOnchange = (e) => {
    setVideogame({
      ...videogame,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setVideogame({
        ...videogame,
        platforms: [...videogame.platforms, e.target.value],
      });
    }
    console.log(videogame);
  };
  
  const handleSelect = (e) => {
    setVideogame({
      ...videogame,
      genres: [...videogame.genres, e.target.value],
    });
    console.log(videogame)
  };
  
  const handleOnsubmit = (e) => {
    e.preventDefault();
    dispatch(createVideogame(videogame));
    setVideogame({
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      genres: [],
      platforms: [],
    });
  };

  return (
    <div>
      <Link to={"/Home"}>Home</Link>
      <h1>Create your own Videogame</h1>
      <form onSubmit={handleOnsubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            value={videogame.name}
            type="text"
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <div>
          <label>Date of release: </label>
          <input
            name="releaseDate"
            value={videogame.releaseDate}
            type="date"
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            name="rating"
            value={videogame.rating}
            type="float"
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <div>
          <label>Platforms</label>
          {platformsFromApi?.map((p) => {
            return (
              <label key={p.id}>
                <input
                  type="checkbox"
                  key={p.id}
                  name={p.name}
                  value={p.name}
                  onChange={handleCheckbox}
                />
                {p.name}
              </label>
            );
          })}
        </div>
        <div>
          <select  onChange={(e) => handleSelect(e)}>
            <option>Genres</option>
            {genres?.map((g) => {
              return (
                <option
                  key={g.id}
                  value={g.name}
                  name={g.name}
                  // onChange={handleSelect}
                >
                  {g.name}
                </option>
              );
            })}
          </select>
          <ul><li>{videogame.genres.map(g=>`-${g}-`)}</li></ul>
        </div>
        <div>
          <label>Description: </label>
          <input
            name="description"
            value={videogame.description}
            type="text"
            onChange={(e) => handleOnchange(e)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
