import axios from 'axios';

// request interceptors
axios.interceptors.request.use(async config => {
  config.headers.token = localStorage.getItem('token');
  if (!config.params) config.params = {};
  return config;
}, function (error) {
  return Promise.reject(error)
})

// response interceptors
axios.interceptors.response.use(response => {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default axios;