<script lang="ts">
  import Cookies from 'js-cookie';
  import { onMount } from 'svelte';
  import NavHeader from '$lib/components/nav-header.svelte';
  import GithubLink from '$lib/components/github-link.svelte';

  export let data;

  onMount(() => {
    Cookies.set('token', data.token, { sameSite: 'strict', secure: true, expires: 7 });
    window.location.href = '/app';
  });
</script>

<main class="min-h-screen bg-black text-center text-gray-200">
  <div class="flex flex-col place-items-center gap-7 px-10 pt-5 text-left">
    <div class="md:w-1/2">
      <div class="flex place-content-between">
        <NavHeader />
        <GithubLink />
      </div>
      <div class="mt-10">
        <p class="mb-5 text-2xl font-bold">Authorization successful</p>
        <p class="text-zinc-300">
          Please wait, you will be redirected to another page in a short while...
        </p>
        <p>
          <a href="/app" class="text-rose-600 hover:underline">Click here</a> if you are not automatically
          redirected
        </p>
      </div>
    </div>
  </div>
</main>
