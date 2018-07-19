import uuid from 'uuid';

export default {
  state: {
    files: [],
    deletedFiles: [],
    currentFile: null,
  },
  getters: {
    getFileByID: (state) => (id) => {
      return state.files.find(file => file.id === id);
    },
  },
  mutations: {
    addFile(state, file) {
      file.id = uuid.v4();
      file.content = uuid.v4();
      state.files.push(file);
    },
    selectFileByID(state, fileID) {
      state.currentFile = state.files.find(f => f.id === fileID);
    },
    deleteFileByID(state, fileID) {
      let toBeDeletedFileIndex = state.files.findIndex(f => f.id === fileID);
      let deletedFile = state.files.splice(toBeDeletedFileIndex, 1);
      state.deletedFiles.push(...deletedFile);
    }
  },
  actions: {
    
  },
};