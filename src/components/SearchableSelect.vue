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

<script>
import { defineComponent } from "vue";

import List from "@/components/SelectList.vue";

let timeoutId;

export default defineComponent({
  components: { List },

  props: {
    placeholder: String,
    searchQuery: String,
    selectedOption: Object,
    options: Array,
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

    onSearchChange: function (event) {
      const searchQuery = event.target.value;

      this.$emit("update:searchQuery", searchQuery);
    },

    closeListAndFocusInput() {
      this.$refs.input?.focus();
      this.isOpen = false;
    },
  },
});
</script>
