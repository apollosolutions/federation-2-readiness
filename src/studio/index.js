import { createClient } from '@urql/core';
import inquirer from 'inquirer';
import fetch from 'make-fetch-happen';

/**
 * @param {string | undefined} key
 * @param {{ useSudo: boolean }} options
 */
export async function getClient(key, { useSudo }) {
  let apiKey = key;
  if (!key) {
    apiKey = process.env.APOLLO_KEY;
  }

  if (!apiKey) {
    apiKey = await inquirer
      .prompt({ type: 'password', name: 'key', message: 'Apollo API Key' })
      .then((r) => r.key);
  }

  if (!apiKey) {
    throw new Error('missing api key');
  }

  return createClient({
    url: 'https://graphql.api.apollographql.com/api/graphql',
    // @ts-ignore - types don't match but it doesn't matter at runtime
    fetch,
    fetchOptions: {
      headers: {
        'x-api-key': apiKey,
        ...(useSudo ? { 'apollo-sudo': 'true' } : {}),
      },
    },
  });
}
