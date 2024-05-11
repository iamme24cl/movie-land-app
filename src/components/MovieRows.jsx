import React from "react";
import Row from "./Row";
import requests from "../api/requests";

const MovieRows = ({ loggedIn, personalizeUrl }) => {
    return (
        <>
            <Row 
                title="Our Pick"
                id="MVL"
                fetchUrl={requests.fetchMVLPick}
            />

            {loggedIn && <Row 
                title="Recommended For You"
                id="RF"
                fetchUrl={personalizeUrl}
            />}
            
            <Row 
                title="Action Movies"
                id="AM"
                fetchUrl={requests.fetchActionMovies}
            />
            <Row 
                title="Comedy Movies"
                id="CM"
                fetchUrl={requests.fetchComedyMovies}
            />
            <Row 
                title="Horror Movies"
                id="HM"
                fetchUrl={requests.fetchHorrorMovies}
            />
            <Row 
                title="Romance Movies"
                id="RM"
                fetchUrl={requests.fetchRomanceMovies}
            />
        </>
    );
};

export default MovieRows;