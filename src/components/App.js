import React, { useEffect, useState } from 'react';
import { baseUrl } from '../api/constants';
import './App.css';
import Nav from "./Nav"
import Banner from "./Banner"

const App = () => {
  const [personalizeUrl, setPersonalizeUrl] = useState(baseUrl + "/all");
  const [loggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    if (loggedIn) {
      const url = `${baseUrl}/user-based/${7}`;
      setPersonalizeUrl(url);
    }
    console.log(personalizeUrl);
  });

  return (
    <div className='App'>
      <Nav />
      <Banner />
    </div>
  );

};

export default App;
