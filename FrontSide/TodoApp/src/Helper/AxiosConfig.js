import axios from 'axios';
import PrefManager from './PrefManager';
import {API_URL} from './Constants';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] =
  'GET,PUT,POST,PATCH,DELETE,OPTIONS';
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.post['Access-Control-Allow-Headers'] =
  'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization';

const instance = axios.create({
  baseURL: API_URL, // Ensure Constants.API_URL is properly set in your appConstants
});

instance.interceptors.request.use(
  async config => {
    try {
      const token = await PrefManager.getValue('@access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
