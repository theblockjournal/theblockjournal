import { keccak256Hex } from '@/utils/hashes';

import Eth from '@/services/getWeb3';
import store from '@/store';
import v0 from '@/contracts/v0';
import downloadJson from '@/utils/downloadJson';
import uploadJson from '@/utils/uploadJson';

class BlockJournal {
  constructor() {
    this.rawContracts = { v0 };
    this.contracts = {};
    for (const contractName in this.rawContracts) {
      const rawContract = this.rawContracts[contractName];
      this.contracts[contractName] = Eth.contract(rawContract.abi);
    }
  }
  async signFile(file) {
    const signature = keccak256Hex(file.content);
    const txHash = await this.addEntry(signature);
    const sign = {
      signature,
      txHash,
      time: Date.now(),
      fileID: file.id,
      fileName: file.name,
      networkID: store.state.app.networkID,
      contract: 'v0',
      sender: store.state.app.selectedAccount,
    };
    store.commit('addSign', sign);
  }
  async addEntry(signature) {
    const contractInstance = await this.getContractInstance('v0');
    const txHash = await contractInstance.addEntry(signature, { from: store.state.app.selectedAccount });
    return txHash;
  }
  async getEntry(address, signature) {
    if (!address) address = store.state.app.selectedAccount;
    const contractInstance = await this.getContractInstance('v0');
    return contractInstance.getEntry(address, signature);
  }
  async getVerifiedEntry(address, signature) {
    const entry = await this.getEntry(address, signature);
    if (entry.sig !== signature) return { verified: false };
    return {
      signature: entry.sig,
      time: (entry.time.toString() * 1000),
      block: entry._block.toNumber(),
      verified: true,
    };
  }
  async getContractInstance(name) {
    const instanceAddress = this.rawContracts[name].deployments[store.state.app.networkID];
    return this.contracts[name].at(instanceAddress);
  }
  downloadFile(fileID) {
    const file = store.getters.getFileByID(fileID);
    const fileObject = JSON.stringify({ file });
    downloadJson(fileObject, `file-${file.name}.tbj.json`);
  }
  downloadFileWithSigns(fileID) {
    const file = store.getters.getFileByID(fileID);
    const signs = store.getters.getSignsByFileID(fileID);
    const fileSignObject = JSON.stringify({ file, signs });
    downloadJson(fileSignObject, `file-sigs-${file.name}.tbj.json`);
  }
  dumpState() {
    const stateObject = JSON.stringify(store.state);
    const filename = `state-${Date.now()}.tbj.json`;
    downloadJson(stateObject, filename);
  }
  resetState() {
    store.commit('restoreState');
  }
  async restoreState() {
    const stateObject = await uploadJson();
    store.replaceState(stateObject);
  }
}

export default new BlockJournal();
