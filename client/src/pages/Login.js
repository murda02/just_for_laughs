import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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
          <h4 style={titleStyle}>Login</h4>
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
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  style={formStyle}
                /> 
                <input
                  className="form-input"
                  placeholder="Enter your password"
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

export default Login;
