<template>
<div>
  <textarea class="edit-area" v-model="content" />
</div>
</template>
<script>
export default {
  name: 'Editor',
  props: {
    content: String
  },
  data() {
    return {};
  },
  watch: {
    content: function(nVal) {
      this.$emit('ctchange', nVal);
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.edit-area {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;
  resize: none;
}
</style>