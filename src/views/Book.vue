<template>
  <div class="container">
    <span v-if="loading" class="loading">
      {{ settings.listLoadingText }}
    </span>
    <div v-else>
      <List
        :listItems="filteredList"
        @search-by="onSearchBy"
        @filter-by="onFilterBy"
        @sort-by="onSortBy"
      />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';
import { mapState } from 'vuex';

import List from '../components/list/List';

const SORT_BY_DEFAULT = {
  field: 'dateCreated',
  order: 'desc',
};

export default {
  name: 'Book',
  components: { List },

  data() {
    return {
      filteredList: [],
      searchBy: null,
      filterBy: null,
      sortBy: SORT_BY_DEFAULT,
    };
  },

  mounted() {
    this.fetchListItems();
  },

  computed: mapState({
    settings: 'settings',
    loading: state => state.loading.list,
    list: 'list',
  }),

  watch: {
    list() {
      this.searchFilterSortlist();
    },
    searchBy() {
      this.searchFilterSortlist();
    },
    filterBy() {
      this.searchFilterSortlist();
    },
    sortBy() {
      this.searchFilterSortlist();
    },
  },

  methods: {
    fetchListItems() {
      this.$store.dispatch('fetchListItems');
    },

    searchList(list) {
      if (!this.searchBy) {
        return list;
      }

      const value = R.toLower(this.searchBy);
      return R.filter(
        listItem =>
          listItem.title && R.toLower(listItem.title).indexOf(value) > -1,
        list
      );
    },

    filterList(list) {
      if (!this.filterBy) {
        return list;
      }

      return R.filter(R.propEq('category', this.filterBy), list);
    },

    sortList(list) {
      const { field, order } = this.sortBy;
      const sortDirection = dir => (dir === 'desc' ? R.descend : R.ascend);

      return R.sortWith(
        [
          R.compose(
            sortDirection(order),
            R.prop
          )(field),
        ],
        list
      );
    },

    searchFilterSortlist() {
      this.filteredList = R.compose(
        this.searchList,
        this.filterList,
        this.sortList
      )(this.list);
    },

    onSearchBy(value) {
      this.searchBy = value || null;
    },

    onFilterBy(category) {
      this.filterBy = category || null;
    },

    onSortBy(field, order) {
      this.sortBy =
        field && order
          ? {
              field,
              order,
            }
          : SORT_BY_DEFAULT;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 24px;
}
</style>
