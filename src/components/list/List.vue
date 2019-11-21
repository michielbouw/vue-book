<template>
  <div>
    <h2>{{ settings.listTitle }}</h2>

    <slot name="before"></slot>

    <p v-if="loading" class="loading">{{ settings.listLoadingText }}</p>
    <ul v-else-if="listItems.length">
      <li v-for="item in listItems" :key="item.id">
        <slot name="item" :item="item"></slot>
      </li>
    </ul>
    <Empty v-else />
  </div>
</template>

<script>
import Empty from '../common/Empty';

export default {
  name: 'List',
  components: {
    Empty,
  },
  props: {
    settings: Object,
    loading: Boolean,
    listItems: Array,
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  list-style-position: inside;
  -webkit-padding-start: 0;
  margin: 0;
  margin-top: 8px;

  li {
    margin: 0;
    padding: 0;

    &:nth-child(even) {
      background-color: #f2f5f5;
      padding-top: 8px;
    }
  }
}
</style>
