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
    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "left",
    marginLeft: "1%",
    // marginBottom: "1%"
  };

  var linkStyle = {
    textDecoration: 'none',
    color: "yellow",
  };

  const css = `@media (min-width: 375px) {
    #loginLink { margin-bottom: 8%; }
  }
  @media (min-width: 768px) {
    #loginLink { margin-bottom: 3%; }
  }
  @media (min-width: 1200px) {
    #loginLink { margin-bottom: 1%; }
  }`;
  


  return (
    <header>
      <div >
        <div>
            <h1 style={titleStyle}>Just for Laughs</h1>
        </div>
        <style scoped>{css}</style>
        <div id='loginLink' style={divStyle}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me" style={linkStyle}>
                {Auth.getProfile().data.username}'s profile&nbsp;|
                <br/>
              </Link>
              <Link onClick={logout} style={linkStyle}>
              &nbsp;Logout
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
