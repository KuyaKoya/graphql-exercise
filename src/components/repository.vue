<template>
  {{ repository.login  }}
  <!-- {{ repository.node.owner.login }} -->
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Repository',
  props: {
    repository: {
      type: Object,
      required: true,
    },
    searchOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let selectedId: string;
    const { repository, searchOptions } = toRefs(props);
  },
});
</script>
