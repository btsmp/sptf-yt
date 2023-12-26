import axios from 'axios';
const BASE_URL='https://b2x-helper-api.onrender.com/';

export const youtubeApi = axios.create({
  baseURL: BASE_URL
})

