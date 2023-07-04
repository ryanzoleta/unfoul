import { env } from '$env/dynamic/private';

export async function load() {
  return {
    clientId: env.REDDIT_API_CLIENT_ID,
    redirectUri: `${env.HOSTNAME}/oauth`,
    scopes: env.REDDIT_API_SCOPES
  };
}
