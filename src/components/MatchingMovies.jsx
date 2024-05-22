import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from '../api/axios';
import requests from '../api/requests';
import Banner from './Banner';
import MovieModal from "./modal";
import "./MatchingMovies.css";

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
    <Box sx={{ minHeight: '100vh' }}>
        <Banner />
        <h2 className='title'>Matching Movies</h2>
        <section className='grid'>
                <div id="MMV" className="grid__posters">
                  {/**SEVERAL ROW__POSTER */}
                  {movies.map((movie, idx) => (
                      <img
                      key={idx}
                      onClick={() => handleClick(movie)}
                      className={`grid__poster grid__posterLarge`}
                      src={`${base_url}${movie.poster_path}`}
                      loading="lazy"
                      alt={movie.title}
                      />
                  ))}
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
