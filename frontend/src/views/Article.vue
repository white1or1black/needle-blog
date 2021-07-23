<template>
<div class="main">
  <div class="page">
    <div class="op-edit" v-if="pageId && isLogin">
      <input type="button" value="edit" @click="editPage">
      <input type="button" value="delete" @click="delPage">
    </div>
    <div class="blog-title">
      {{title}}
    </div>
    <div>
      {{updatedAt}}
    </div>
    <div class="blog-content">
      <MarkdownViewer :content="content" />
    </div>
  </div>
</div>
</template>

<script>
import axios from '../assets/js/axios';
import MarkdownViewer from '../components/MarkdownViewer';
import Blogs from '../components/Blogs';
import variables from '../assets/js/variables';
import { checkAuth, checkLogin } from '../assets/js/common';

export default {
  name: 'Article',
  components: { MarkdownViewer, Blogs },
  data() {
    return {
      pageId: null,
      title: '',
      content: '',
      isLogin: false,
      updatedAt: null,
    }
  },
  computed: {},
  mounted() {
    this.isLogin = checkLogin();
    let curBlog = localStorage.getItem(variables.CUR_BLOG_INFO);
    if (!curBlog) {
      this.pageId = this.$route.params.id;
      this.getBlog();
    } else {
      curBlog = JSON.parse(curBlog);
      this.pageId = curBlog.id;
      this.title = curBlog.title;
      this.content = curBlog.content;
    }
  },
  methods: {
    delPage() {
      axios.delete(`/page/del/${this.pageId}`).then(res => {
        this.$router.push({name: 'Home'});
      }).catch(err => {
        alert(err.message);
      });
    },
    editPage() {
      checkAuth(this.pageId, () => {
        this.$router.push({name: 'Edit', params: { id: this.pageId }});
      });
    },
    getBlog() {
      if (!this.pageId) {
        alert(`invalid article id: ${this.pageId}`);
        return;
      }
      axios.get(`/page/get/${this.pageId}`).then(res => {
        if (res.data instanceof Array && res.data.length > 0) {
          const data = res.data[0];
          document.title = data.title;
          this.title = data.title;
          this.content = data.content;
        }
      }).catch(err => {
        alert(err.message);
      });
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variables';
.main {
  display: flex;
  .blog-list {
    width: 15rem;
  }
  .page {
    width: 65rem;
    min-height: 49rem;
    background: $main-bg-theme;
    margin: auto;
    margin-bottom: 2%;
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
}
</style>