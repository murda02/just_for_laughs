import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  var titleStyle = {
    fontSize: "1.8rem",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "2%",
    color: "yellow"
  };

  var formStyle = {
    fontSize: "1.1rem",
    display: "flex",
    justifyContent: "center",
    flexFlow: `row wrap`,
    marginRight: "8px"
  };

  var divStyle = {
    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "2%",
    paddingRight: "2%"
  };

  var btnSubmitStyle = {
    fontSize: "1.1rem",
    backgroundColor: "rgb(169, 207, 243)",
    borderRadius: "8px",
    cursor: 'pointer'
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 style={titleStyle}>Sign Up</h4>
          <div className="card-body" style={divStyle}>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} style={formStyle}>
                <input
                  className="form-input"
                  placeholder="Enter username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  style={formStyle}
                />
                <input
                  className="form-input"
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  style={formStyle}
                />
                <input
                  className="form-input"
                  placeholder="Enter password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  style={formStyle}
                />
                <button
                  className="btn btn-block btn-primary"
                  type="submit"
                  style={btnSubmitStyle}
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
