<h1 align="center">Unfoul</h1>

**Unfoul** is a simple easy-to-use web app for removing all NSFW content from your Reddit account' saved list.

This is a tool I created to help those struggling with porn addiction and have accumulated a huge amount of porn in their Reddit account's saved list. This is meant to be an easy, friction-less way to "clean" your Reddit account and help users in their porn-free journey.

**Try it out here: https://unfoul.vercel.app/**

Written in Typescript using [SvelteKit](https://kit.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/)

### Features

- **Privacy-friendly**: everything (except the OAuth login) is done in the browser. Nothing is stored in a database. I do not have access to your private saved data nor to your OAuth token. If you think there's a privacy or security risk anywhere in the code, feel free to create a GitHub issue.

- **Safe For Work**: using this won't expose you to any NSFW content. If you are currently struggling with porn addiction, this will hopefully not trigger any urges.

### Limitations

- When accessing users' saved data, Redit imposes a limitation of only retrieving up to 1000 items (this is actually true even in their own web app). So if you have a TON of saved data, it might take more than just 1 click to fully clean your account.

- Reddit also imposes a rate limit of up to 100 requests per minute on their API. In my testing, I have not yet ran through this problem, but it is possible.
