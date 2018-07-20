<template>
  <div id="document">
    <div id="editor"></div>
    <div id="tools"></div>
  </div>
</template>

<script>
import blockJournal from '@/services/blockJournal';
const createKeccakHash = require('keccak');

let store;

export default {
  name: 'Document',
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    file() {
      return this.$store.getters.currentFile;
    },
  },
  methods: {
    getContent() {
      return this.editor.getValue();
    },
    getContentHash() {
      return createKeccakHash('keccak256').update(this.getContent()).digest('hex');
    },
    save() {
      this.$store.dispatch('setCurrentFileContent', this.getContent());
    },
    loadFile(file) {
      let e = window.ace.edit("editor");
      e.setTheme("ace/theme/clouds_midnight");
      e.session.setMode("ace/mode/text");
      e.setValue(file.content || '', 1);
      e.setShowInvisibles(true);
      e.getSession().setUndoManager(new window.ace.UndoManager());
      window.editor = e;
      this.editor = e;
    },
    async sign() {
      this.save();
      let file = this.$store.getters.currentFile;
      await blockJournal.signFile(file);
      this.$store.commit('setFileLock', {id: file.id, lockState: true});
    },
  },
  mounted() {
    this.loadFile(this.file);
    store = this.$store;
  },
  watch: {
    file(newFile, oldFile) {
      if(oldFile && window.editor.getValue) store.commit('setFileContent', {id: oldFile.id, content: window.editor.getValue()});
      if(!newFile) return;
      this.$nextTick(()=> {
        this.loadFile(newFile);
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
  #tools {
    position: absolute;
    width: 5%;
    height: 100%;
    background: black;
    top: 0;
    z-index: 100;
    right: 0;
    opacity: 0.8;
    display: none;
  }
}
</style>
