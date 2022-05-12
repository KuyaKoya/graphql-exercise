import { createApp, h } from 'vue';
import { initApollo } from './plugins/apollo-client';
import App from './App.vue';
import router from './router';
import userModule from './user-module';

const app = createApp({
  setup() {
    initApollo();
  },
  render() {
    return h(App);
  },
});

userModule({ app, router });

app.use(router);
app.mount('#app');
