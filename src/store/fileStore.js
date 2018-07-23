import uuid from 'uuid';

export default {
  state: {
    files: [],
    deletedFiles: [],
    currentFileID: null,
  },
  getters: {
    getFileByID: state => id => state.files.find(file => file.id === id),
    currentFile(state) {
      return state.files.find(file => file.id === state.currentFileID);
    },
  },
  mutations: {
    addFile(state, file) {
      file.id = uuid.v4();
      file.content = uuid.v4();
      file.locked = false;
      state.files.push(file);
    },
    selectFileByID(state, fileID) {
      state.currentFileID = fileID;
    },
    duplicateFileByID(state, fileID) {
      let file = state.files.find(f => f.id === fileID);
      let duplicateFile = {
        name: file.name,
        id: uuid.v4(),
        content: file.content,
        locked: false,
      };
      state.files.push(duplicateFile);
    },
    deleteFileByID(state, fileID) {
      let toBeDeletedFileIndex = state.files.findIndex(f => f.id === fileID);
      let deletedFile = state.files.splice(toBeDeletedFileIndex, 1);
      state.deletedFiles.push(...deletedFile);
    },
    setFileContent(state, { id, content }) {
      let index = state.files.findIndex(f => f.id === id);
      let file = state.files[index];
      if(file.locked) return;
      file.content = content;
    },
    setFileLock(state, { id, lockState }) {
      let index = state.files.findIndex(f => f.id === id);
      state.files[index].locked = lockState;
    },
    selectSignByID(state) {
      state.currentFileID = null;
    },
  },
  actions: {
    setCurrentFileContent({ commit, getters }, content) {
      const id = getters.currentFile.id;
      commit('setFileContent', { id, content });
    },
  },
};
