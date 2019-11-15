<template>
  <div>
    <h2>{{ settings.listTitle }}</h2>
    <Filterbar v-on="$listeners" :isDisabled="loading"></Filterbar>
    <p v-if="loading" class="loading">
      {{ settings.listLoadingText }}
    </p>
    <ul v-else-if="listItems.length">
      <li v-for="item in listItems" :key="item.id">
        <ListItem :item="item" />
      </li>
    </ul>
    <Empty v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Filterbar from '../common/Filterbar';
import Empty from '../common/Empty';
import ListItem from './ListItem';

export default {
  name: 'List',
  components: {
    Filterbar,
    Empty,
    ListItem,
  },
  props: {
    loading: Boolean,
    listItems: Array,
  },

  computed: mapState(['settings']),
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
