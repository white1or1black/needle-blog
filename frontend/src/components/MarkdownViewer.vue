<template>
<div>
  <div v-html="pageViewer" class="page-view"></div>
</div>
</template>

<script>
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

export default {
  name: 'MarkdownViewer',
  props: {
    content: String
  },
  data() {
    return {}
  },
  watch: {},
  computed: {
    pageViewer: function() {
      return marked(this.content);
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-view {
  width: 100%;
  height: 100%;
  // overflow: scroll;
}
</style>