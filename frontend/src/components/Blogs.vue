<template>
<div class="blog-list">
  <ul>
    <div v-for="(item, idx) in blogs">
      <li class="page-link">
        <div @click="jumpTo(item.id)" class="page-title">
          {{item.title | titleFilter}}
        </div>
        <div class="page-uptime">
          {{ item.updatedAt | dateFilter }}
        </div>
      </li>
    </div>
  </ul>
</div>
</template>

<script>
import axios from '../assets/js/axios';
export default {
  name: 'Blogs',
  props: {
    blogs: Array,
  },
  data() {
    return {};
  },
  filters: {
    titleFilter: function(title) {
      const showLen = 7;
      if (title && title.length > showLen) {
        return title.substr(0, showLen) + ' ...';
      }
      return title;
    },
    dateFilter: function(d) {
      return new Date(d).toLocaleString('en').split(',')[0];
    }
  },
  mounted() {},
  methods: {
    jumpTo(pageId) {
      this.$emit('chagepage', pageId);
    },
  }
}
</script>

<style lang="scss" scoped>

.blog-list {
  height: 86%;
  overflow: scroll;
  .page-link {
    margin-top: 1%;
    .page-title {
      cursor: pointer;
      color: #8181e7;
      font-size: 2rem;
      font-style: oblique;
    }

    .page-uptime {
      font-size: 1rem;
      color:#8181e7;
    }
  }
}

</style>