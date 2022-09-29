import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getVideogameDetail } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";

import styles from "./VideogameDetail.module.css";

export default function VideogameDetail(props) {
  console.log("🚀 ~ file: VideogameDetail.jsx ~ line 9 ~ VideogameDetail ~ props", props)
  const dispatch = useDispatch();
  const vgD = useSelector((state) => state.videogameDetail);
  console.log("🚀 ~ file: VideogameDetail.jsx ~ line 12 ~ VideogameDetail ~ vgD", vgD)

  const { id } = props.match.params;
  const {search}=useLocation();
  const query = new URLSearchParams(search);
  const createdInDb = query.get('createdInDb')

  // const {createdInDb}=props.query;
  useEffect(() => {
    dispatch(getVideogameDetail(id,createdInDb));
  }, []);

  return (
    <div>
      <NavBar />
      <Link to={"/Home"}>Home</Link>
      <div>
        <h1>{vgD.name}</h1>
        <div>
          <img
            src={vgD.backgroundImage}
            alt="Image not found"
            width={"450px"}
            height="550px"
          />
        </div>
        <h3>Released: {vgD?.released?vgD.released:vgD.releaseDate}</h3>
        <h4>Rating: {vgD.rating}</h4>
        <div>
          Genres:
          <ul>
            {vgD.genres? vgD.genres.map((g,index) => {
              return <li key={index}>{g}</li>;
            }):vgD.Genres?.map((g) => {
              return <li key={g.id}>{g.name}</li>;
            })}
          </ul>
        </div>
        <div>
          Platforms:
          <ul>
            {vgD.platforms? vgD.platforms.map((p,index) => {
              return <li key={index}>{p}</li>;
            }):vgD.Platforms?.map((p,index) => {
              return <li key={index}>{p.platform?.name}</li>;
            })}
          </ul>
        </div>
        <text>Descripcion: {vgD.description}</text>
      </div>
    </div>
  );
}
