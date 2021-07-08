<template>
<div>
  <div>
    <input style="display: none" type="file" ref="image" @change="uploadFile"/>
    <input type="button" @click="addImg" value="add image">
  </div>
  <textarea ref="inputArea" class="edit-area" v-model="ct" />
</div>
</template>
<script>
import axios from '../assets/js/axios';

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
  methods: {
    addImg() {
      this.$refs.image.click();
    },
    uploadFile() {
      const imgFile = this.$refs.image.files[0];
      if (!imgFile) {
        alert('no file choosed!');
        return;
      }
      const fileFormData = new FormData();
      fileFormData.append('file', imgFile);

      axios.post('/page/upload', fileFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(res => {
        const url = 'page/uploads/';
        if (res.data) {
          this.$refs.image.type = 'text';
          this.$refs.image.type = 'file';
          this.insertContent(`<img src="${url}${res.data}" width="200" />`);
        }
      }).catch(err => {
        alert(err.message);
      });
    },
    insertContent(nVal) {
      const inArea = this.$refs.inputArea;
      const curPos = inArea.selectionStart;
      this.ct = this.ct.slice(0, curPos) + nVal + this.ct.slice(curPos);
    }
  }
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