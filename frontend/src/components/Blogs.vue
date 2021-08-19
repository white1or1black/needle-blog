<template>
<div class="blog-list">
  <ul style="list-style-type:none;">
    <div v-for="(item, idx) in blogs">
      <li class="page-link">
        <div @click="goArticle(idx)" class="page-title">
          {{item.title | titleFilter}}
        </div>
        <div class="metadata">
          <span> updated at {{ item.updatedAt | dateFilter }} , &nbsp;</span>
          <span> {{ item.view }} views </span>
        </div>
        <div class="page-brief">
          <MarkdownViewer :content="item.content | contentFilter" />
        </div>
      </li>
    </div>
  </ul>
</div>
</template>

<script>
import axios from '../assets/js/axios';
import MarkdownViewer from './MarkdownViewer';
import variables from '../assets/js/variables';
import { dateFilter } from '../assets/js/filters';

export default {
  name: 'Blogs',
  props: {
    blogs: Array,
  },
  components: { MarkdownViewer },
  data() {
    return {};
  },
  filters: {
    dateFilter,
    titleFilter: function(title) {
      const showLen = 100;
      if (title && title.length > showLen) {
        return title.substr(0, showLen) + ' ...';
      }
      return title;
    },
    contentFilter: function(cont) {
      let idx = cont.indexOf('\n');
      idx = idx > 0? idx: 0;
      return cont.substr(idx, idx + 100);
    }
  },
  mounted() {},
  methods: {
    goArticle(idx) {
      const curBlog = this.blogs[idx];
      if (curBlog)
        localStorage.setItem(variables.CUR_BLOG_INFO, JSON.stringify(curBlog));
      this.$router.push({name: 'Article', params: { id: curBlog.id }});
    }
  }
}
</script>

<style lang="scss" scoped>

.blog-list {
  height: 86%;
  .page-link {
    margin-top: 1%;
    .page-title {
      cursor: pointer;
      color: #8181e7;
      font-size: 1.6rem;
      font-style: oblique;
    }
    .metadata {
      margin-left: 1rem;
      font-size: 0.9rem;
      font-style: italic;
      color: #c9944a;
    }
    .page-brief {
      font-size: 1.3rem !important;
      background: #f4f4f8;
    }
  }
}

</style>