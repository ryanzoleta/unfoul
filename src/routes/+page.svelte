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
  });
</script>

<main class="min-h-screen bg-black text-center text-gray-200">
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
      <button class="m:w-1/2 block cursor-wait rounded-lg bg-rose-400 px-5 py-2 text-xl" disabled
        ><span class="loading loading-spinner loading-sm mr-2 align-middle" />
        Connect to Reddit</button>
    {:else}
      <a
        href="https://www.reddit.com/api/v1/authorize?client_id={clientId}&response_type=code&state={state}&redirect_uri={redirectUri}&duration=permanent&scope={scopes}"
        class="block rounded-lg bg-rose-600 px-5 py-2 text-xl transition duration-300 hover:bg-rose-700"
        on:click={() => {
          isConnecting = true;

          setTimeout(() => {
            isConnecting = false;
          }, 3000);
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
