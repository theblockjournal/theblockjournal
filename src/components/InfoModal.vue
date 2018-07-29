<template>
  <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <p>
            Theblockjournal is an open-source tool that makes it easy to publish signatures of text, creating a proof of existence, integrity, and ownership.
          </p>
          <p>
            It's an attempt to combine the function of a blockchain notary with that of a note-taking app like Evernote or OneNote. 
          </p>
          <p>
            This project is <a href="https://github.com/theblockjournal/theblockjournal/blob/master/LICENSE" target="_blank">MIT licensed</a>. Instructions for use can be found <a href="https://imgur.com/a/l6X5GSs" target="_blank">here</a>.
          </p>
        </div>
        <div class="modal-footer border-0 pt-0">
          <a href="https://github.com/theblockjournal" target="_blank"><img class="link-logo clickable" src="static/gh.svg"></a>
          <a href="https://twitter.com/itsarnavb" target="_blank"><img class="link-logo clickable" src="static/tw.svg"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoModal',
  date() {
    return {};
  },
  methods: {
    modal(...args) {
      window.$('#infoModal').modal(...args);
    }
  },
  mounted() {
    this.$root.$on('showInfoModal', ()=> {
      this.modal('show');
    });
  },
}; 
</script>

<style scoped lang="scss">
#infoModal {
  .modal-dialog {
    max-width: 55%;
    .modal-content {
      background-color: black;
      color: white;
      .modal-footer {
        justify-content: center;
        .link-logo {
          width: 4em;
          height: 4em;
        }
      }
    }
  }
}
</style>