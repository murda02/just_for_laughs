import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { REMOVE_JOKE } from "../utils/mutations";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const [removeJoke] = useMutation(REMOVE_JOKE);
  const [btnColorSave, setBtnColorSave] = useState("rgb(169, 207, 243)");
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const deleteJoke = async (result) => {
    await removeJoke({
      variables: { jokeId: result },
    });
  };

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  var hStyle = {
    color: "yellow",
    marginLeft: "1%"
  };

  if (!user?.username) {
    return (
      <h4 style={hStyle}>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  var savedJokesStyle = {
    color: "yellow",
    whiteSpace: "pre-wrap",
    borderStyle: "ridge",
    borderColor: "yellow",
    padding: "1%",
    display: "inline-flex",
  };

  const css = `@media (min-width: 375px) {
    h2 {font-size: 1.3rem; padding-left: 13%}
    h4 {font-size: 1.9rem; padding-left: 13%}
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
        <h2 style={hStyle}>
          {user.username}, here are your jokes:
          <br />
        </h2>
        <div>
          {data.jokes.map((d) => (
            <div id="savedJokes" key={d._id} style={savedJokesStyle}>
              {d.jokeText}

              <button
                onClick={() => {
                  btnColorSave === "rgb(169, 207, 243)"
                    ? setBtnColorSave("yellow")
                    : setBtnColorSave("rgb(169, 207, 243)");
                  deleteJoke(d._id);
                  window.location.reload();
                }}
                style={{
                  backgroundColor: btnColorSave,
                  fontSize: "1.1rem",
                  borderRadius: "8px",
                  margin: "5px"
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
