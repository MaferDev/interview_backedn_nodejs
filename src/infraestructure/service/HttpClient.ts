import axios from 'axios';

export const HttpClient = (BaseURL: string) =>
  axios.create({
    baseURL: BaseURL,
    timeout: 80000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

export const { Cancel } = axios;
