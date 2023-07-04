import { REDDIT_API_CLIENT_ID, HOSTNAME, REDDIT_API_CLIENT_SECRET } from '$env/static/private';
import axios from 'axios';
import querystring from 'querystring';

export async function load({ url }) {
  const code = url.searchParams.get('code');

  let accessToken = '';

  if (code) {
    const { data } = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${HOSTNAME}/oauth`
      }),
      {
        auth: {
          username: REDDIT_API_CLIENT_ID as string,
          password: REDDIT_API_CLIENT_SECRET as string
        }
      }
    );

    accessToken = data['access_token'];
  }

  return {
    token: accessToken
  };
}
