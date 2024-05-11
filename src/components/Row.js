import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./modal";
import "./Row.css";

const Row = ({ title, fetchUrl, id }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  useEffect(() => {
    console.log(id, fetchUrl);
    //if [], run once when the row loads, and dont run again

    async function fetchData() {
      //Dont move until we get the API answer
      const request = await axios.get(fetchUrl, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setMovies(request.data.result);
      console.log(title, request.data.result)
      return request;
    }

    fetchData();
  }, [fetchUrl, id, title]);

  const handleClick = (movie) => {
    setModalVisibility(true);
    setMovieSelection(movie);
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
        <div id={id} className="row__posters">
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
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
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
        />
      )}
    </section>
  );
};

export default Row;
