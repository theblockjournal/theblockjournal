<template>
  <div id="document">
    <div id="editor" v-if="file">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Document',
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    file() {
      return this.$store.state.fileState.currentFile;
    },
  },
  methods: {
    getContent() {
      return this.editor.getValue();
    },
    save() {
      this.$store.state.fileState.currentFile.content = this.getContent();
    },
  },
  watch: {
    file(newFile, oldFile) {
      if(oldFile && window.editor.getValue) oldFile.content = window.editor.getValue();
      let _this = this;
      this.$nextTick(()=> {
        let e = window.ace.edit("editor");
        e.setTheme("ace/theme/clouds_midnight");
        e.session.setMode("ace/mode/text");
        e.setValue(newFile.content || '', 1);
        e.getSession().setUndoManager(new window.ace.UndoManager());
        window.editor = e;
        _this.editor = e;
      });
    },
  },
};
</script>

<style scoped lang="scss">
#document {
  background: #eeeeee;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 4em;
  #editor { 
    height: 100%;
  }
}
</style>
