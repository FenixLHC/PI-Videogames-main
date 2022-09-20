import React from "react";

export default function Paginated({ allVideogamesLength, videogamesPerPage, paginated }) {
    let numbersOfpages = []
    for (let index = 1; index <= Math.ceil(allVideogamesLength / videogamesPerPage); index++) {
        numbersOfpages.push(index);
    }

    return (
        <nav>
            <ul>
                {numbersOfpages && numbersOfpages.map(number => (
                    <li className="number" key={number}>
                        <a onClick={() => paginated(number)}>{number}</a>
                    </li>))}
            </ul>
        </nav>
    )
}