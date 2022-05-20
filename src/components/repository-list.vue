<template>
  <div class="flex justify-center" v-if="loading">
    <p class="text-xl font-bold text-gray-500">Request is loading...</p>
  </div>
  <div class="flex justify-center" v-else-if="error">
    <p class="text-xl font-bold text-red-600">Request has failed!</p>
  </div>
  <div v-else-if="repositories.length">
    <ul class="md:block max-w-6xl mx-auto">
      <li
        class="relative mb-8"
        v-for="repository in repositories"
        :key="repository.node.id"
      >
        <Repository :repository="repository.node" :search-options="searchOptions" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SearchResultItemConnection } from '@/generated/types';
import SEARCH_USER from '@/queries/document';
import Repository from '@/components/repository.vue';

export default defineComponent({
  name: 'RepositoryList',
  components: {
    Repository,
  },
  props: {
    searchOptions: {
      type: Object,
      default() {
        return { query: '', limit: 10 };
      },
    },
  },
  setup(props: { searchOptions: Record<string, any> }) {
    const { searchOptions } = toRefs(props);

    const { result, loading, error } = useQuery<{
      search: SearchResultItemConnection;
    }>(SEARCH_USER, searchOptions);

    const repositories = useResult(
      result,
      [],
      (data) => data.search && data.search.edges,
    );

    console.log(repositories);

    return {
      loading,
      error,
      repositories,
    };
  },
});
</script>
