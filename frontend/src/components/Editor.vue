<template>
<div>
  <textarea class="edit-area" v-model="ct" />
</div>
</template>
<script>
export default {
  name: 'Editor',
  props: {
    content: String
  },
  data() {
    return {
      ct: '',
    };
  },
  watch: {
    content: function(nVal) {
      this.ct = this.content;
    },
    ct: function(nVal) {
      this.$emit('ctchange', nVal);
    }
  },
  computed: {},
  created() {},
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