import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { baseUrl } from '../api/constants';
import requests from "../api/requests";
import './App.css';
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import verifyToken from '../helper/helper';

const App = () => {
  const [personalizeUrl, setPersonalizeUrl] = useState(baseUrl + "/all");
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    if (verifyToken()) {
      if (localStorage.getItem("user") ){
        u = JSON.parse(localStorage.getItem("user"));
        setUser(u);
        setLoggedIn(true)
      }
    }
  })

  useEffect(() => {
    if (loggedIn) {
      setPersonalizeUrl(`/user-based/${user.id}`);
    } else {
      setPersonalizeUrl(baseUrl + "/all");
    }
    console.log("per url", personalizeUrl);
  }, [loggedIn, personalizeUrl, user.id]);

  return (
    <div className='app'>
      <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn} setUser={setUser} />
      <Banner />

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
    </div>
  );

};

export default App;
