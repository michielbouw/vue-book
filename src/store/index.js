import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';

import DEFAULT_SETTINGS from './mockData/settings';
import MOCK_LIST from './mockData/list';
import MOCK_CHECKLIST from './mockData/checklist';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    settings: DEFAULT_SETTINGS,
    loading: {
      list: false,
      checklistsByListItem: [],
    },
    list: [],
    checklistItems: [],
  },

  getters: {
    loadingChecklistByListItem: state => listItemId => {
      return R.includes(listItemId, state.loading.checklistsByListItem);
    },

    getChecklistByListItem: state => listItemId => {
      return R.filter(R.propEq('listItemId', listItemId))(state.checklistItems);
    },

    getChecklistItem: state => id => {
      return R.filter(R.propEq('id', id))(state.checklistItems);
    },
  },

  mutations: {
    SET_LOADING_LIST_ITEMS(state, loading) {
      state.loading.list = loading;
    },

    SET_LIST_ITEMS(state, list) {
      state.list = list;
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

    ADD_MOCKED_CHECKLIST_ITEMS(state, listItemId) {
      const lastId = state.checklistItems.length
        ? +R.last(state.checklistItems).id
        : 0;
      MOCK_CHECKLIST(lastId + 1).forEach(checklistItem => {
        state.checklistItems.push({
          ...checklistItem,
          listItemId,
        });
      });
    },

    ADD_CHECKLIST_ITEM(state, { listItemId }) {
      const lastId = state.checklistItems.length
        ? +R.last(state.checklistItems).id
        : 0;
      state.checklistItems.push({
        listItemId,
        id: lastId + 1,
        value: '',
        checked: false,
      });
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

    DELETE_CHECKLIST_ITEM(state, { itemId }) {
      if (!R.filter(R.propEq('id', itemId))(state.checklistItems)) {
        return;
      }

      state.checklistItems = R.filter(!R.propEq('id', itemId))(
        state.checklistItems
      );
    },
  },

  actions: {
    fetchListItems({ commit, state }) {
      if (!state.list.length) {
        commit('SET_LOADING_LIST_ITEMS', true);
      }

      setTimeout(() => {
        commit('SET_LIST_ITEMS', MOCK_LIST);

        commit('SET_LOADING_LIST_ITEMS', false);
      }, 2000);
    },

    fetchChecklistByListItem({ commit }, listItemId) {
      commit('SET_LOADING_CHECKLIST_BY_LIST_ITEM', listItemId);

      setTimeout(() => {
        commit('ADD_MOCKED_CHECKLIST_ITEMS', listItemId);

        commit('UNSET_LOADING_CHECKLIST_BY_LIST_ITEM', listItemId);
      }, 2000);
    },

    addChecklistItemByListItem({ commit }, listItemId) {
      commit('ADD_CHECKLIST_ITEM', {
        listItemId,
      });
    },

    updateChecklistItemByListItem({ commit }, payload) {
      commit('UPDATE_CHECKLIST_ITEM', payload);
    },

    deleteChecklistItemByListItem({ commit }, payload) {
      commit('DELETE_CHECKLIST_ITEM', payload);
    },
  },
});
