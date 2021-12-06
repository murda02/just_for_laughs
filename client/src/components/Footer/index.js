import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();

  var btnBackStyle = {
    fontSize: "1.1rem",
    backgroundColor: "rgb(169, 207, 243)",
    borderRadius: "8px",
    marginTop: "8px"
  };


  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
            style={btnBackStyle}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          Just for laughs{' '}
          <span
            className="emoji"
            role="img"
            aria-label="laughing"
            aria-hidden="false"
          >
            😂
          </span>{' '}
          brough to you by Dave.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
