import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';
import moment from 'moment';

import { searchList, filterList, sortList } from '../utils/filterHelper';
import { getSettings, updateSettings } from '../services/settingsService';
import {
  getListItems,
  createListItem,
  updateListItem,
  deleteListItem,
} from '../services/listService';
import {
  getChecklistItemsByListItem,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
} from '../services/checklistService';

Vue.use(Vuex);

const FILTER_BY_DEFAULT = {
  field: 'category',
  value: '',
};

const SORT_BY_DEFAULT = {
  field: 'dateCreated',
  order: 'desc',
};

// Get the settings on loading the app
getSettings().then(settings => {
  store.commit('SET_SETTINGS', settings);
});

export const store = new Vuex.Store({
  state: {
    settings: {},
    loading: {
      list: false,
      checklistsByListItem: [],
    },
    list: [],
    filterBy: {
      q: '',
      filter: FILTER_BY_DEFAULT,
      sort: SORT_BY_DEFAULT,
    },
    checklistItems: [],
  },

  getters: {
    loadingChecklistByListItem: state => listItemId => {
      return R.includes(listItemId, state.loading.checklistsByListItem);
    },

    filteredList: state => {
      const { q, filter, sort } = state.filterBy;

      return R.compose(
        searchList(q),
        filterList(filter),
        sortList(sort)
      )(state.list);
    },

    getChecklistByListItem: state => listItemId => {
      return R.filter(R.propEq('listItemId', listItemId))(state.checklistItems);
    },

    getChecklistItem: state => id => {
      return R.find(R.propEq('id', id))(state.checklistItems);
    },
  },

  mutations: {
    SET_SETTINGS(state, settings) {
      state.settings = settings;
    },

    SET_LOADING_LIST_ITEMS(state, loading) {
      state.loading.list = loading;
    },

    SET_LIST_ITEMS(state, list) {
      state.list = list;
    },

    SET_CHECKLIST_ITEMS(state, checklist) {
      checklist.forEach(checklistItem => {
        if (R.find(R.propEq('id', checklistItem.id))(state.checklistItems)) {
          state.checklistItems = state.checklistItems.map(item => {
            if (item.id === checklistItem.id) {
              return checklistItem;
            }
            return item;
          });
          return;
        }

        state.checklistItems.push(checklistItem);
      });
    },

    SET_FILTER_BY(state, filterBy) {
      const { q, filter, sort } = filterBy;

      // only update if field is given
      const newFilter = filter.field
        ? {
            field: filter.field,
            value: filter.value,
          }
        : FILTER_BY_DEFAULT;
      const newSort = sort.field
        ? {
            field: sort.field,
            order: sort.order,
          }
        : SORT_BY_DEFAULT;

      state.filterBy = {
        q: q || '',
        filter: newFilter,
        sort: newSort,
      };
    },

    SET_LOADING_CHECKLIST_BY_LIST_ITEM(state, listItemId) {
      if (R.includes(listItemId, state.loading.checklistsByListItem)) {
        return;
      }

      state.loading.checklistsByListItem.push(listItemId);
    },

    UNSET_LOADING_CHECKLIST_BY_LIST_ITEM(state, listItemId) {
      state.loading.checklistsByListItem = state.loading.checklistsByListItem.filter(
        checklistId => checklistId !== listItemId
      );
    },

    ADD_LIST_ITEM(state, newItem) {
      state.list.push(newItem);
    },

    UPDATE_LIST_ITEM(state, updatedItem) {
      if (!R.filter(R.propEq('id', updatedItem.id))(state.list)) {
        return;
      }

      state.list = state.list.map(listItem => {
        if (listItem.id === updatedItem.id) {
          return updatedItem;
        }
        return listItem;
      });
    },

    DELETE_LIST_ITEM(state, id) {
      if (!R.filter(R.propEq('id', id))(state.list)) {
        return;
      }

      state.list = R.reject(R.propEq('id', id))(state.list);
    },

    UPDATE_SETTINGS(state, updatedSettings) {
      state.settings = {
        ...state.settings,
        ...updatedSettings,
      };
    },

    ADD_CHECKLIST_ITEM(state, newItem) {
      state.checklistItems.push(newItem);
    },

    UPDATE_CHECKLIST_ITEM(state, updatedItem) {
      if (!R.filter(R.propEq('id', updatedItem.id))(state.checklistItems)) {
        return;
      }

      state.checklistItems = state.checklistItems.map(checklistItem => {
        if (checklistItem.id === updatedItem.id) {
          return updatedItem;
        }
        return checklistItem;
      });
    },

    DELETE_CHECKLIST_ITEM(state, itemId) {
      if (!R.filter(R.propEq('id', itemId))(state.checklistItems)) {
        return;
      }

      state.checklistItems = R.reject(R.propEq('id', itemId))(
        state.checklistItems
      );
    },
  },

  actions: {
    fetchListItems({ commit, state, dispatch }) {
      if (!state.list.length) {
        commit('SET_LOADING_LIST_ITEMS', true);
      }

      getListItems().then(list => {
        commit('SET_LIST_ITEMS', list);
        commit('SET_LOADING_LIST_ITEMS', false);

        list.forEach(item => {
          dispatch('fetchChecklistByListItem', item.id);
        });
      });
    },

    fetchChecklistByListItem({ commit }, listItemId) {
      commit('SET_LOADING_CHECKLIST_BY_LIST_ITEM', listItemId);

      getChecklistItemsByListItem(listItemId).then(checklist => {
        commit('SET_CHECKLIST_ITEMS', checklist);
        commit('UNSET_LOADING_CHECKLIST_BY_LIST_ITEM', listItemId);
      });
    },

    setFilterBy({ commit, state }, newFilterBy) {
      if (R.equals(state.filterBy, newFilterBy)) {
        return;
      }

      commit('SET_FILTER_BY', newFilterBy);
    },

    updateSettings({ commit }, payload) {
      updateSettings(payload).then(() => {
        commit('UPDATE_SETTINGS', payload);
      });
    },

    addListItem({ commit }) {
      createListItem({
        accountId: '1',
        // TODO: populate by payload
        category: '🍝 Pasta',
        title: 'New title',
        description: '',
        images: [],
        dateCreated: moment().toISOString(),
        dateChanged: moment().toISOString(),
      }).then(newItem => {
        commit('ADD_LIST_ITEM', newItem);
      });
    },

    updateListItem({ commit }, payload) {
      updateListItem(payload).then(() => {
        commit('UPDATE_LIST_ITEM', payload);
      });
    },

    deleteListItem({ commit }, id) {
      deleteListItem(id).then(() => {
        commit('DELETE_LIST_ITEM', id);
      });
    },

    addChecklistItemByListItem({ commit }, listItemId) {
      createChecklistItem({
        accountId: '1',
        listItemId,
        value: '',
        checked: false,
      }).then(newItem => {
        commit('ADD_CHECKLIST_ITEM', newItem);
      });
    },

    updateChecklistItemByListItem({ commit }, payload) {
      updateChecklistItem(payload).then(() => {
        commit('UPDATE_CHECKLIST_ITEM', payload);
      });
    },

    deleteChecklistItemByListItem({ commit }, itemId) {
      deleteChecklistItem(itemId).then(() => {
        commit('DELETE_CHECKLIST_ITEM', itemId);
      });
    },
  },
});
