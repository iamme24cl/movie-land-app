import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="movie_land logo"
        src={process.env.PUBLIC_URL + "/mvl_logo.png"}
        className="nav__logo"
      />
      <img
        alt="User logged"
        src="https://randomuser.me/api/portraits/thumb/men/1.jpg"
        className="nav__avatar"
      />
    </nav>
  );
};

export default Nav;
