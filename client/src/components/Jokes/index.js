import React, { useState, useEffect } from 'react';
import {theJoke} from '../../utils/API'

const JokeContainer = () => {
  const [result, setResult] = useState({});


useEffect(() => {
    theJoke().then(res => {
        console.log("res.data.joke", res.data.joke);
        console.log("res.data.setup", res.data.setup);
        console.log("res.data.delivery", res.data.delivery);
        setResult(res.data)
    });
  }, []);



  return (
    <div>
        {result.joke}
        {result.setup}
        {result.delivery}
        <br/>
        <button>Save Joke!</button>
        <br/>
        <button>New Joke!</button>
    </div>
  )

};

export default JokeContainer

