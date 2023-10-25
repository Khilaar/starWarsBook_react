import { useEffect, useState } from "react";
import StarshipsInfos from "../StarshipsInfos/StarshipsInfos";
import axios from 'axios';
import './Starships.css';

function Starships(props) {
    const [allStarships, setAllStarships] = useState([]);
    const[clickedStarshipName, setClickedStarshipName] = useState("")

    const fetchStarships = async (starshipUrl) => {
        try {
            const results = await axios.get(starshipUrl);
            setAllStarships(prevStarships => [...prevStarships, results.data.name]);
        } catch (error) {
            console.log(error.message);
        }
    };

    let allStarshipsofTheClickedMovie = [...props.allMovies];
    let starshipsFetched = false;

    const printAllShipsOfMovie = () => {
        allStarshipsofTheClickedMovie.map((starshipsUrl) => {
            if (props.clickedMovieTitle === starshipsUrl.title) {
                starshipsUrl.starships.map((starshipUrl) => {
                    fetchStarships(starshipUrl);
                });
            }
        });
    };

    useEffect(() => {
        if (starshipsFetched) return;
        printAllShipsOfMovie();
        starshipsFetched = true;
    }, [props.clickedMovieTitle]);

    

    const getClickedStarshipName = (e) => {
        setClickedStarshipName(e.target.innerText) 
        
    }

    return (
        <>
            <div>
                <p className="starshipsTitle" >Starships</p>
                {allStarships.map((starship, index) => (
                    <p onClick={getClickedStarshipName}className="starshipsName" key={index}> {starship}</p>
                ))}
            </div>
            <div>
                <StarshipsInfos clickedMovieTitle={props.clickedMovieTitle} allMovies={props.allMovies} clickedStarshipName={clickedStarshipName} allStarships={allStarships} allStarshipsofTheClickedMovie={allStarshipsofTheClickedMovie}></StarshipsInfos>
            </div>
        </>
    );
}

export default Starships;