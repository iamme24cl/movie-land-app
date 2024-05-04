import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";

const Row = ({ title, fetchUrl, id }) => {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});

    useEffect(() => {
        console.log(id, fetchUrl)

        async function fetchData() {
            // Wait until we get the API response
            const request = await axios.get(fetchUrl, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            });
            setMovies(request.data.result);
            return request;
        }
        fetchData()
    }, [fetchUrl]);

    const handleClick = (movie) => {
        setModalVisibility(true);
        setMovieSelection(movie)
    };

    return (
        <section className="row">
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider__arrow-left">
                    <span
                        className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        }}
                    >
                        <ArrowBackIosIcon />
                    </span>
                </div>
                <div className="row__posters">
                    {movies.map((movie, idx) => {
                        <img 
                            key={idx}
                            onClick={() => handleClick(movie)}
                            className={`row__ poster row__posterLarge`}
                            src={`${base_url}${movie.poster_path}`}
                            loading="lazy"
                            alt={movie.title}
                        />
                    })}
                </div>
                <div className="slider__arrow-right">
                    <span
                        className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft += window.innerWidth - 80
                        }}
                    >
                        <ArrowBackIosIcon />
                    </span>
                </div>
            </div>
            {modalVisibility && (
                <div></div>
            )}
        </section>
    );
}

export default Row;
