import axios from 'axios';
import { base_url } from './Api_Url';

let axiosInstance = axios.create({
  baseURL: base_url,
});

export default axiosInstance;
