<template>
<div class="main">
  <div class="blog-list">
    <input type="button" value="add new blog" @click="addPage" v-if="isLogin">
    <Blogs :blogs="blogs" />
  </div>
</div>
</template>
<script>
import axios from '../assets/js/axios';
import MarkdownViewer from '../components/MarkdownViewer';
import Blogs from '../components/Blogs';
import { checkAuth, checkLogin } from '../assets/js/common';
import variables from '../assets/js/variables';

export default {
  name: 'BlogList',
  components: { MarkdownViewer, Blogs },
  data() {
    return {
      blogs: [],
      isLogin: false,
    }
  },
  computed: {},
  mounted() {
    this.blogList();
    this.isLogin = checkLogin();
  },
  methods: {
    addPage() {
      checkAuth(null, () => {
        this.$router.push({name: 'Edit' });
      }, this);
    },
    blogList() {
      axios.get('/page/get').then(res => {
        this.blogs = res.data;
      }).catch(err => {
        alert(err.message);
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables';

.main {
  display: flex;
  .blog-list {
    margin: 0 auto;
    width: 50rem;
  }
}
</style>