<template>
  <div class="container">
    <List :settings="settings" :listItems="filteredList" :loading="loading">
      <template #before>
        <Filterbar
          :categories="settings.categories"
          :isDisabled="loading"
          @search-by="onSearchBy"
          @filter-by="onFilterBy"
          @sort-by="onSortBy"
        ></Filterbar>
      </template>
      <template #item="{ item }">
        <ListItem :settings="settings" :item="item">
          <template #left>
            <div class="small-text">{{ settings.listItemChecklistTitle }}</div>

            <span
              v-if="loadingChecklistByListItem(item.id)"
              class="loading"
            ></span>
            <Checklist
              v-if="!loadingChecklistByListItem(item.id)"
              :checklist="getChecklistByListItem(item.id)"
              @add-item="addChecklistItemByListItem(item.id)"
              @update-item="updateChecklistItemByListItem"
              @delete-item="deleteChecklistItemByListItem"
            />
          </template>
        </ListItem>
      </template>
    </List>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import List from '../components/list/List';
import ListItem from '../components/list/ListItem';
import Filterbar from '../components/common/Filterbar';
import Checklist from '../components/checklist/Checklist';

export default {
  name: 'Book',
  components: { List, ListItem, Filterbar, Checklist },

  computed: {
    ...mapState({
      settings: 'settings',
      loading: state => state.loading.list,
      list: 'list',
      filterBy: 'filterBy',
    }),

    ...mapGetters([
      'filteredList',
      'loadingChecklistByListItem',
      'getChecklistByListItem',
    ]),
  },

  mounted() {
    this.fetchListItems();
  },

  methods: {
    ...mapActions([
      'fetchListItems',
      'setFilterBy',
      'addChecklistItemByListItem',
      'updateChecklistItemByListItem',
      'deleteChecklistItemByListItem',
    ]),

    onSearchBy(value) {
      this.setFilterBy({
        ...this.filterBy,
        q: value || '',
      });
    },

    onFilterBy(field, value) {
      this.setFilterBy({
        ...this.filterBy,
        filter: {
          field,
          value,
        },
      });
    },

    onSortBy(field, order) {
      this.setFilterBy({
        ...this.filterBy,
        sort: {
          field,
          order,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 24px;
}
</style>
