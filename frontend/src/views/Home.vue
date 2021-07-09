<template>
<div class="main">
  <div class="blog-list">
    <input type="button" value="add new blog" @click="addPage" v-if="isLogin">
    <Blogs :blogs="blogs" @chagepage="changePage" />
  </div>
  <div class="page">
    <div class="op-edit" v-if="pageId && isLogin">
      <input type="button" value="edit" @click="editPage">
      <input type="button" value="delete" @click="delPage">
    </div>
    <div class="blog-title">
      {{title}}
    </div>
    <div class="blog-content">
      <MarkdownViewer :content="content" />
    </div>
  </div>
  <div>
    <div class="login-block" v-if="isLogin">
      <span class="username"> {{ username + "\'s blog" }} </span>
    </div>
    <div class="login-block" v-else>
      <input type="button" value="login" @click="$routeJumpByName('Login')">
    </div>
  </div>
</div>
  
</template>
<script>
import axios from '../assets/js/axios';
import MarkdownViewer from '../components/MarkdownViewer';
import Blogs from '../components/Blogs';

export default {
  name: 'Home',
  components: { MarkdownViewer, Blogs },
  data() {
    return {
      pageId: null,
      title: '',
      content: '',
      blogs: [],
      isLogin: false,
      username: '',
    }
  },
  computed: {},
  mounted() {
    this.blogList();
    this.isLogin = this.username = localStorage.getItem('username');
  },
  methods: {
    checkAuth(cb) {
      axios.get('/auth/check', {pageId: this.pageId}).then(res => {
        if (res.data === 'success')
          cb();
      }).catch(err => {
        alert(err.message);
        this.$routeJumpByName('Login');
      });
    },
    delPage() {
      axios.delete('/page/del', {
        data: { pageId: this.pageId }
      }).then(res => {
        this.getBlog();
        this.blogList();
        console.log(`delete page(${this.pageId}) result: `, res.data);
      }).catch(err => {
        alert(err.message);
      });
    },
    addPage() {
      this.checkAuth(() => {
        this.$router.push({name: 'Edit', query: { mode: 1 }});
      });
    },
    editPage() {
      this.checkAuth(() => {
        this.$router.push({name: 'Edit', query: { mode: 2, pageId: this.pageId }});
      });
    },
    changePage(pageId) {
      this.pageId = pageId;
      this.getBlog();
    },
    blogList() {
      axios.get('/page/get').then(res => {
        this.blogs = res.data;
      }).catch(err => {
        alert(err.message);
      });
    },
    contentClear() {
      this.pageId = null;
      this.title = '';
      this.content = '';
    },
    getBlog() {
      if (!this.pageId) return;
      axios.get(`/page/get?id=${this.pageId}`).then(res => {
        if (res.data instanceof Array && res.data.length > 0) {
          const data = res.data[0];
          this.title = data.title;
          this.content = data.content;
        } else {
          this.contentClear();
        }
      }).catch(err => {
        alert(err.message);
      });
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.main {
  display: flex;

  .blog-list {
    width: 15rem;
  }

  .page {
    width: 65rem;
    height: 50rem;
    overflow: scroll;
    background: $main-bg-theme;
    margin-left: 2%;
    .op-edit {
      margin: 1%;
    }
    .blog-title {
      text-align: center;
      font-size: 3rem;
    }
    .blog-content {
      margin: 0 2%;
    }
  }

  .login-block {
    width: 8rem;
    text-align: center;
    background: #cceb85;
    border-radius: 30%;
    .username {
      color: rebeccapurple;
    }
  }
}

</style>