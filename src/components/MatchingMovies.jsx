import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from '../api/axios';
import requests from '../api/requests';
import Banner from './Banner';
import MovieModal from "./modal";
import "./Row.css";

const MatchingMovies = ({ addRating, query }) => {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});

    useEffect(() => {
        async function fetchData() {
          //Dont move until we get the API answer
          const request = await axios.get(requests.searchMovies + query, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
          setMovies(request.data.data);
          console.log(request.data.data)
          return request;
        }
    
        fetchData();
      }, [query]);

    const handleClick = (movie) => {
        setModalVisibility(true);
        setMovieSelection(movie);
    };

  return (
    <Box sx={{ height: '100vh'}}>
        <Banner />
        <section className="row">
            <h2>Matching Movies</h2>
            <div className="slider">
                <div className="slider__arrow-left">
                <span
                    className="arrow"
                    onClick={() => {
                    document.getElementById("MMV").scrollLeft -= window.innerWidth - 80;
                    }}
                >
                    <ArrowBackIosIcon />
                </span>
                </div>
                <div id="MMV" className="row__posters">
                {/**SEVERAL ROW__POSTER */}
                {movies.map((movie, idx) => (
                    <img
                    key={idx}
                    onClick={() => handleClick(movie)}
                    className={`row__poster row__posterLarge`}
                    src={`${base_url}${movie.poster_path}`}
                    loading="lazy"
                    alt={movie.title}
                    />
                ))}
                </div>
                <div className="slider__arrow-right">
                <span
                    className="arrow"
                    onClick={() => {
                    document.getElementById("MMV").scrollLeft += window.innerWidth - 80;
                    }}
                >
                    <ArrowForwardIosIcon />
                </span>
                </div>
            </div>
            {modalVisibility && (
                <MovieModal
                {...movieSelected}
                setModalVisibility={setModalVisibility}
                addRating={addRating}
                />
            )}
        </section>
    </Box>
  )
};

export default MatchingMovies;
