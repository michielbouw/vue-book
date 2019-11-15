<template>
  <div class="checklist__item">
    <label :for="item.id" class="checker" :checked="item.checked">
      <input
        class="checkbox"
        :id="item.id"
        type="checkbox"
        v-model="checked"
        @change="onChangeItemChecked()"
      />
      <div class="checked"></div>
    </label>
    <input
      type="text"
      placeholder="name your item"
      v-model="value"
      @change="onChangeItemName()"
    />
    <span
      class="checklist__item-delete"
      title="Delete this item"
      @click.prevent="onDeleteItem(item.id)"
      >x</span
    >
  </div>
</template>

<script>
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

    onDeleteItem(id) {
      this.$emit('delete-item', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.checklist__item {
  width: 100%;
}

.checklist__item-delete {
  display: none;
  cursor: pointer;
  margin-left: 4px;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

.checker {
  display: inline-block;
  width: 15px;
  height: 15px;
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

  &[checked='checked'] + input[type='text'] {
    color: rgba(0, 0, 0, 0.65);
    text-decoration: line-through;
  }

  & + input[type='text'] {
    height: 18px;
    margin: 4px 0;
    width: calc(100% - 48px);
    font-size: 14px;

    outline: none;
    border: 1px solid transparent;
    background: transparent;
  }

  & + input[type='text']:focus {
    border: 1px solid rgba(0, 0, 0, 0.6);
    background: #ffffff;

    & + .checklist__item-delete {
      display: inline;
    }
  }
}
</style>
