import React from 'react';

import JokeContainer from '../components/Jokes';


const Home = () => {


  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
        >
          <JokeContainer />
        </div>
        <div className="col-12 col-md-8 mb-3">
        </div>
      </div>
    </main>
  );
};

export default Home;
