import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  var titleStyle = {
    fontSize: "3rem",
    display: "flex",
    justifyContent: "left",
    color: "yellow",
    marginLeft: "2%"
  };

  var divStyle = {
    display: "flex",
    justifyContent: "left",
  };

  var linkStyle = {
    textDecoration: 'none',
    color: "yellow",
  };

  const css = `@media (min-width: 375px) {
    #navLinks { margin-bottom: 8%; margin-left: 14.7%; font-size: 1.1rem}
  }
  @media (min-width: 768px) {
    #navLinks { margin-bottom: 3%; margin-left: 7.7%; font-size: 1.2rem}
  }
  @media (min-width: 1200px) {
    #navLinks { margin-bottom: 1%; margin-left: 3.4%; font-size: 1.3rem}
  }`;
  


  return (
    <header>
      <div >
        <div>
            <h1 style={titleStyle}>Just for Laughs</h1>
        </div>
        <style scoped>{css}</style>
        <div id='navLinks' style={divStyle}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me" style={linkStyle}>
                {Auth.getProfile().data.username}'s profile&nbsp;|
                <br/>
              </Link>
              <Link onClick={logout} style={linkStyle}>
              &nbsp;Logout&nbsp;|
              </Link>
              <Link to="/" style={linkStyle}>
              &nbsp;Home
              </Link>
              
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>
                Login&nbsp;| 
              </Link>
              <Link to="/signup" style={linkStyle}>
              &nbsp;Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
