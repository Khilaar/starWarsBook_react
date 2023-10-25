import { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import Starships from '../Starships/Starships';
import './Movies.css';


function Movies() {
    //Here we set the list of all movies, allMovies includes all movie-objects with all details
    const [allMovies, setAllMovies] = useState([]);
    const [clickedMovieTitle, setClickedMovieTitle] = useState('');
    

    const fetchMovies = async () => {
        try {
            const results = await axios.get('https://swapi.constructor-learning.com/api/films');
            setAllMovies(results.data.results);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    let clickedMovie = (event) => {
        const title = event.target.innerText;
        if (clickedMovieTitle === title) {
            setClickedMovieTitle('');
        } else {
            setClickedMovieTitle(title);
        }
    };

    const movieSection = allMovies.map((movie, index) => (
        <div key={index}>
            <p className='movieTitle' key={index} onClick={clickedMovie}>{movie.title}</p>
            {clickedMovieTitle === movie.title && 
            <div className="movieContainer">
                <p className='movieOpeningBrawl'>{movie.opening_crawl}</p>
                <Starships allMovies={allMovies} clickedMovieTitle={clickedMovieTitle}></Starships>
            </div>
            }
            
        </div>
    ));

    return (
        <>
            {movieSection}
            
        </>
    );
}

export default Movies;

//{title: 'A New Hope', episode_id: 4, opening_crawl: 'It is a period of civil war.\r\nRebel spaceships, st…er\r\npeople and restore\r\nfreedom to the galaxy....', director: 'George Lucas', producer: 'Gary Kurtz, Rick McCallum', …} 