import { REDDIT_API_CLIENT_ID, REDDIT_API_SCOPES, HOSTNAME } from '$env/static/private';

export const ssr = false;

export async function load() {
  return {
    clientId: REDDIT_API_CLIENT_ID,
    redirectUri: `${HOSTNAME}/oauth`,
    scopes: REDDIT_API_SCOPES
  };
}
