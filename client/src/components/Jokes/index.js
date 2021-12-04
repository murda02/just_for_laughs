import React, { useState, useEffect } from 'react';
import {theJoke} from '../../utils/API'
import { useMutation } from '@apollo/client';
import { ADD_JOKE } from '../../utils/mutations';
import auth from '../../utils/auth'



const JokeContainer = () => {
  const [result, setResult] = useState({});
  const [category, setCategory] = useState('Any')
  const [addJoke, { error, data }] = useMutation(ADD_JOKE);

  var aboutStyle = {
    fontSize: "1.5rem",
    color: 'black',
    display: "block",
    left: "2%",
    paddingLeft: '2%',
    width: '60%',
    paddingBottom: '2%',
    textIndent: '50px'
  };

  var picStyle = {

    display: 'block',
    paddingBottom: '3%',
    paddingTop: '1%',
    paddingLeft: '2%'
  }

  var textStyle = {
    paddingLeft: '2%',
    fontSize: "2rem"
  }

  const css = `@media (min-width: 320px) {
    img {
      width: 70%;
    }
  }
  @media (min-width: 768px) {
    img {
      width: 50%;
    }
  }
  @media (min-width: 1200px) {
    img {
      width: 25%;
  }
  }`;

  useEffect(() => {
    theJoke(category).then((res) => {
      setResult(res.data);
    });
  }, []);

  const handleSelect= (e) => {
    setCategory(e.target.value);
  }

  const newJoke = () => {
    theJoke(category).then((res) => {
      console.log("res.data.joke", res.data.joke);
      console.log("res.data.setup", res.data.setup);
      console.log("res.data.delivery", res.data.delivery);
      setResult(res.data);
    });
  }

  const saveJoke = async (result) => {
    // addJoke(e)
    let  fullJoke = ''
    if (result.joke === undefined) {
      fullJoke = result.setup+result.delivery
    } else {
      fullJoke = result.joke
    }
    console.log('(***********fullJoke************): ', (fullJoke));
    await addJoke({
      variables: {jokeText: fullJoke}})
  }

  return (
    <div>
      <label>Joke Category:</label>
        <select id="categoryList" onChange={handleSelect}>
            <option>Choose </option>
            <option value='Any'>Any</option>
            <option value='Misc'>Misc</option>
            <option value='Programming'>Programming</option>
            <option value='Pun'>Pun</option>
            <option value='Halloween'>Halloween</option>
            <option value='Christmas'>Christmas</option>
            </select>
            <br/>
            <button id="new-joke-btn" onClick={newJoke}>New Joke!</button>
            <br />
      {result.joke}
      {result.setup}
      {result.delivery}
      <br />
      <button id="save-joke-btn" onClick={() => saveJoke(result)}>Save Joke!</button>
      <br />
      {/* <button>New Joke!</button> */}
    </div>
  );
};

export default JokeContainer

