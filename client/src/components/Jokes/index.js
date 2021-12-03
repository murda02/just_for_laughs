import React, { useState, useEffect } from 'react';
import {theJoke} from '../../utils/API'

const JokeContainer = () => {
  const [result, setResult] = useState({});


useEffect(() => {
    theJoke().then(res => {
        console.log("res.data", res.data);
        setResult(res.data)
    });
  }, []);


  return (
    <div>
        {result.joke || result.setup}
    </div>
  )

};

export default JokeContainer

