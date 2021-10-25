import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found text-center">
      <h2>Error 404</h2>

      <p>Sorry, this page does not exist</p>

      <p className="link">
        <NavLink to="/home" exact className="go-to-home">
          Go to Home
        </NavLink>
      </p>
    </div>
  );
};

export default PageNotFound;
