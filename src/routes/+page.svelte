<script lang="ts">
  import GithubLink from '$lib/components/github-link.svelte';
  import NavHeader from '$lib/components/nav-header.svelte';
  import { v4 as uuidv4 } from 'uuid';

  export let data;

  const { clientId, redirectUri, scopes } = data;

  const state = uuidv4();
  localStorage.setItem('state', state);
</script>

<main class="min-h-screen bg-black text-center text-gray-200">
  <div class="flex flex-col place-items-center gap-7 px-10 pt-28">
    <NavHeader />
    <p class="text-2xl">
      Delete all your saved NSFW Reddit posts in one click <span class="text-rose-500">*</span>
    </p>

    <a
      href="https://www.reddit.com/api/v1/authorize?client_id={clientId}&response_type=code&state={state}&redirect_uri={redirectUri}&duration=permanent&scope={scopes}"
      class="block w-3/4 rounded-lg bg-rose-600 p-2 text-xl transition duration-300
      hover:bg-rose-500 sm:w-1/2 md:w-4/12 lg:w-3/12">Connect to Reddit</a>
    <p class="text-lg text-zinc-500">
      Everything will be done client-side, this app doesn't store your information in a server
    </p>
  </div>
  <GithubLink fixed={true} />
</main>
