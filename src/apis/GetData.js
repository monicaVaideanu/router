import axios from "axios";

const BASE_API = "https://api.github.com/users/monicaVaideanu";
const BASE_API_REPOS= "https://api.github.com/repositories";

export const getAllData = () => axios.get(`${BASE_API}`);
export const getAvatar = (avatar_url) => axios.get(avatar_url, { responseType: 'blob' });
export const getRepos = () => axios.get(`${BASE_API}/repos`);
export const getRepoIndividual = (repoId) => axios.get(`${BASE_API_REPOS}/${repoId}`);