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
    paddingBottom: "2%",
    color: "yellow",
    marginLeft: "4%"
  };

  var divStyle = {
    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "right",
    paddingBottom: "2%",
    paddingRight: "2%"
  };

  var linkStyle = {
    textDecoration: 'none',
    color: "yellow"
  };


  return (
    <header>
      <div >
        <div>
            <h1 style={titleStyle}>Just for Laughs</h1>
        </div>
        <div style={divStyle}>
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
