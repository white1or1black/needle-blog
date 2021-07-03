<template>
<div>
  <ul>
    <div v-for="(item, idx) in blogs">
      <li class="page-link">
        <div @click="jumpTo(item.id)" class="page-title">
          {{item.title}}
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
    dateFilter: function(d) {
      return new Date(d).toLocaleString('en');
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

</style>