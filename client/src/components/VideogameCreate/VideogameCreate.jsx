import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogame, getGenres, getPlataforms } from "../../redux/actions";
import { isEmptyObj } from "../../utils";
import styles from "./VideogameCreate.module.css";

export default function VideogameCreate() {
  //LOCAL STATES AND HOOKS///////////////////////////////////////////////////
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genre: [],
    platforms: [],
    backgroundImage: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platformsFromDb = useSelector((state) => state.platforms);
  let videogameCreated = useSelector((state) => state.videogameCreated);
  videogameCreated = {};

  //ERRORS STATES////////////////////////////////////////////////////////////
  const [errorName, setErrorName] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [errorRating, setErrorRating] = useState("");
  const [errorPlatforms, setErrorPlatforms] = useState("");
  const [errorImage, setErrorImage] = useState("");

  //USEEFFECT////////////////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getPlataforms());
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (isEmptyObj(videogameCreated)) return "it may cause an error";
    else {
      alert("Videogame created succesfully");
      console.log(videogameCreated);
      videogameCreated = {};
      history.push("/Home");
    }
  }, [videogameCreated]);
  //VALIDATIONS//////////////////////////////////////////////////////////////
  function validateName(name) {
    //string 30 chars//4 characters minimum//not special chars ñÑáÁéÉíÍóÓuÚ
    const regExName = /^[a-zA-Z0-9\s]{4,30}$/;
    if (regExName.test(name)) {
      setErrorName("");
      return true;
    } else {
      setErrorName("Invalid: name can not have special characters");
      return false;
    }
  }

  function validateDate(released) {
    //posterior a 1950 //no superior a fecha actual
    let date = new Date(released);
    let minDate = new Date("01/01/1950");
    if (date <= Date.now() && date >= minDate) {
      setErrorDate("");
      return true;
    } else {
      setErrorDate("Invalid: Date has to be between 1950-now");
      return false;
    }
  }

  function validateRating(rating) {
    //float //2 decimales //entre 0 y 5
    const regExRating = /^\s*-?[1-5]\d*(\.\d{1,2})?\s*$/;
    if (regExRating.test(rating)) {
      setErrorRating("");
      return true;
    } else {
      setErrorRating(
        "Invalid: Rating has to be between 1-5, with 2 decimal places"
      );
      return false;
    }
  }

  function validatePlatforms(platforms) {
    //no puede estar vacio
    if (platforms.length >= 1) {
      setErrorPlatforms("");
      return true;
    } else {
      setErrorPlatforms("Invalid: There has to be at least one Platform");
    }
  }
  function validateImage(image) {
    //string 30 chars//4 characters minimum//not special chars ñÑáÁéÉíÍóÓuÚ
    const regExImage =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    if (regExImage.test(image)) {
      setErrorImage("");
      return true;
    } else {
      setErrorImage("Invalid: invalid URL");
      return false;
    }
  }
  //HANDLERS////////////////////////////////////////////////////////////////
  const handleOnchange = (e) => {
    setVideogame({
      ...videogame,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    // e.preventDefault();
    console.log(e.target.checked)
    if (e.target.checked) {
      setVideogame({
        ...videogame,
        platforms: [...videogame.platforms, e.target.value],
      });
    }else if (!e.target.checked){
      setVideogame({
        ...videogame,
        platforms: [...videogame.platforms.filter(p=>p!==e.target.value)],
      });
    }
    console.log(videogame);
  };

  const handleSelect = (e) => {
    setVideogame({
      ...videogame,
      genre: [...videogame.genre, e.target.value],
    });
    console.log(videogame);
  };

  const handleDelete = (genreDeleted)=>{
    setVideogame({
      ...videogame,
      genre:videogame.genre.filter(g=>g!==genreDeleted)
    })
  }

  const handleOnsubmit = (e) => {
    e.preventDefault();
    // validatePlatforms(videogame.platforms)
    if (
      errorName ||
      errorRating ||
      errorDate ||
      videogame.platforms.length === 0 ||
      errorImage
    ) {
      validatePlatforms(videogame.platforms);
      alert("There may be invalid data");
    } else {
      dispatch(createVideogame(videogame));
      setVideogame({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        genre: [],
        platforms: [],
        backgroundImage: "",
      });
    }
  };

  //RENDER///////////////////////////////////////////////////////////////
  return (
    <div>
      <h1 className={styles.createForm}>Create videogame</h1>
      <div className={styles.main}>
        <form onSubmit={handleOnsubmit} className={styles.main}>
          {/* NAME */}
          <div id={styles.name}>
            <h2 className={styles.name}>Name: </h2>
            <input
              className={styles.input}
              name="name"
              value={videogame.name}
              type="text"
              onChange={(e) => {
                handleOnchange(e);
                validateName(e.target.value);
              }}
              required
            />
            {!errorName ? null : <span>{errorName}</span>}
          </div>
          {/* DATE OF RELEASED */}
          <div>
            <h2 className={styles.name}>Date of release: </h2>
            <input
              className={styles.input}
              name="releaseDate"
              value={videogame.releaseDate}
              type="date"
              onChange={(e) => {
                handleOnchange(e);
                validateDate(e.target.value);
              }}
              required
            />
            {!errorDate ? null : <span>{errorDate}</span>}
          </div>
          {/* RATING */}
          <div>
            <h2 className={styles.name}>Rating: </h2>
            <input
              className={styles.input}
              name="rating"
              value={videogame.rating}
              type="float"
              //min={0}
              //max={5}
              onChange={(e) => {
                handleOnchange(e);
                validateRating(e.target.value);
              }}
            />
            {!errorRating ? null : <span>{errorRating}</span>}
          </div>
          {/* BACKGROUND IMAGE */}
          <div>
            <h2 className={styles.name}>Image URL: </h2>
            <input
              className={styles.imageUrl}
              name="backgroundImage"
              value={videogame.backgroundImage}
              type="text"
              onChange={(e) => {
                handleOnchange(e);
                validateImage(e.target.value);
              }}
            />
            {!errorImage ? null : <span>{errorImage}</span>}
          </div>
          {/* GENRES */}
          <div>
            <h2 className={styles.name}>Genres:</h2>
            <select className={styles.select} onChange={(e) => handleSelect(e)}>
              <option>Select genres</option>
              {genres?.map((g) => {
                return (
                  <option
                    key={g.id}
                    value={g.name}
                    name={g.name}
                  >
                    {g.name}
                  </option>
                );
              })}
            </select>
             {videogame.genre.map((g,index) => {
                return(<a key={index}>
                  {g} 
                  <button key={index} className={styles.btnX} onClick={()=>handleDelete(g)}>x</button>
                </a>
              )})}
          </div>
          {/* PLATFORMS */}
          <div>
            <h2 className={styles.name}>Platforms: </h2>
            <div className={styles.checkBox}>
              {platformsFromDb?.map((p) => {
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
            {!errorPlatforms ? null : <span>{errorPlatforms}</span>}
          </div>
          {/* DESCRIPTION */}
          <div>
            <h2 className={styles.name}>Description:</h2>
            <input className={styles.description}
              name="description"
              value={videogame.description}
              type="text"
              onChange={(e) => handleOnchange(e)}
              required
            />
          </div>
          <div className={styles.button}>
            <button  type="submit">Create</button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
