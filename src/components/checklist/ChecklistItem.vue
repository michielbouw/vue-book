<template>
  <div class="checklist__item">
    <label :for="item.id" class="checker" :checked="item.checked">
      <input
        class="checkbox"
        :name="item.id + 'checked'"
        :id="item.id"
        type="checkbox"
        v-model="checked"
        @change="onChangeItemChecked"
      />
      <div class="checked"></div>
    </label>
    <span class="input-wrapper">
      <input
        :name="item.id + 'value'"
        type="text"
        placeholder="name your item"
        v-model="value"
        @change="onChangeItemName"
      />
      <span
        v-if="isLoggedIn"
        class="checklist__item-delete"
        title="Delete this item"
        @click="onDeleteItem"
        >x</span
      >
    </span>
  </div>
</template>

<script>
import { isLoggedIn } from '../../services/authService';

export default {
  name: 'ChecklistItem',

  props: {
    item: Object,
  },

  data() {
    return {
      checked: false,
      value: '',
    };
  },

  computed: {
    isLoggedIn() {
      return isLoggedIn();
    },
  },

  mounted() {
    this.checked = this.item.checked;
    this.value = this.item.value;
  },

  methods: {
    onChangeItemChecked() {
      this.$emit('update-item', {
        ...this.item,
        checked: this.checked,
      });
    },

    onChangeItemName() {
      this.$emit('update-item', {
        ...this.item,
        value: this.value,
      });
    },

    onDeleteItem() {
      this.$emit('delete-item', this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.checklist__item {
  width: 100%;
}

.checklist__item-delete {
  display: inline;
  cursor: pointer;
  margin-left: -14px;
  z-index: 1;
  font-weight: bold;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

.checker {
  display: inline-block;
  width: 18px;
  height: 18px;
  padding: 1px;
  margin-right: 8px;
  margin-bottom: -5px;

  border: 2px solid rgba(0, 0, 0, 0.6);
  border-radius: 100%;

  .checkbox {
    display: none;
  }

  .checked {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  &[checked='checked'] > .checked {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &[checked='checked'] + .input-wrapper input[type='text'] {
    color: rgba(0, 0, 0, 0.65);
    text-decoration: line-through;
  }

  & + .input-wrapper {
    width: calc(100% - 48px);

    input[type='text'] {
      height: 20px;
      margin: 4px 0;
      padding-right: 16px;
      font-size: 14px;

      outline: none;
      border: 1px solid transparent;
      background: transparent;

      &:focus {
        border: 1px solid rgba(0, 0, 0, 0.4);
        background: #ffffff;

        // & + .checklist__item-delete {
        //   display: inline;
        // }
      }
    }
  }
}
</style>
