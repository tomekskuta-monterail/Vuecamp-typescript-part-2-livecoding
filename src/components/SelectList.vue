<template>
  <ul
    ref="list"
    class="search-list"
    @keydown.esc="$emit('close-list-and-focus-input')"
  >
    <li
      v-for="option in options"
      :key="option.value"
      class="search-list__item"
      :class="{
        'search-list__item--selected': selectedOption?.value === option.value,
      }"
      @keydown.space="clickItemOnPressSpace"
      @click="$emit('close-list')"
    >
      <button @click="clickItem(option)">
        {{ option.label }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import type { Option } from "./SearchableSelect.vue";

const LIST_MARGIN_BOTTOM = 20;

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    selectedOption: {
      type: Object as PropType<Option>,
      default: null,
    },
  },

  emits: ["choose-option", "close-list", "close-list-and-focus-input"],

  data() {
    return {
      listMaxHeight: "0px",
    };
  },

  async mounted() {
    await this.$nextTick();

    const windowHeight = window.innerHeight;
    const listDimensions = (
      this.$refs.list as HTMLUListElement
    ).getBoundingClientRect();

    this.listMaxHeight = `${
      windowHeight - listDimensions.top - LIST_MARGIN_BOTTOM
    }px`;
  },

  methods: {
    clickItemOnPressSpace(event: Event) {
      (event.target as HTMLLIElement).click();
    },

    clickItem(item: Option) {
      this.$emit("choose-option", item);
      this.$emit("close-list");
    },
  },
});
</script>
