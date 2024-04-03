import axios from "axios";

const BASE_API = "https://api.github.com/users/monicaVaideanu";

export const getAllData = () => axios.get(`${BASE_API}`);
export const getAvatar = (avatar_url) => axios.get(avatar_url, { responseType: 'blob' });
export const getRepos = () => axios.get(`${BASE_API}/repos`);