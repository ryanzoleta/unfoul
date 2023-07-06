<script>
  import '../app.css';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
  <title>Unfoul - Become Porn-free</title>
</svelte:head>

<slot />
