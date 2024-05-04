import React, { useEffect, useState } from 'react';
import { baseUrl } from '../api/constants';
import './App.css';

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

};

export default App;
