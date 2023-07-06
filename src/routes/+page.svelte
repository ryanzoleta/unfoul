<script lang="ts">
  import { navigating, page } from '$app/stores';
  import GithubLink from '$lib/components/github-link.svelte';
  import NavHeader from '$lib/components/nav-header.svelte';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  export let data;

  let state: string;
  let isConnecting = false;

  const { clientId, redirectUri, scopes } = data;

  onMount(() => {
    state = uuidv4();
    localStorage.setItem('state', state);
    isConnecting = false;
  });

  $: if ($navigating) isConnecting = false;
</script>

<main
  class="min-h-screen bg-black text-center text-gray-200"
  on:load={() => {
    isConnecting = false;
  }}>
  <div class="flex flex-col place-items-center gap-7 px-10 pt-28">
    <NavHeader />
    <p class="text-2xl">
      Make your Reddit account <a
        href="https://old.reddit.com/r/pornfree/"
        target="_blank"
        class="transition duration-300 hover:text-rose-500 hover:underline">porn-free</a>
      with just one click <span class="text-rose-500">*</span>
    </p>

    {#if isConnecting}
      <button
        class="m:w-1/2 block w-3/4 cursor-wait rounded-lg bg-rose-400 p-2 text-xl md:w-4/12 lg:w-3/12"
        disabled
        ><span class="loading loading-spinner loading-sm mr-2 align-middle" />
        Connect to Reddit</button>
    {:else}
      <a
        href="https://www.reddit.com/api/v1/authorize?client_id={clientId}&response_type=code&state={state}&redirect_uri={redirectUri}&duration=permanent&scope={scopes}"
        class="block w-3/4 rounded-lg bg-rose-600 p-2 text-xl transition duration-300 hover:bg-rose-700 sm:w-1/2 md:w-4/12 lg:w-3/12"
        on:click={() => {
          isConnecting = true;
        }}>Connect to Reddit</a>
    {/if}

    <div>
      <p class="w-full text-center text-lg text-zinc-500">
        Unfoul will un-save all NSFW posts in your Reddit account's saved list.
      </p>
      <p class="text-lg text-zinc-500">
        <span class="text-rose-500">*</span> Due to Reddit API limitations, it might take more than 1
        click
      </p>
    </div>
  </div>
  <GithubLink fixed={true} />
</main>
