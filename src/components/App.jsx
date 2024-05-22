import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { baseUrl } from '../api/constants';
import MovieRows from './HomePage';
import Navbar from './Navbar';
import MatchingMovies from './MatchingMovies';
import LoginForm from './Login';
import './App.css';

import { verifyToken } from "../helper/helper";

const App = () => {
  const [personalizeUrl, setPersonalizeUrl] = useState(baseUrl + "/all");
  const [rating, setRating] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [query, setQuery] = useState('');

  const addRating = (r) => {
    rating.push(r);
    setRating(rating);
    const params = rating.join("&params=");
    const url = `${baseUrl}/user-rating-based?params=${params}`
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
      setPersonalizeUrl(`/user-based/${user.id}`);
    } else {
      setPersonalizeUrl(baseUrl + "/all");
    }

    if (rating.length > 0) {
      const params = rating.join("&params=");
      const url = `${baseUrl}/user-rating-based?params=${params}`
      setPersonalizeUrl(url);
    }
    console.log(personalizeUrl);
  }, [loggedIn, rating, personalizeUrl, user.id]);

  return (
    <div className='app'>
      <Router>
        <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} query={query} setQuery={setQuery} />
        <Routes>
          <Route 
            path='/' exact 
            element={query.length === 0 ? 
              <MovieRows loggedIn={loggedIn} personalizeUrl={personalizeUrl} addRating={addRating} /> : 
              <MatchingMovies addRating={addRating} query={query} />} 
          />
          <Route path='/login' exact element={<LoginForm setLoggedIn={setLoggedIn} setUser={setUser} />} />
        </Routes>
      </Router>
      
    </div>
  );

};

export default App;
