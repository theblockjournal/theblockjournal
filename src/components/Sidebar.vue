<template>
  <div id="sidebar" class="container-fluid">
    <div class="menu row m-0">
      <div class="tab col-6 p-2 hoverable text-center" :class="{selected: displayMode=='files'}" v-on:click="displayMode='files'">
        <i class="material-icons pr-2">insert_drive_file</i>
        <span>Files</span>
      </div>
      <div class="tab col-6 p-2 hoverable text-center" :class="{selected: displayMode=='signs'}" v-on:click="displayMode='signs'">
        <i class="material-icons pr-2">fingerprint</i>
        <span>Signatures</span>
      </div>
    </div>
    <div class="files" v-if="displayMode=='files'">
      <div class="file hoverable p-2 d-flex" :class="{selected: isSelected(file)}" v-for="(file, i) in files" v-on:click="selectFile(i)">
        <div class="w-100">{{file.name}}</div>
        <i class="material-icons px-2" v-if="file.published">check_circle_outline</i>
        <i class="menu material-icons">more_vert</i>
      </div>
      <div class="p-2 d-flex" v-if="newMode">
        <input id="newFileName" type="text" class="w-100 border-0" style="outline:none" v-model="newFileName" v-on:keyup.enter="newFile()" placeholder="Enter filename here"></input>
        <i class="material-icons hoverable" v-on:click="cancelNewMode">close</i>
      </div>
      <div class="hoverable p-2 d-flex justify-content-center" v-on:click="startNewMode" v-if="!newMode">
        <i class="material-icons">add</i>
      </div>
    </div>
    <div class="signs" v-if="displayMode=='signs'">
      <div class="sign hoverable p-2 d-flex" v-for="(sign, i) in signs">
        <div class="w-100">{{fileFromSign(sign).name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      newMode: false,
      newFileName: null,
      displayMode: 'files',
    };
  },
  computed: {
    files() {
      return this.$store.state.fileStore.files;
    },
    signs() {
      return this.$store.state.signStore.signs;
    },
    currentFile() {
      return this.$store.state.fileStore.currentFile;
    },
  },
  methods: {
    isSelected(file) {
      if(!this.currentFile) return false;
      return (this.currentFile.id === file.id);
    },
    newFile() {
      let file = {
        name: this.newFileName,
      };
      this.$store.commit('addFile', file);
      this.cancelNewMode();
    },
    cancelNewMode() {
      this.newMode = false;
      this.newFileName = null;
    },
    startNewMode() {
      this.newMode = true;
    },
    selectFile(fileIndex) {
      this.$store.commit('selectFileIndex', fileIndex);
    },
    fileFromSign(sign) {
      return this.$store.getters.getFileByID(sign.fileID);
    },
  },
};
</script>

<style scoped lang="scss">
#sidebar {
  position: absolute;
  top: 4em;
  bottom: 0;
  .menu {
    background-color: #dddddd;
    .tab {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .selected {
      background-color: #ffffff;
    }
  }
  .files {
    .file {
      &.selected {
        border-left: 4px solid;
        background-color: #dddddd;
      }
      &:hover .menu {
        opacity: 1;
      }
      .menu {
        color: #888888;
        opacity: 0;
        transition: 0.3s all;
        &:hover {
          color: #000000;
        }
      }
    }
  }
}
</style>
