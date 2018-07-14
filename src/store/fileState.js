import uuid from 'uuid';

export default {
  state: {
    files: [],
    currentFile: null,
  },
  getters: {},
  mutations: {
    addFile(state, file) {
      file.id = uuid.v4();
      file.content = uuid.v4();
      state.files.push(file);
    },
    selectFileIndex(state, fileIndex) {
      state.currentFile = state.files[fileIndex];
    }
  },
  actions: {},
};