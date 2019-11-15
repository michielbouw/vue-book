<template>
  <div class="filterbar" :class="{ filterbar__disabled: isDisabled }">
    <span>
      <div class="small-text">Search</div>
      <input
        @input="searchBy($event.target.value)"
        placeholder="Search for an item..."
      />
    </span>
    <span>
      <div class="small-text">Filter by</div>
      <select @change="filterBy($event.target.value)">
        <option :value="null">-- none --</option>
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </span>
    <span>
      <div class="small-text">Sort by</div>
      <select @change="sortBy($event.target.value)">
        <option value="title-asc">
          Title - A-Z
        </option>
        <option value="title-desc">
          Title - Z-A
        </option>
        <option value="dateCreated-desc" selected>
          Newest first
        </option>
        <option value="dateCreated-asc">
          Oldest first
        </option>
        <option value="dateChanged-desc">
          Recently updated first
        </option>
        <option value="dateChanged-asc">
          Recently updated last
        </option>
      </select>
    </span>
  </div>
</template>

<script>
import * as R from 'ramda';
import * as _ from 'lodash';
import { mapState } from 'vuex';

export default {
  name: 'Filterbar',

  props: {
    isDisabled: Boolean,
  },

  computed: mapState({
    categories: state => state.settings.categories,
  }),

  methods: {
    searchBy: _.debounce(function(value) {
      this.$emit('search-by', value);
    }, 500),

    filterBy(category) {
      this.$emit('filter-by', category);
    },

    sortBy(sortBy) {
      const field =
        R.lastIndexOf('-', sortBy) > -1
          ? R.splitAt(R.lastIndexOf('-', sortBy), sortBy)[0]
          : sortBy;
      const findOrder = R.last(R.split('-', sortBy));
      const order = R.includes(findOrder, ['asc', 'desc']) ? findOrder : 'asc';

      this.$emit('sort-by', field, order);
    },
  },
};
</script>

<style lang="scss" scoped>
.filterbar {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  padding: 8px 8px 0 8px;
  border-radius: 4px;
  background-color: #f2f5f5;

  &__disabled {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  & > span {
    margin-bottom: 8px;

    &:not(:first-of-type) {
      margin-left: 16px;
    }
  }

  .small-text {
    margin-bottom: 4px;
  }

  input {
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    padding: 2px 8px;
  }
}
</style>
