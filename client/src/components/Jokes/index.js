import React, { useState, useEffect } from 'react';
import {theJoke} from '../../utils/API'
import { useMutation } from '@apollo/client';
import { ADD_JOKE } from '../../utils/mutations';

const JokeContainer = () => {
  const [btnColorNew, setBtnColorNew] = useState("rgb(169, 207, 243)");
  const [btnColorSave, setBtnColorSave] = useState("rgb(169, 207, 243)");
  const [clicked, setClicked] = useState(false);
  // const [disable, setDisable] = useState(false);
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
      fullJoke = result.setup + "\n\n" + result.delivery;
    } else {
      fullJoke = result.joke;
    }
    
    await addJoke({
      variables: { jokeText: fullJoke },
    });
  };

  const btnClicked = (e) => {
    if (!clicked) {
      setClicked(true)
    }
  }

  var categoryStyle = {
    display: "flex",
    justifyContent: "left",
    color: "yellow"
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

  var jokeStyle = {
    borderStyle: "ridge",
    borderColor: "yellow",
    display: "inline-flex",
    color: "yellow"
  };

  const css =`
  @media (min-width: 375px) {
    label {font-size: 1rem; padding-left: 14%}
    button {margin-left: 14.5%}
    #jokeDiv {margin: 8%; padding: 3%}
  }
  @media (min-width: 768px) {
    label {font-size: 1.2rem; padding-left: 8.5%}
    button {margin-left: 9.5%}
    #jokeDiv {margin: 5%; padding: 2%}
  }
  @media (min-width: 1200px) {
    label {font-size: 1.5rem; padding-left: 3%}
    button {margin-left: 4%}
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
      <button onClick={() => {
          btnColorNew === "rgb(169, 207, 243)" ? setBtnColorNew("yellow") : setBtnColorNew("rgb(169, 207, 243)"); newJoke()
        }}
        style={{ backgroundColor: btnColorNew, fontSize: "1.1rem", borderRadius: "8px" }}>
          New Joke!
        </button>
      <button onClick={() => {
          btnColorSave === "rgb(169, 207, 243)" ? setBtnColorSave("yellow") : setBtnColorSave("rgb(169, 207, 243)"); 
          saveJoke(result); 
          btnClicked();
        }}
        style={{ backgroundColor: btnColorSave, fontSize: "1.1rem", borderRadius: "8px" }}>
        Save Joke!
      </button>
    </div>
  );
};

export default JokeContainer;

