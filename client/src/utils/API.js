import axios from 'axios';

export const theJoke = async (category)  =>
    axios.get(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,racist,political,sexist,explicit`)



