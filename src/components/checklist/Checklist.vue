<template>
  <div class="checklist">
    <ChecklistItem
      v-for="(item, index) in checklist"
      v-on="$listeners"
      :key="index"
      :item="item"
    ></ChecklistItem>

    <div v-if="isLoggedIn" class="checklist__add small-text" @click="addItem">
      + add item
    </div>
  </div>
</template>

<script>
import { isLoggedIn } from '../../services/authService';

import ChecklistItem from './ChecklistItem';

export default {
  name: 'Checklist',
  components: { ChecklistItem },

  props: {
    checklist: Array,
  },

  computed: {
    isLoggedIn() {
      return isLoggedIn();
    },
  },

  methods: {
    addItem() {
      this.$emit('add-item');
    },
  },
};
</script>

<style lang="scss" scoped>
.checklist {
  width: 100%;
}

.checklist__add {
  cursor: pointer;

  margin-top: 8px;
  padding-left: 32px;
}
</style>
