import { useEffect, useState } from "react";
import axios from "axios";
import './StarshipsInfos.css';

function StarshipsInfos(props) {
    const [allStarshipInfos, setAllStarshipInfos] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchStarships = async (starshipUrl) => {
            try {
                const results = await axios.get(starshipUrl);

                if (props.clickedStarshipName === results.data.name) {
                    const moreShipInfos = {
                        model: results.data.model,
                        cost_in_credits: results.data.cost_in_credits,
                        crew: results.data.crew,
                        manufacturer: results.data.manufacturer,
                        cargo_capacity: results.data.cargo_capacity,
                        starship_class: results.data.starship_class,
                        max_atmosphering_speed: results.data.max_atmosphering_speed,
                    };
                    const newStarshipInfos = Object.entries(moreShipInfos).map(([key, value]) => `${key.replaceAll("_", " ")}: ${value}`);
                    setAllStarshipInfos(newStarshipInfos);
                    setIsVisible(true);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (props.clickedStarshipName) {
            for (const movie of props.allStarshipsofTheClickedMovie) {
                if (movie.title === props.clickedMovieTitle) {
                    movie.starships.forEach((starshipUrl) => {
                        fetchStarships(starshipUrl);
                    });
                }
            }
        }
    }, [props.clickedMovieTitle, props.clickedStarshipName, props.allStarshipsofTheClickedMovie]);

    const closeInfos = () => {
        setAllStarshipInfos([]);
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <>
                    <p className="spaceshipInfosTitle">Infos {props.clickedStarshipName}</p>
                    {allStarshipInfos.map((info, index) => (
                        <p className="spaceshipInfosParagraph" key={index}>{info}</p>
                    ))}
                    <button onClick={closeInfos}>Close Infos</button>
                </>
            )}
        </>
    );
}

export default StarshipsInfos;