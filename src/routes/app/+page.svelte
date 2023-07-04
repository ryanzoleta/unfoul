<script lang="ts">
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import axios from 'axios';
  import { page } from '$app/stores';
  import NavHeader from '$lib/components/nav-header.svelte';
  import GithubLink from '$lib/components/github-link.svelte';
  import type Item from '$lib/types/item';

  let errorHeader = '';
  let errorDetails = '';
  let allItems = [];
  let nsfwItems: Item[] = [];
  let doneRetrieving = false;
  let purging = false;
  let purgeCount = 0;

  $: nsfwItems = allItems?.filter((item) => {
    return item.isNsfw;
  });

  const headers = {
    Authorization: `Bearer ${Cookies.get('token')}`
  };

  const limitParam = $page.url.searchParams.get('limit');
  const limit = parseInt(limitParam ?? '100');

  function retrieveDataFromReddit() {
    doneRetrieving = false;
    allItems = [];

    axios
      .get('https://oauth.reddit.com/api/v1/me', { headers })
      .then(async (response) => {
        const username = response.data.name;

        try {
          let after = '';

          console.log('Feting data from Reddit API...');

          do {
            const resp = await axios.get(`https://oauth.reddit.com/user/${username}/saved`, {
              params: {
                after,
                limit
              },
              headers
            });

            after = resp.data.data.after;

            const { children } = resp.data.data;

            allItems = [
              ...allItems,
              ...children.map((item) => {
                return {
                  id: item.kind + '_' + item.data.id,
                  isNsfw: item.data.over_18,
                  link: item.data.url
                };
              })
            ];

            console.log(
              `Done fetching ${resp.data.data.children.length}. Total so far: ${allItems.length}`
            );
          } while (after && !limitParam);

          doneRetrieving = true;
        } catch (e) {
          console.error(e);
          errorHeader = 'There was an error retrieving saved items';
          errorDetails = e.message;
        }
      })
      .catch((e) => {
        errorHeader = 'There was an error retrieving your user data';
        errorDetails = e.message;
      });
  }

  async function unsaveAll() {
    purgeCount = nsfwItems.length;
    purging = true;

    for (const item of nsfwItems) {
      await axios.post(
        `https://oauth.reddit.com/api/unsave`,
        {},
        {
          params: {
            id: item.id
          },
          headers
        }
      );

      purgeCount -= 1;
    }

    purging = false;
    doneRetrieving = false;
    retrieveDataFromReddit();
  }

  onMount(async () => {
    retrieveDataFromReddit();
  });
</script>

<main class="min-h-screen bg-black text-gray-200">
  <div class="flex flex-col place-items-center gap-7 px-10 pt-5 text-left">
    <div class="w-full md:w-4/12">
      <div class="flex place-content-between">
        <NavHeader />
        <GithubLink />
      </div>

      {#if errorHeader}
        <div class="mt-10 flex flex-col gap-3">
          <h1 class="text-2xl font-bold">{errorHeader}</h1>
          <p class="text-zinc-500">{errorDetails}</p>
          <p>
            Try going back to the <a href="/" class="text-rose-500 hover:underline">homepage</a> and
            reconnecting your Reddit account
          </p>
        </div>
      {:else if doneRetrieving}
        <div class="mt-10 flex flex-col gap-7">
          {#if nsfwItems.length === 0}
            <h1 class="text-4xl font-bold">Congratulations!</h1>
            <p>There are {nsfwItems.length} NSFW saved posts on your Reddit account.</p>
            <p>
              Your account is completely <span class="font-bold text-rose-500">pornfree</span> 👍🏼
            </p>
            <div>
              <button
                class="rounded-lg bg-zinc-800 px-5 py-2 text-left text-lg font-bold text-zinc-400 transition duration-300 hover:bg-zinc-700"
                on:click={retrieveDataFromReddit}>
                Refresh
              </button>
            </div>
          {:else if purging}
            <h1 class="text-2xl font-bold">
              Purging <span class="text-rose-500">{nsfwItems.length}</span> NSFW saved posts in your
              Reddit account...
            </h1>

            <div class="flex gap-3">
              <div>
                <button
                  class="rounded-lg bg-zinc-900 px-5 py-2 text-left text-lg font-bold text-zinc-400"
                  disabled
                  ><span class="loading loading-spinner loading-sm p-0 align-middle" />
                  <span class="pl-1 align-middle">{purgeCount} remaining</span></button>
              </div>
            </div>
          {:else}
            <h1 class="text-2xl font-bold">
              Found <span class="text-rose-500">{nsfwItems.length}</span> NSFW saved posts in your Reddit
              account
            </h1>

            <div class="flex gap-3">
              <button
                class="rounded-lg bg-rose-500 px-5 py-2 text-left text-lg font-bold text-rose-100 transition duration-300 hover:bg-rose-400"
                on:click={() => {
                  window.confirmation_modal.showModal();
                }}>
                Purge them all
              </button>
              <button
                class="rounded-lg bg-zinc-800 px-5 py-2 text-left text-lg font-bold text-zinc-400 transition duration-300 hover:bg-zinc-700"
                on:click={retrieveDataFromReddit}>
                Refresh
              </button>
            </div>
            <p class="text-gray-400">
              This action cannot be undone and cannot be stopped once started
            </p>
            <dialog id="confirmation_modal" class="modal">
              <form method="dialog" class="modal-box">
                <h3 class="py-3 text-lg font-bold">Are you sure?</h3>
                <p class="">This cannot be undone and cannot be stopped once started.</p>
                <div class="modal-action">
                  <button class="btn">Cancel</button>
                  <button class="btn bg-rose-500 text-white hover:bg-rose-400" on:click={unsaveAll}
                    >Continue Purging</button>
                </div>
              </form>
            </dialog>
          {/if}
        </div>
      {:else}
        <div class="mt-10 flex flex-col gap-3">
          <p class="text-2xl font-bold">Retrieving your saved list, this might take a while...</p>
          <p class="text-gray-400">Found {allItems.length} total saved posts so far</p>
          <div>
            <button
              class="cursor-wait rounded-lg bg-zinc-900 px-5 py-2 text-left text-lg text-zinc-400"
              disabled
              ><span class="loading loading-spinner loading-sm p-0 align-middle" />
              <span class="pl-1 align-middle">Waiting to finish</span></button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
