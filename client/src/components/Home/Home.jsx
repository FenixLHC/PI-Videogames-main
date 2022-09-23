import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { filterByGenre, filterByOrigin, getGenres, getVideogames, orderByName, orderByRating } from "../../redux/actions";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css'

export default function Home(props) {

    const dispatch = useDispatch();
    const totalVideogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres)

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const [renderizated,setRenderizated]=useState('')

    const indexOfLastVideogame = currentPage * videogamesPerPage;//15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;//0
    const currentVideogames = totalVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    const paginated = (pageNumber) => { setCurrentPage(pageNumber) }
    const paginatedPerPage = (vgsPerPage) => setVideogamesPerPage(vgsPerPage)


    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres())
    }, [])
    // if(allVideogames) console.log(allVideogames[0].name)

    function handleReload(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleGenres(e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
    }

    function handleOrigin(e) {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value))
    }

    function handleName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setRenderizated(`Order by ${e.target.value}`)
    }

    function handleRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setRenderizated(`Order by ${e.target.value}`)
    }
    console.log(`${renderizated}`)
    return (
        <div >
            <Link to="/CreateVideogame">Create Videogame</Link>
            <h1>Take a view of this Videogames</h1>
            <button onClick={(e) => { handleReload(e) }} >
                Reload all Videogames
            </button>
            <div>
                <select name='orderByName' id='' onChange={e => handleName(e)}>
                    <option value='default'>Default</option>
                    <option value='asc' >Ascendent</option>
                    <option value='desc'>Descendent</option>
                </select>
                <select name='orderByRating' id=''onChange={e=>handleRating(e)}>
                    <option value='default'>Default</option>
                    <option value='ascRating'>Ascendente</option>
                    <option value='descRating'>Descendente</option>
                </select>
                <select name='genre' id='' onChange={(e) => handleGenres(e)}>
                    <option value={'All'}>All</option>
                    {genres.map(g => {
                        return (
                            <option key={g.id} value={g.name} >{g.name}</option>
                        )
                    })}
                </select>
                <select name='origin' id='' onChange={(e) => handleOrigin(e)}>
                    <option value='All'>All</option>
                    <option value='Existing'>Existing</option>
                    <option value='Created'>Created</option>
                </select>
            </div>
            <Paginated allVideogamesLength={totalVideogames.length} videogamesPerPage={videogamesPerPage} paginated={paginated} />

            <SearchBar />
            
            <div className="cardsOnHome">
                {
                    currentVideogames && currentVideogames.map((v) => {
                        return (
                            <Card
                                key={v.id}
                                id={v.id}
                                createdInDb={v.createdInDb?v.createdInDb:false}
                                name={v.name}
                                imgUrl={v.image?v.image:v.img}
                                genres={v.genres}
                            />
                        )
                    })
                }
            </div>
        </div>
    )

}

// 