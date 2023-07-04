import { env } from '$env/dynamic/private';
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
        redirect_uri: `${env.HOSTNAME}/oauth`
      }),
      {
        auth: {
          username: env.REDDIT_API_CLIENT_ID as string,
          password: env.REDDIT_API_CLIENT_SECRET as string
        }
      }
    );

    accessToken = data['access_token'];
  }

  return {
    token: accessToken
  };
}
