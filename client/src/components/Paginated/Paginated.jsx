import React from "react";
import styles from './Paginated.module.css'

export default function Paginated({ allVideogamesLength, videogamesPerPage, paginated, currentPage}) {
    let numbersOfpages = []
    for (let index = 1; index <= Math.ceil(allVideogamesLength / videogamesPerPage); index++) {
        numbersOfpages.push(index);
    }

    return (
        <nav className={styles.pagination}>
            
                {numbersOfpages && numbersOfpages.map(number => (
                    // <li className="number" key={number}>
                        <a key={number} className={number===currentPage?`active`:null} onClick={() => paginated(number)}>{number}</a>
                    ))}
            
        </nav>
    )
}