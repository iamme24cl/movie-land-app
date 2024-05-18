import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { baseUrl } from '../api/constants';
import MovieRows from './HomePage';
import './App.css';
import Nav from "./Nav";
import LoginForm from './Login';
import { verifyToken } from "../helper/helper";

const App = () => {
  const [personalizeUrl, setPersonalizeUrl] = useState(baseUrl + "/all");
  const [rating, setRating] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const addRating = (r) => {
    rating.push(r);
    setRating(rating);
    const params = rating.join("&params=");
    const url = `${baseUrl}/user-rating-based/?params=${params}`
    setPersonalizeUrl(url);
  };

  useEffect(() => {
    if (verifyToken()) {
      console.log("verified token...")
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
  }, [loggedIn, user.id]);

  useEffect(() => {
    if (rating.length > 0) {
      const params = rating.join("&params=");
      const url = `${baseUrl}/user-rating-based/?params=${params}`
      setPersonalizeUrl(url);
    }
    console.log(personalizeUrl);
  }, [rating, personalizeUrl]);

  return (
    <div className='app'>
      <Router>
      <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Routes>
          <Route path='/' exact element={<MovieRows loggedIn={loggedIn} personalizeUrl={personalizeUrl} addRating={addRating} />} />
          <Route path='/login' exact element={<LoginForm setLoggedIn={setLoggedIn} setUser={setUser} />} />
        </Routes>
      </Router>
      
    </div>
  );

};

export default App;
