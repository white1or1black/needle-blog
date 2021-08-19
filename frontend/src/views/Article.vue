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
    <div class="metadata">
      <span> updated at {{ updatedAt | dateFilter }}, &nbsp;</span>
      <span> {{ view }} views </span>
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
import { dateFilter } from '../assets/js/filters';

export default {
  name: 'Article',
  components: { MarkdownViewer, Blogs },
  data() {
    return {
      pageId: null,
      blogDetail: null,
      title: '',
      updatedAt: '',
      view: 0,
      content: '',
    }
  },
  computed: {},
  mounted() {
    this.isLogin = checkLogin();
    this.pageId = this.$route.params.id;
    if (!this.pageId) alert('No article found');
    this.getBlog();
  },
  filters: {
    dateFilter,
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
      }, this);
    },
    getBlog() {
      if (!this.pageId) {
        alert(`invalid article id: ${this.pageId}`);
        return;
      }
      axios.get(`/page/get/${this.pageId}`).then(res => {
        if (res.status === 200) {
          this.blogDetail = res.data;
          document.title = this.blogDetail.title;
          this.title = this.blogDetail.title;
          this.updatedAt = this.blogDetail.updatedAt;
          this.view = this.blogDetail.view;
          this.content = this.blogDetail.content;
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
    .metadata {
      text-align: center;
      font-size: 1rem;
      font-style: italic;
      color: #c9944a;
    }
    .blog-content {
      margin: 0 2%;
    }
  }
}
</style>