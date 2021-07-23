import variables from "./variables";
import axios from './axios';

export function checkAuth(pageId, cb) {
  axios.get(`/auth/check`).then(res => {
    if (res.data === 'success')
      cb();
  }).catch(err => {
    alert(err.message);
    this.$routeJumpByName('Login');
  });
};

export function checkLogin() {
  const username = localStorage.getItem(variables.USERNAME);
  return username && username.length > 0;
}