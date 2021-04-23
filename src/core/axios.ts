import axios from 'axios';

axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export { axios };
