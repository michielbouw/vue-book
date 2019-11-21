<template>
  <div class="container">
    <h2>Welcome "{{ userDisplayName }}"</h2>
    <p>Admin page</p>

    <hr />

    <h3>Customization</h3>

    <p>Logo:</p>
    <img :src="settings.mainHeaderLogo" title="logo" />

    <p>Change logo:</p>
    <UploadFile @upload-done="onChangeLogo" />

    <hr />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { getCurrentUser } from '../services/authService';

import UploadFile from '../components/common/UploadFile';

export default {
  name: 'Admin',
  components: { UploadFile },

  computed: {
    ...mapState(['settings']),

    userDisplayName() {
      return getCurrentUser().displayName;
    },
  },

  methods: {
    ...mapActions(['updateSettings']),

    onChangeLogo(fileUrl) {
      this.updateSettings({ mainHeaderLogo: fileUrl });
    },
  },
};
</script>

<style lang="scss" scoped></style>
