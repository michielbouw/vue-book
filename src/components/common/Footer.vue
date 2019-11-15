<template>
  <footer>
    <div class="container" v-html="settings.mainFooterContent"></div>
  </footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Footer',

  computed: mapState(['settings']),
};
</script>

<style lang="scss" scoped>
footer {
  padding: 16px 0;
  border-top: 1px solid #e3e3e3;
}
</style>
