<template>
<div>
<div class="main">
  <div class="editor">
    <div class="edit-header">
      <div class="edit-title">title: <input type="text" v-model="title"> </div>
      <div class="edit-op">
        <input type="button" @click="submit" value="submit">
      </div>
    </div>
    <div class="edit-content"> <span class="content-label"> content: </span>
      <Editor class="content-area" :content="content" @ctchange="ctchange" />
    </div>
  </div>
  <div class="viewer">
    <MarkdownViewer :content="content" />
  </div>
</div>
</div>
  
</template>
<script>

import MarkdownViewer from '../components/MarkdownViewer';
import Editor from '../components/Editor';
import axios from '../assets/js/axios';

export default {
  name: 'Edit',
  components: { MarkdownViewer, Editor },
  data() {
    return {
      mode: 1, // 1 add, 2 edit
      pageId: null,
      title: '',
      content: '',
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.mode = this.$route.query.mode;
      this.pageId = this.$route.query.pageId;
      this.getEditBlog();
    },
    submitCheck() {
      if (!this.title) alert('Please input your title!');
      if (!this.content) alert('Please input content!');
      if (this.mode == 2 && !this.pageId)
        alert('There is no pageId when you edit your page!');
    },
    getEditBlog() {
      if (this.mode === 2 && this.pageId) {
        axios.get(`/page/get?id=${this.pageId}`).then(res => {
          if (res.data instanceof Array && res.data.length > 0) {
            const data = res.data[0];
            this.title = data.title;
            this.content = data.content;
          }
        }).catch(err => {
          alert(err.message);
        });
      }
    },
    ctchange(ct) {
      this.content = ct;
    },
    submit() {
      this.submitCheck();
      const url = this.mode === 1? '/page/add': 'page/update';
      const method = this.mode === 1? 'post': 'put';
      axios[method](url, {
        pageId: this.pageId,
        title: this.title,
        content: this.content
      }).then(res => {
        this.$routeJumpByName('Home');
      }).catch(err => {
        alert(err.message);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .editor, .viewer {
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
  }

  .editor {
    left: 0;
    background: #8383e7;
    width: 50rem;
    height: 60rem;

    .edit-header {
      display: grid;
      grid-template-areas: 'title op';
      margin-left: 1%;
      .edit-title {
        grid-area: title;
      }
      .edit-op {
        grid-area: op;
      }
    }
    .edit-content {
      width: 98%;
      height: 46rem;
      margin-top: 1%;
      margin-left: 1%;
      .content-label {
        font-size: 1rem;
      }
      .content-area {
        height: 100%;
        width: 88%;
      }
    }

  }
  .viewer {
    right: 0;
    padding-left: 1%;
    background: #c51b1b;
  }
}

</style>