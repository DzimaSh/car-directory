import axios from 'axios';
import { API_V1_BASE_URL } from '../constants/settings';

export const objToParams = (
  obj: Record<string, string> | string[][],
): URLSearchParams => new URLSearchParams(obj);

const request = axios.create({
  baseURL: API_V1_BASE_URL,
  withCredentials: false,
});

request.interceptors.response.use(
  (response) => {
    const {
      headers,
      request: { responseURL },
    } = response;

    if (responseURL.includes('authenticate')) {
      window.location.reload();
    } else if (
      typeof headers !== 'undefined'
      && headers['content-type']?.includes('text/html')
    ) {
      throw new Error('unhandled');
    }

    return response;
  },
  (error) => Promise.reject(
    error?.response?.data?.message ? error.response.data : error,
  ),
);

export default request;
