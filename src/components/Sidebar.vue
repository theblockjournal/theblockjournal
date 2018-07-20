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
      <div class="file hoverable p-2 d-flex" :class="{selected: isFileSelected(file)}" v-for="(file, i) in files" v-on:click="selectFile(file.id)">
        <div class="w-100">{{file.name}}</div>
        <i class="material-icons px-2" v-if="file.locked" v-tooltip:bottom="'Files are locked once signatures are published. You can unlock it, or duplicate it. We recommend the latter'">lock</i>
        <i class="material-icons px-2" v-if="file.published">check_circle_outline</i>
        <i class="vert material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_vert</i>
        <div class="dropdown-menu">
          <a class="dropdown-item" v-if="!file.locked" v-on:click="lockFile(file.id)">Lock</a>
          <a class="dropdown-item" v-if="file.locked" v-on:click="unlockFile(file.id)">Unlock</a>
          <a class="dropdown-item" v-on:click="duplicateFile(file.id)">Duplicate</a>
          <a class="dropdown-item" v-on:click="deleteFile(file.id)">Delete</a>
        </div>
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
      <div class="sign hoverable p-2" :class="{selected: isSignSelected(sign)}" v-for="(sign, i) in signs" v-on:click="selectMenu(sign.id)">
        <div class="w-100">{{sign.fileName}}</div>
        <small>{{displayTime(sign.time)}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

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
      return this.$store.getters.currentFile;
    },
    currentSign() {
      return this.$store.getters.currentSign;
    },
    displayTime: ()=> (time)=> {
      return moment(time).from();
    },
  },
  methods: {
    isFileSelected(file) {
      if(!this.currentFile) return false;
      return (this.currentFile.id === file.id);
    },
    isSignSelected(sign) {
      if(!this.currentSign) return false;
      return (this.currentSign.id === sign.id);
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
    selectFile(fileID) {
      this.$store.commit('selectFileByID', fileID);
    },
    selectMenu(signID) {
      this.$store.commit('selectSignByID', signID);
    },
    duplicateFile(fileID) {
      this.$store.commit('duplicateFileByID', fileID);
    },
    lockFile(fileID) {
      this.$store.commit('setFileLock', {id: fileID, lockState: true});
    },
    unlockFile(fileID) {
      this.$store.commit('setFileLock', {id: fileID, lockState: false});
    },
    deleteFile(fileID) {
      this.$store.commit('deleteFileByID', fileID);
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
  .files, .signs {
    .file, .sign {
      &.selected {
        border-left: 4px solid;
        background-color: #dddddd;
      }
      &:hover .vert {
        opacity: 1;
      }
      .vert {
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
