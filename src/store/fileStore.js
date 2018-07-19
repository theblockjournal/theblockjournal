import uuid from 'uuid';

export default {
  state: {
    files: [],
    deletedFiles: [],
    currentFile: null,
    currentFileID: null,
  },
  getters: {
    getFileByID: (state) => (id) => {
      return state.files.find(file => file.id === id);
    },
    currentFile(state) {
      return state.files.find(file => file.id === state.currentFileID);
    },
  },
  mutations: {
    addFile(state, file) {
      file.id = uuid.v4();
      file.content = uuid.v4();
      state.files.push(file);
    },
    selectFileByID(state, fileID) {
      state.currentFileID = fileID;
    },
    deleteFileByID(state, fileID) {
      let toBeDeletedFileIndex = state.files.findIndex(f => f.id === fileID);
      let deletedFile = state.files.splice(toBeDeletedFileIndex, 1);
      state.deletedFiles.push(...deletedFile);
    },
    setFileContent(state, {id, content}) {
      let index = state.files.findIndex(f => f.id === id);
      state.files[index].content = content;
    },
  },
  actions: {
    setCurrentFileContent({commit, getters}, content) {
      let id = getters.currentFile.id;
      commit('setFileContent', {id, content});
    }
  },
};