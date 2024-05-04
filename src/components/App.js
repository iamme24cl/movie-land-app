import React, { useEffect, useState } from 'react';
import { baseUrl } from '../api/constants';
import requests from "../api/requests";
import './App.css';
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";

const App = () => {
  const [personalizeUrl, setPersonalizeUrl] = useState(baseUrl + "/all");
  const [loggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    if (loggedIn) {
      const url = `${baseUrl}/user-based/${7}`;
      setPersonalizeUrl(url);
    }
    console.log(personalizeUrl);
  }, [loggedIn, personalizeUrl]);

  return (
    <div className='App'>
      <Nav />
      <Banner />

      <Row 
        title="Our Pick"
        id="MVL"
        fetchUrl={requests.fetchMVLPick}
      />
      <Row 
        title="Recommended For You"
        id="RF"
        fetchUrl={personalizeUrl}
      />
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
    </div>
  );

};

export default App;
