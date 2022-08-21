import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NUXT_API_ENDPOINT,
    // configuration //
  });
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
