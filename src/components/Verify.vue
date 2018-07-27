<template>
  <div id="verify">
    <div class="container">
      <button class="uploadbutton btn btn-block btn-lg d-flex my-2" v-on:click="upload">
        <i class="material-icons mx-2">publish</i>
        <span>Upload files and/or signs</span>
      </button>
      <div class="file card border-0 my-2">
        <div class="card-body">
          <h5 class="card-title">File</h5>
          <div class="py-2">Content signature: {{fileSignature}}</div>
          <div class="py-2">
            <!--<button class="btn" v-on:click="loadEditor">Enter content manually</button>-->
            <button class="btn" v-on:click="show.SignatureBox = true">Enter content hash manually</button>
          </div>
          <!--<div id="editor" class="py-2"></div>-->
          <div class="signature-box form-group d-flex" v-if="show.SignatureBox">
            <input type="email" class="form-control" v-model="enteredSignature" placeholder="Enter signature" @keyup.enter="enterSignature">
            <i class="material-icons mx-2" @click="enterSignature">check</i>
          </div>
        </div>
      </div>
      <div class="sign card border-0 my-2">
        <div class="card-body">
          <h5 class="card-title">Sign</h5>
          <div class="py-2">Account: {{signAccount}}</div>
          <div class="py-2" v-if="signSignature">Signature: {{signSignature}}</div>
          <div class="py-2">
            <button class="btn" v-on:click="show.AccountBox = true">Enter account</button>
          </div>
          <div class="signature-box form-group d-flex" v-if="show.AccountBox">
            <input type="email" class="form-control" v-model="enteredAccount" placeholder="Enter Ethereum account" @keyup.enter="enterAccount">
            <i class="material-icons mx-2" @click="enterAccount">check</i>
          </div>
        </div>
      </div>
      <div class="verification card border-0 my-2">
        <div class="card-body">
          <h5 class="card-title">Verification</h5>
          <div class="py-2">
            <div class="d-flex">
              <i class="icon material-icons p-2">{{signVerification.icon}}</i>
              <div class="content d-flex w-100 p-2">{{signVerification.text}}</div>
            </div>
            <div class="d-flex" v-if="fileVerification">
              <i class="icon material-icons p-2">{{fileVerification.icon}}</i>
              <div class="content d-flex w-100 p-2">{{fileVerification.text}}</div>
            </div>
          </div>
          <button class="btn btn-block" @click="verify">Verify</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blockJournal from '@/services/blockJournal';
import moment from 'moment';

import { keccak256Hex } from '@/utils/hashes';
import uploadJson from '@/utils/uploadJson';

let getTimeString = timestamp => moment(timestamp).toString();

export default {
  name: 'Verify',
  data() {
    return {
      file: {
        file: null,
        content: null,
        signature: null,
      },
      sign: {
        sign: null,
        account: null,
      },
      enteredSignature: null,
      enteredAccount: null,
      show: {
        SignatureBox: false,
        AccountBox: false,
      },
      editor: null,
      verification: null,
    };
  },
  computed: {
    fileSignature() {
      if(this.file.file) return keccak256Hex(this.file.file.content);
      if(this.file.content) return keccak256Hex(this.file.content);
      if(this.file.signature) return this.file.signature;
    },
    signAccount() {
      if(this.sign.sign) return this.sign.sign.sender;
      if(this.sign.account) return this.sign.account;
    },
    signSignature() {
      if(this.sign.sign && this.sign.sign.signature) return this.sign.sign.signature;
      return;
    },
    
    signVerification() {
      let verification = this.verification;
      if (!verification) return {
        icon: 'remove_circle_outline',
        text: `The signature hasn't been verified yet`,
      };
      if (verification.verified === false) return {
        icon: 'error_outline',
        text: `The signature failed verification.`,
      };
      return {
        icon: 'check_circle_outline',
        text: `The signature is valid. It was created on block ${verification.block} at ${getTimeString(verification.time)}`,
      };
    },
    fileVerification() {
      let verification = this.verification;
      let fileHash = this.fileSignature;
      if (!verification || !verification.verified) return;
      if (!this.fileSignature) return {
        icon: 'help_outline',
        text: `No file/content/content hash was provided.`,
      };
      if (verification.signature !== fileHash) return {
        icon: 'error_outline',
        text: `This signature doesn't match the file signature.`,
      };
      return {
        icon: 'check_circle_outline',
        text: `The signature matches the file.`,
      };
    },
  },
  methods: {
    async upload() {
      let uploadedJson = await uploadJson();
      //validation?
      if (uploadedJson.file) {
        this.setFile(uploadedJson.file);
      }
      if (uploadedJson.sign) {
        this.setSign(uploadedJson.sign);
      } else if (uploadedJson.signs) {
        //Make user pick signs
        this.setSign(uploadedJson.signs[0]);
      }
    },
    async verify() {
      let sign = this.signSignature ? this.signSignature : this.fileSignature;
      let account = this.signAccount;
      try {
        this.verification = await blockJournal.getVerifiedEntry(account, sign);
      } catch (e) {
        this.verification = undefined;
      }
    },
    
    setFile(file) {
      this.resetFile();
      this.file.file = file;
    },
    setSign(sign) {
      this.resetSign();
      this.sign.sign = sign;
    },
    
    reset() {
      this.resetFile();
      this.resetSign();
    },
    resetFile() {
      ['file', 'content', 'signature'].forEach(a=>this.file[a]=null);
      this.show.SignatureBox = false;
    },
    resetSign() {
      ['sign', 'account'].forEach(a=>this.sign[a]=null);
      this.show.AccountBox = false;
    },
    
    
    loadEditor() {
      const e = window.ace.edit('editor');
      e.setTheme('ace/theme/clouds_midnight');
      e.session.setMode('ace/mode/text');
      e.setShowInvisibles(true);
      e.getSession().setUndoManager(new window.ace.UndoManager());
      window.editor = e;
      this.editor = e;
    },
    enterSignature() {
      //validate this.enteredSignature
      this.resetFile();
      this.file.signature = this.enteredSignature;
    },
    enterAccount() {
      this.resetSign();
      this.sign.account = this.enteredAccount;
    },
  }
};

</script>

<style scoped lang="scss">
#verify {
  background-color: #eeeeee;
  position: absolute;
  top: 4em;
  bottom: 0;
  width: 100%;
  .uploadbutton {
    align-items: center;
    justify-content: center;
  }
  .signature-box {
    align-items: center;
  }
}
</style>
