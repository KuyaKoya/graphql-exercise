<template>
  <ul>
    hello
    <li v-for="user of users" :key="user.id">
      {{ user }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import query from '@/queries/graphql-query';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const {
      users,
      getUsers,
    } = query();

    watchEffect(() => {
      getUsers();
    });

    console.log(users.value);
    return {
      users,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
