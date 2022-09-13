<template>
  <div class="search" @focus.capture="onFocus" @blur.capture="onBlur">
    <input
      class="search__input"
      ref="input"
      :placeholder="selectedOption?.label || placeholder"
      :value="searchQuery"
      @input="onSearchChange"
      @keydown.esc="isOpen = false"
      @keydown.enter="isOpen = false"
    />

    <List
      v-if="isOpen"
      :options="filteredOption"
      :selectedOption="selectedOption"
      @choose-option="$emit('update:selectedOption', $event)"
      @close-list="isOpen = false"
      @close-list-and-focus-input="closeListAndFocusInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import List from "@/components/SelectList.vue";

let timeoutId: number;

export type Option = {
  value: string;
  label: string;
};

export default defineComponent({
  components: { List },

  props: {
    placeholder: {
      type: String,
      default: "",
    },
    searchQuery: {
      type: String,
      default: "",
    },
    selectedOption: {
      type: Object as PropType<Option>,
      default: null,
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
  },
  emits: ["update:selectedOption", "update:searchQuery"],

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    filteredOption() {
      return this.searchQuery
        ? this.options.filter((option) =>
            option.label.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.options;
    },
  },

  methods: {
    onFocus() {
      this.isOpen = true;
      clearTimeout(timeoutId);
    },

    onBlur() {
      timeoutId = setTimeout(() => {
        this.isOpen = false;
      });
    },

    onSearchChange: function (event: Event) {
      const searchQuery = (event.target as HTMLInputElement).value;

      this.$emit("update:searchQuery", searchQuery);
    },

    closeListAndFocusInput() {
      (this.$refs.input as HTMLInputElement).focus();
      this.isOpen = false;
    },
  },
});
</script>
