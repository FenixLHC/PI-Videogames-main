import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card(props) {
  return (
    <div clasname={"card"}>
      <Link to={`/VideogameDetail/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
      <img src={props.imgUrl} alt={'Image not found'} width='350px' height='450px'/>
      <ul>
        {/* {props.genres.map((g) => (
          <li>{g}</li>
        ))} */}
        {props.genres}
      </ul>
    </div>
  );
}
