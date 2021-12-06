import React, { useState, useEffect } from 'react';
import {theJoke} from '../../utils/API'
import { useMutation } from '@apollo/client';
import { ADD_JOKE } from '../../utils/mutations';

const JokeContainer = () => {
  const [result, setResult] = useState({});
  const [category, setCategory] = useState("Any");
  const [addJoke] = useMutation(ADD_JOKE);

  useEffect(() => {
    theJoke(category).then((res) => {
      setResult(res.data);
    });
  }, [category]);

  const handleSelect = (e) => {
    setCategory(e.target.value);
  };

  const newJoke = () => {
    theJoke(category).then((res) => {
      console.log("res.data.joke", res.data.joke);
      console.log("res.data.setup", res.data.setup);
      console.log("res.data.delivery", res.data.delivery);
      setResult(res.data);
    });
  };

  const saveJoke = async (result) => {
    // addJoke(e)
    let fullJoke = "";
    if (result.joke === undefined) {
      fullJoke = result.setup + result.delivery;
    } else {
      fullJoke = result.joke;
    }
    await addJoke({
      variables: { jokeText: fullJoke },
    });
  };

  var categoryStyle = {
    display: "flex",
    justifyContent: "left",
    color: "yellow",
    paddingLeft: "2%"
  };

  var selectStyle = {
    fontSize: "1.1rem",
    display: "flex",
    backgroundColor: "rgb(169, 207, 243)",
    justifyContent: "center",
  };

  var divStyle = {
    marginTop: "2%",
    fontSize: "1.2rem",
    justifyContent: "center"
  };

  var btnNewStyle = {
    fontSize: "1.1rem",
    backgroundColor: "rgb(169, 207, 243)",
    borderRadius: "8px",

  };

  var btnSaveStyle = {
    marginTop: "8px",
    fontSize: "1.1rem",
    backgroundColor: "rgb(169, 207, 243)",
    borderRadius: "8px",

  };

  var jokeStyle = {
    borderStyle: "ridge",
    borderColor: "yellow",
    display: "inline-flex"
  };

  const css =`
  @media (min-width: 375px) {
    label {font-size: 1rem;}
    button {margin-left: 14%}
    #jokeDiv {margin: 8%; padding: 3%}
  }
  @media (min-width: 768px) {
    label {font-size: 1.2rem}
    button {margin-left: 8%}
    #jokeDiv {margin: 5%; padding: 2%}
  }
  @media (min-width: 1200px) {
    label {font-size: 1.5rem}
    button {margin-left: 3.5%}
    #jokeDiv {margin: 2%; padding: 1%}
  }`;

  return (
    <div style={divStyle}>
      <style scoped>{css}</style>
      <label style={categoryStyle}>
        Joke Category:&nbsp;&nbsp;&nbsp;
        <select id="categoryList" onChange={handleSelect} style={selectStyle}>
          <option>Choose </option>
          <option value="Any">Any</option>
          <option value="Misc">Misc</option>
          <option value="Programming">Programming</option>
          <option value="Pun">Pun</option>
          <option value="Halloween">Halloween</option>
          <option value="Christmas">Christmas</option>
        </select>
      </label>
      <div id='jokeDiv' style={jokeStyle}>
      {result.joke}
      {result.setup}
      <br />
      <br />
      {result.delivery}
      </div>
      <br />
      <button style={btnNewStyle} onClick={newJoke}>
          New Joke!
        </button>
      <button style={btnSaveStyle} onClick={() => saveJoke(result)} >
        Save Joke!
      </button>
      <br />
      {/* <button>New Joke!</button> */}
    </div>
  );
};

export default JokeContainer;

