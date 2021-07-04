<template>
<div class="login">
  <div class="login-desc">
    Login and manage your blogs.
  </div>
  <div class="input-item"> <span> name: </span><input type="text" v-model="username"> </div>
  <div class="input-item"> <span> password: </span> <input type="password" v-model="password"> </div>
  <div class="input-item login-submit"> <input type="button" value="login" @click="login"></div>
</div>
</template>

<script>
import axios from '../assets/js/axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      axios.post('/auth/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data instanceof Object) {
          Object.keys(res.data).forEach(key => {
            localStorage.setItem(key, res.data[key]);
          });
          this.$routeJumpByName('Home');
        } else {
          alert('login failed');
        }
      }).catch(err => {
        alert(err.message);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .login-desc {
    font-size: 2rem;
    font-style: italic;
    text-align: center;
    margin-bottom: 20%;
  }

  width: 18rem;
  margin: 0 auto;
  margin-top: 10%;
  font-size: 1rem;

  .input-item {
    margin-top: 7%;
    font-style: oblique;
    input {
      float: right;
    }
  }

}
</style>