import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getVideogameDetail } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

import styles from "./VideogameDetail.module.css";

export default function VideogameDetail(props) {
  
  const dispatch = useDispatch();
  const vgD = useSelector((state) => state.videogameDetail);
  

  const { id } = props.match.params;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const createdInDb = query.get("createdInDb");

  useEffect(() => {
    dispatch(getVideogameDetail(id, createdInDb));
  }, []);

  return (
    <div>
      <NavBar />
      {vgD.id == id ? (
        <div className={styles.container}>
          <h1>{vgD.name}</h1>
          <div className={styles.imgData}>
            <img
              src={vgD.backgroundImage}
              alt="Image not found"
              width={"450px"}
              height="550px"
            />
            <div className={styles.containerData}>
              <div className={styles.box}>
                <h2>Released: </h2>
                <span>{vgD?.released ? vgD.released : vgD.releaseDate}</span>
              </div>
              <div className={styles.box}>
                <h2>Rating: </h2>
                <span>{vgD.rating}</span>
              </div>

              <div className={styles.box}>
                <h2>Genres: </h2>
                {vgD.genres
                  ? vgD.genres.map((g, index) => {
                      return <a key={index}>{g}</a>;
                    })
                  : vgD.Genres?.map((g) => {
                      return <a key={g.id}>{g.name}</a>;
                    })}
              </div>

              <div className={styles.box}>
                <h2>Platforms: </h2>
                {vgD.platforms
                  ? vgD.platforms.map((p, index) => {
                      return <a key={index}>{p}</a>;
                    })
                  : vgD.Platforms?.map((p, index) => {
                      return <a key={index}>{p.platform?.name}</a>;
                    })}
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h2>Descripcion: </h2>
            <div type="text" className={styles.text}>
              {vgD.description}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
