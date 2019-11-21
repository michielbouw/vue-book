<template>
  <div>
    <input
      name="file"
      type="file"
      accept="image/*"
      @change="previewImage($event.target.files)"
    />

    <p v-if="error" class="error">
      <b>{{ error }}</b>
    </p>

    <button v-if="fileData" @click="onSaveUpload">Upload</button>

    <p v-if="preview">
      Preview:
      <img class="preview" :src="preview" />
    </p>

    <p v-if="uploadProgress">
      Progress: {{ uploadProgress.toFixed() + '%' }}
      <progress id="progress" :value="uploadProgress" max="100"></progress>
    </p>
  </div>
</template>

<script>
import { storage } from '../../firebase';

export default {
  name: 'UploadFile',

  data() {
    return {
      fileData: null,
      preview: null,
      uploadProgress: 0,
      error: '',
    };
  },

  methods: {
    previewImage(files) {
      this.fileData = files[0];
      this.preview = null;
      this.uploadProgress = 0;
      this.error = '';
    },

    onSaveUpload() {
      const storageRef = storage
        .ref(`${this.fileData.name}`)
        .put(this.fileData);

      this.fileData = null;
      this.preview = null;
      this.uploadProgress = 0;
      this.error = '';

      storageRef.on(
        'state_changed',
        snapshot => {
          this.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          this.error = error.message;
        },
        () => {
          this.uploadProgress = 100;

          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.preview = url;
            this.$emit('upload-done', url);
          });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-file-wrapper {
  img.preview {
    width: 200px;
  }
}
</style>
