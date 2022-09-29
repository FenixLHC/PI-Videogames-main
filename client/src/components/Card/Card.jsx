import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={styles.Card}>

      {/* <div className={styles.name}> */}
        <Link to={`/VideogameDetail/${props.id}?createdInDb=${props.createdInDb}`} className={styles.link}>
          <h2>{props.name}</h2>
        </Link>
      {/* </div> */}
      {/* <div > */}
        <img src={props.imgUrl} alt={'Image not found'} className={styles.image} />
      {/* </div> */}
      <footer className={styles.footer}>
        <div className={styles.genres}>
            {props.genres?.map((g,index) => (
              <a key={index}>{g}</a>
            ))}
        </div>
        <Link to={`/VideogameDetail/${props.id}?createdInDb=${props.createdInDb}`} className={styles.link}>
          <button className={styles.btn}>
            Go!
          </button>
          
        </Link>
      </footer>

    </div>
  );
}
