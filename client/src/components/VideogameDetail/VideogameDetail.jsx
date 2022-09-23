import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getVideogameDetail } from "../../redux/actions";

import "./VideogameDetail.css";

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
      <Link to={"/Home"}>Home</Link>
      <div>
        <h1>{vgD.name}</h1>
        <div>
          <img
            src={vgD.background_image}
            alt="Image not found"
            width={"450px"}
            height="550px"
          />
        </div>
        <h3>Realeased: {vgD.released?vgD.realeased:vgD.releaseDate}</h3>
        <h4>Rating: {vgD.rating}</h4>
        <div>
          Genres:
          <ul>
            {vgD.genres?.map((g) => {
              return <li key={g.id}>{g.name}</li>;
            })}
          </ul>
        </div>
        <div>
          Platforms:
          {/* <ul>
            {vgD.platforms?.map((p) => {
              return <li key={p.platform.id}>{p.platform.name}</li>;
            })}
          </ul> */}
        </div>
        <text>Descripcion: {vgD.description_raw}</text>
      </div>
    </div>
  );
}
