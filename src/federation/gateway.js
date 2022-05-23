import { ApolloGateway } from '@apollo/gateway';

/**
 * @param {string} supergraphSdl
 * @returns {Promise<{ success: true } | { success: false; error: any }>}
 */
export async function loadSupergraphInGateway(supergraphSdl) {
  const gateway = new ApolloGateway({
    supergraphSdl,
  });

  try {
    await gateway.load();
    return { success: true };
  } catch (e) {
    return { success: false, error: /** @type {any} */ (e) };
  }
}
