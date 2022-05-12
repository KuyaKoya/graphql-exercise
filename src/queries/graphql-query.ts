import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, ref } from 'vue';

export default function query() {
  const users = ref();
  const { result, error } = useQuery(gql`
      query getUsers {
        search(query: "", type: USER, first: 10) {
          edges {
            node {
              ... on User {
                id
                email
                name
                avatarUrl
                repositories(first: 3) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

  function getUsers() {
    console.log('error', error);
    users.value = computed(() => result.value.search.edges ?? []);
    console.log('users:', users.value.value);
  }

  return {
    users,
    getUsers,
  };
}
