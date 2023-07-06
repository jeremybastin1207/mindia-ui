import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3500/v0',
});
