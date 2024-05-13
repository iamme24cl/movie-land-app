import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { baseUrl } from '../api/constants';
import MovieRows from './MovieRows';
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
    console.log("in here")
    if (verifyToken()) {
      console.log("verify token..")
      if (localStorage.getItem("user") ){
        const u = JSON.parse(localStorage.getItem("user"));
        setUser(u);
        setLoggedIn(true)
      }
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      console.log(user.id)
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

      <MovieRows loggedIn={loggedIn} personalizeUrl={personalizeUrl} />
    </div>
  );

};

export default App;
