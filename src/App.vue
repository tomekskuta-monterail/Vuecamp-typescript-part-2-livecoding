<script lang="ts">
import { defineComponent } from "vue";

import SearchableSelect, { Option } from "@/components/SearchableSelect.vue";

type Data = {
  searchQuery: string;
  selectedOption: Option | undefined;
};

const options: Option[] = [
  { value: "1", label: "Harry Potter" },
  { value: "2", label: "Hermiona Granger" },
  { value: "3", label: "Ron Wesley" },
  { value: "4", label: "Draco Malfoy" },
  { value: "5", label: "Neville Longbottom" },
];

export default defineComponent({
  components: { SearchableSelect },
  data(): Data {
    return {
      searchQuery: "",
      selectedOption: undefined,
    };
  },
  options,
});
</script>

<template>
  <div>
    <header>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />
    </header>

    <div class="select-wrapper">
      <div class="selected-option">
        {{ selectedOption?.label }}
      </div>

      <SearchableSelect
        placeholder="Select character"
        v-model:searchQuery="searchQuery"
        v-model:selectedOption="selectedOption"
        :options="$options.options"
      />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.select-wrapper {
  margin-top: 100px;
}

.selected-option {
  margin-bottom: 30px;
  color: white;
  font-size: 24px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
