import React from "react";
import Row from "./Row";
import Banner from "./Banner";
import requests from "../api/requests";

const HomePage = ({ loggedIn, personalizeUrl, addRating }) => {
    return (
        <>
            <Banner />
            <Row 
                title="Our Pick"
                id="MVL"
                fetchUrl={requests.fetchMVLPick}
                addRating={addRating}
            />

            {loggedIn && <Row 
                title="Recommended For You"
                id="RF"
                fetchUrl={personalizeUrl}
                addRating={addRating}
            />}
            
            <Row 
                title="Action Movies"
                id="AM"
                fetchUrl={requests.fetchActionMovies}
                addRating={addRating}
            />
            <Row 
                title="Comedy Movies"
                id="CM"
                fetchUrl={requests.fetchComedyMovies}
                addRating={addRating}
            />
            <Row 
                title="Horror Movies"
                id="HM"
                fetchUrl={requests.fetchHorrorMovies}
                addRating={addRating}
            />
            <Row 
                title="Romance Movies"
                id="RM"
                fetchUrl={requests.fetchRomanceMovies}
                addRating={addRating}
            />
        </>
    );
};

export default HomePage;