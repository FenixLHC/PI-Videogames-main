import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogame, getGenres, getPlataforms } from "../../redux/actions";
import { isEmptyObj } from "../../utils";

export default function VideogameCreate() {

//LOCAL STATES AND HOOKS///////////////////////////////////////////////////
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platformsFromApi = useSelector((state) => state.platforms);
  let videogameCreated = useSelector(state => state.videogameCreated);
  videogameCreated = {}

//ERRORS STATES////////////////////////////////////////////////////////////  
  const [errorName, setErrorName] = useState('')
  const [errorDate, setErrorDate] = useState('')
  const [errorRating, setErrorRating] = useState('')
  const [errorPlatforms, setErrorPlatforms] = useState('')

//USEEFFECT////////////////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getPlataforms());
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (isEmptyObj(videogameCreated)) return 'it may cause an error'
    else {
      alert('Videogame created succesfully');
      console.log(videogameCreated);
      videogameCreated = {}
      history.push('/Home')
    }
  }, [videogameCreated])
//VALIDATIONS//////////////////////////////////////////////////////////////
  function validateName(name) {
    //string 30 chars//4 characters minimum//not special chars ñÑáÁéÉíÍóÓuÚ
    const regExName = /^[a-zA-Z0-9\s]{4,30}$/
    if (regExName.test(name)) {
      setErrorName('')
      return true
    }
    else {
      setErrorName('Invalid: name can not have special characters');
      return false
    }
  }

  function validateDate(released) {
    //posterior a 1950 //no superior a fecha actual
    let date = new Date(released)
    let minDate = new Date('01/01/1950')
    if (date <= Date.now() && date >= minDate) {
      setErrorDate('')
      return true
    }
    else {
      setErrorDate('Invalid: Date has to be between 1950-now');
      return false
    }
  }

  function validateRating(rating) {
    //float //2 decimales //entre 0 y 5
    const regExRating = /^\s*-?[1-5]\d*(\.\d{1,2})?\s*$/
    if (regExRating.test(rating)) {
      setErrorRating('')
      return true
    }
    else {
      setErrorRating('Invalid: Rating has to be between 1-5, with 2 decimal places');
      return false
    }
  }

  function validatePlatforms(platforms) {
    //no puede estar vacio
    if (platforms.length >= 1) { setErrorPlatforms(''); return true } else {setErrorPlatforms('Invalid: There has to be at least one Platform')}
  }
//HANDLERS////////////////////////////////////////////////////////////////
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
    // validatePlatforms(videogame.platforms)
    if (errorName || errorRating || errorDate || videogame.platforms.length===0) {
      validatePlatforms(videogame.platforms)
      alert('There may be invalid data')
    } else {
      dispatch(createVideogame(videogame));
      setVideogame({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        genres: [],
        platforms: [],
      });
    }
  };

  //RENDER///////////////////////////////////////////////////////////////
  return (
    <div>
      <Link to={"/Home"}>Home</Link>
      <h1>Create your own Videogame</h1>
      <form onSubmit={handleOnsubmit}>
        {/* NAME */}
        <div>
          <label>Name: </label>
          <input
            name="name"
            value={videogame.name}
            type="text"
            onChange={(e) => { handleOnchange(e); validateName(e.target.value) }}
            required
          />
          {!errorName ? null : <span>{errorName}</span>}
        </div>
        {/* DATE OF RELEASED */}
        <div>
          <label>Date of release: </label>
          <input
            name="releaseDate"
            value={videogame.releaseDate}
            type="date"
            onChange={(e) => { handleOnchange(e); validateDate(e.target.value) }}
            required
          />
          {!errorDate ? null : <span>{errorDate}</span>}
        </div>
        {/* RATING */}
        <div>
          <label>Rating: </label>
          <input
            name="rating"
            value={videogame.rating}
            type="float"
            //min={0}
            //max={5}
            onChange={(e) => { handleOnchange(e); validateRating(e.target.value) }}
          />
          {!errorRating ? null : <span>{errorRating}</span>}
        </div>
        {/* PLATFORMS */}
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
          {!errorPlatforms?null: <span>{errorPlatforms}</span>}
        </div>
        {/* GENRES */}
        <div>
          <select onChange={(e) => handleSelect(e)}>
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
          <ul><li>{videogame.genres.map(g => `-${g}-`)}</li></ul>
        </div>
        {/* DESCRIPTION */}
        <div>
          <label>Description: </label>
          <input
            name="description"
            value={videogame.description}
            type="text"
            onChange={(e) => handleOnchange(e)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
