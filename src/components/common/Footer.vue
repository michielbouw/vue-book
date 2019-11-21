<template>
  <footer>
    <div class="container" v-html="content"></div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    content: String,
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 16px 0;
  border-top: 1px solid #e3e3e3;
}
</style>
