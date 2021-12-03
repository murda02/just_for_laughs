import axios from 'axios';

const baseURL = "https://v2.jokeapi.dev";
const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const params = [
    "blacklistFlags=nsfw,religious,racist,political,sexist,explicit"
];

export const theJoke = async () =>
    axios.get(`https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,political,sexist,explicit`)
//   axios.get(`${baseURL}/joke/${categories.join(",")}?${params.join("&")};

// export default { theJoke };