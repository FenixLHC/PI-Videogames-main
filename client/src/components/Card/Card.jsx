import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={styles.Card}>

      <div className={styles.name}>
        <Link to={`/VideogameDetail/${props.id}?createdInDb=${props.createdInDb}`}>
          <h2>{props.name}</h2>
        </Link>
      </div>
      <div className={styles.image}>
        <img src={props.imgUrl} alt={'Image not found'} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.genres}>
          <ul >
            {props.genres?.map((g,index) => (
              <li key={index}>{g}</li>
            ))}
          </ul>
        </div>
        <button className={styles.btn}>
          Know more
        </button>
      </footer>

    </div>
  );
}
