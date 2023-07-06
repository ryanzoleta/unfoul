<h1 align="center">Unfoul</h1>

**Unfoul** is a simple easy-to-use web app for removing all NSFW content from your Reddit account.

![unfoul_demo](https://github.com/ryanarnold/unfoul/assets/18186677/70e75df1-185e-46b5-8b30-b3da4ef0b071)

**Try it out here: https://unfoul.vercel.app/**

This is a tool I created to help those struggling with porn addiction and have accumulated a huge amount of porn in their Reddit account. This is meant to be an easy, friction-less way to "clean" your Reddit account and help users in their porn-free journey.

Written in Typescript using [SvelteKit](https://kit.svelte.dev/).

### Features

- **Privacy-friendly**: everything (except the OAuth login) is done in the browser. Your data isn't logged or stored in a database.

- **Safe For Work**: using the app won't expose you to any NSFW content. If you are currently struggling with porn addiction, this will hopefully not trigger any urges.

### Limitations

- Reddit limits viewing of a user's saved links to only up to 1000 records (this is actually true even in their own website). So if you have a TON of saved data, it might take more than just 1 click to fully clean your account.

- Reddit also imposes a rate limit of up to 100 requests per minute on their API. In my testing, I have not yet ran through this problem, but it is possible.
