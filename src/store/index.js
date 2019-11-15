import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import * as R from 'ramda';

Vue.use(Vuex);

const MOCK_CATEGORIES = [
  '🥗 Salads',
  '🍲 Oven',
  '🥔 Mashed patatoes',
  '🌮 Wraps',
  '🍝 Pasta',
  '🍚 Rice',
  '🍜 Noodles',
  '🥣 Soup',
  '🥘 Curry',
  '🥞 Pancakes',
  'Other',
];

const DEFAULT_SETTINGS = {
  mainHeaderTitle: 'My Cookbook',
  mainHeaderLogo: './img/logo.png',
  mainFooterContent: 'Michiel Bouw &copy; copyright 2019',
  listTitle: 'Receipts',
  listLoadingText: 'Loading your cook book now, hang on',
  listItemFallbackImage:
    'https://dummyimage.com/600x400/6EB5FF/fff.png&text=no+image+found',
  listItemTitle: 'Receipt',
  listItemChecklistTitle: 'What do you need',
  listItemDescriptionTitle: 'Description',
  categories: MOCK_CATEGORIES,
};

const MOCK_LIST_ITEMS =
  // [];
  [
    {
      id: 1,
      category: '🍝 Pasta',
      title: 'Wow',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      images: ['https://dummyimage.com/600x400/FFABAB/000'],
      dateCreated: moment()
        .subtract(1, 'hours')
        .toISOString(),
      dateChanged: moment()
        .subtract(10, 'minutes')
        .toISOString(),
    },
    {
      id: 2,
      category: '🍚 Rice',
      title: 'Another one',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      images: ['https://dummyimage.com/600x400/A79AFF/fff'],
      dateCreated: moment('2019-11-13').toISOString(),
      dateChanged: moment()
        .subtract(25, 'minutes')
        .toISOString(),
    },
    {
      id: 3,
      category: '🍚 Rice',
      title: 'Another two',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum doloLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation re eu fugiat nulla pariatur.',
      images: [],
      dateCreated: moment('2019-11-04').toISOString(),
      dateChanged: moment('2019-11-14').toISOString(),
    },
    {
      id: 4,
      category: '🍲 Oven',
      title: 'Another two or more',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      images: ['https://dummyimage.com/600x400/6EB5FF/fff'],
      dateCreated: moment('2019-11-01').toISOString(),
      dateChanged: moment('2019-11-05').toISOString(),
    },
  ];

const MOCK_CHECKLIST = [
  { id: 1, value: 'one', checked: false },
  { id: 2, value: 'two', checked: true },
  { id: 3, value: 'three', checked: false },
  { id: 4, value: 'four', checked: false },
];

export const store = new Vuex.Store({
  state: {
    settings: DEFAULT_SETTINGS,
    loading: {
      list: false,
      checklists: {},
    },
    list: [],
    checklists: {},
  },
  getters: {
    loadingChecklistByListItem: state => id => {
      return state.loading.checklists.hasOwnProperty(id)
        ? state.loading.checklists[id]
        : false;
    },
    getChecklistByListItem: state => id => {
      return state.checklists.hasOwnProperty(id) ? state.checklists[id] : [];
    },
  },
  actions: {
    fetchListItems({ commit }) {
      commit('SET_LOADING_LIST_ITEMS', true);

      setTimeout(() => {
        commit('SET_LIST_ITEMS', MOCK_LIST_ITEMS);

        commit('SET_LOADING_LIST_ITEMS', false);
      }, 2000);
    },

    fetchChecklistByListItem({ commit }, receiptId) {
      commit('SET_LOADING_CHECKLIST_BY_LIST_ITEM', {
        id: receiptId,
        loading: true,
      });

      setTimeout(() => {
        commit('SET_CHECKLIST_BY_LIST_ITEM', {
          id: receiptId,
          checklist: MOCK_CHECKLIST,
        });

        commit('SET_LOADING_CHECKLIST_BY_LIST_ITEM', {
          id: receiptId,
          loading: false,
        });
      }, 2000);
    },

    addChecklistItemByListItem({ commit }, listItemId) {
      commit('ADD_CHECKLIST_ITEM_BY_LIST_ITEM', {
        listItemId,
      });
    },

    updateChecklistItemByListItem({ commit }, payload) {
      commit('UPDATE_CHECKLIST_ITEM_BY_LIST_ITEM', payload);
    },

    deleteChecklistItemByListItem({ commit }, payload) {
      commit('DELETE_CHECKLIST_ITEM_BY_LIST_ITEM', payload);
    },
  },
  mutations: {
    SET_LOADING_LIST_ITEMS(state, loading) {
      state.loading.list = loading;
    },

    SET_LIST_ITEMS(state, list) {
      state.list = list;
    },

    SET_LOADING_CHECKLIST_BY_LIST_ITEM(state, { id, loading }) {
      Vue.set(state.loading.checklists, id, loading);
    },

    SET_CHECKLIST_BY_LIST_ITEM(state, { id, checklist }) {
      Vue.set(state.checklists, id, checklist);
    },

    ADD_CHECKLIST_ITEM_BY_LIST_ITEM(state, { listItemId }) {
      if (!state.checklists.hasOwnProperty(listItemId)) {
        return;
      }

      const currentChecklist = state.checklists[listItemId];
      const checklist = [
        ...currentChecklist,
        {
          id: R.toString(+R.last(currentChecklist).id + 1),
          value: '',
          checked: false,
        },
      ];
      Vue.set(state.checklists, listItemId, checklist);
    },

    UPDATE_CHECKLIST_ITEM_BY_LIST_ITEM(state, { listItemId, updatedItem }) {
      if (!state.checklists.hasOwnProperty(listItemId)) {
        return;
      }

      const checklist = state.checklists[listItemId].map(item =>
        item.id === updatedItem.id ? updatedItem : item
      );
      Vue.set(state.checklists, listItemId, checklist);
    },

    DELETE_CHECKLIST_ITEM_BY_LIST_ITEM(state, { listItemId, itemId }) {
      if (!state.checklists.hasOwnProperty(listItemId)) {
        return;
      }

      const checklist = state.checklists[listItemId].filter(
        item => item.id !== itemId
      );
      Vue.set(state.checklists, listItemId, checklist);
    },
  },
});
