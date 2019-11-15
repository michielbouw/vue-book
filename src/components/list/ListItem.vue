<template>
  <div class="list-item flex-row" :class="{ 'list-item__expanded': expanded }">
    <span class="list-item__category small-text">{{ item.category }}</span>
    <span class="list-item__dates small-text">
      📅 edited {{ formatDateChanged }} &amp; created {{ formatDateCreated }}
    </span>

    <div class="left">
      <img
        v-if="!(item.images && item.images.length)"
        :src="settings.listItemFallbackImage"
        alt="item.title"
      />
      <span v-else>
        <img
          v-for="(imageSrc, index) in item.images"
          :key="index"
          :src="imageSrc"
          alt="item.title"
        />
      </span>
    </div>
    <div class="right">
      <h3>{{ item.title }}</h3>

      <div class="flex-row">
        <div v-if="expanded" class="left">
          <div class="small-text">{{ settings.listItemChecklistTitle }}</div>

          <span v-show="loading" class="loading"></span>

          <Checklist
            v-show="!loading && checklist.length"
            :checklist="checklist"
            @add-item="addChecklistItem"
            @update-item="updateChecklistItem"
            @delete-item="deleteChecklistItem"
          ></Checklist>
        </div>

        <div class="right">
          <div class="small-text">{{ settings.listItemDescriptionTitle }}</div>
          <p v-html="item.description"></p>
        </div>
      </div>
    </div>

    <div class="show-more">
      <a
        href="#"
        @click.prevent="toggleExpand"
        :title="
          !expanded
            ? `Expand ${settings.listItemTitle}`
            : `Collapse ${settings.listItemTitle}`
        "
      >
        {{ !expanded ? '&#8595;' : '&#8593;' }}
      </a>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import * as _ from 'lodash';
import { mapGetters, mapState } from 'vuex';

import Checklist from '../checklist/Checklist';

const SHORT_DESCRIPTION_CHARACTERS = 400;

export default {
  name: 'ListItem',
  components: { Checklist },

  props: {
    item: Object,
  },

  data() {
    return {
      expanded: false,
    };
  },

  mounted() {
    this.fetchChecklist();
  },

  computed: {
    shortDescription() {
      return _.truncate(this.item.description, {
        length: SHORT_DESCRIPTION_CHARACTERS,
        separator: ' ',
      });
    },

    formatDateCreated() {
      return moment(this.item.dateCreated).fromNow();
    },

    formatDateChanged() {
      return moment(this.item.dateChanged).fromNow();
    },

    ...mapState(['settings']),

    ...mapGetters(['loadingChecklistByListItem', 'getChecklistByListItem']),

    loading() {
      return this.loadingChecklistByListItem(this.item.id);
    },

    checklist() {
      return this.getChecklistByListItem(this.item.id);
    },
  },

  methods: {
    fetchChecklist() {
      this.$store.dispatch('fetchChecklistByListItem', this.item.id);
    },

    toggleExpand() {
      this.expanded = !this.expanded;
    },

    addChecklistItem() {
      this.$store.dispatch('addChecklistItemByListItem', this.item.id);
    },

    updateChecklistItem(item) {
      this.$store.dispatch('updateChecklistItemByListItem', {
        listItemId: this.item.id,
        updatedItem: item,
      });
    },

    deleteChecklistItem(itemId) {
      this.$store.dispatch('deleteChecklistItemByListItem', {
        listItemId: this.item.id,
        itemId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media all and (min-width: 800px) {
    flex-wrap: nowrap;
  }
}

.list-item {
  position: relative;
  padding: 8px;
  overflow: hidden;
  height: 350px;

  &__expanded {
    height: auto;
    padding-bottom: 24px;
  }

  &__category {
    margin-right: 16px;
  }

  .left,
  .right {
    flex: 1 1 100%;
    margin: 8px 0;
  }

  .left + .right {
    margin-top: 16px;
  }

  .show-more {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 32px;
    width: 100%;
    line-height: 32px;
    text-align: center;

    background-color: rgba(255, 255, 255, 0.4);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.75),
      rgba(255, 255, 255, 1)
    );

    a {
      text-decoration: none;
      color: #000000;

      &:hover {
        font-weight: bold;
      }
    }
  }

  img {
    max-width: 100%;
    max-height: 100px;
    border-radius: 4px;
  }

  /* Large screens */
  @media all and (min-width: 800px) {
    padding-top: 20px;
    height: 225px;

    &__expanded {
      height: auto;
    }

    &__category {
      margin-right: 0px;
    }

    &__category {
      position: absolute;
      top: 8px;
      left: 8px;
    }

    &__dates {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    .left {
      flex: 0 1 40%;
    }

    .left + .right {
      margin-top: 8px;
      margin-left: 16px;
    }

    img {
      width: 100%;
      max-height: none;
    }
  }

  h3,
  p {
    margin: 0;
  }

  .small-text {
    margin-bottom: 8px;
  }

  .checklist {
    input:checked {
      & + label {
        font-style: italic;
        text-decoration: line-through;
      }
    }

    label {
      margin-left: 8px;
    }
  }
}
</style>
