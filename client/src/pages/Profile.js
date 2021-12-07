import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  var h2Style = {
    color: "yellow",
  };

  var savedJokesStyle = {
    color: "yellow",
    whiteSpace: "pre-wrap",
    borderStyle: "ridge",
    borderColor: "yellow",
    padding: "1%",
    display: "inline-flex"
  };

  const css = `@media (min-width: 375px) {
    h2 {font-size: 1.3rem; padding-left: 13%}
    li {font-size: 1.1rem; margin: 6%}
    #savedJokes {margin: 5%}
  }
  @media (min-width: 768px) {
    h2 {font-size: 1.4rem; padding-left: 8.5%}
    li {font-size: 1.2rem; margin: 3%}
    #savedJokes {margin: 2.5%; font-size: 1.2rem}
  }
  @media (min-width: 1200px) {
    h2 {font-size: 2.1rem; padding-left: 3%}
    li {font-size: 1.3rem; margin: 1%}
    #savedJokes {margin: 1%; font-size: 1.4rem}
  }`;

  return (
    <div>
      <div className="flex-row justify-center mb-3">
      <style scoped>{css}</style>
        <h2 style={h2Style}>
          {user.username}, here are your jokes:
          <br />
        </h2>
        <div>
          {data.jokes.map(d => (<div id='savedJokes' key={d.joke} style={savedJokesStyle}>{d.jokeText}</div>))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
