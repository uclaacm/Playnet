# Playnet
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0640723c-755e-4561-8161-c581c67dafdc/deploy-status)](https://app.netlify.com/sites/play-net/deploys)
[![Mergify Status][mergify-status]][mergify]

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/uclaacm/Playnet&style=flat

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md). By participating, you are 
expected to uphold this code. Please report unacceptable behavior to acm@ucla.edu.

## Getting Started

We use [`yarn`](https://classic.yarnpkg.com/en/docs/install#mac-stable) as our package manager.

The basic commands to get this repository and start are:

```
$ git clone https://github.com/uclaacm/playnet.git
$ cd playnet
$ yarn install
$ yarn start
```

If you run into an issue, feel free to make an issue [here](https://github.com/uclaacm/playnet/issues).
If you have a fix, even better! Check out the follow section to learn how to contribute!

## Contributing

Thanks for your interest in contributing to `Playnet`! ❤️

Here's a quick guide on how to get started.

1. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the repository or checkout a branch; `master` is protected and is managed through our pipeline.
2. Create an issue and/or mark an existing one to let everyone know that you are working your magic ⚡️
3. Beep boop away!
4. **Before you push**, it's always a good idea to check that your changes follow our linter rules! Run `yarn lint` at the root directory and watch it judge your code. 
5. Stage, commit, and push your changes to make a [pull request](https://github.com/uclaacm/playnet/pulls)!
6. A maintainer will review your code and if it passes all the checks, your contribution will be merged on to `master` 🥳

See [CONTRIBUTING.md](CONTRIBUTING.md) and [DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md) for more info.

## Getting Help

If you ever need help with a feature or bug fix, no worries! Feel free to mark the issue as 
`guidance` so that our maintainers can start thinking about a solution. If you are 
comfortable making a [draft pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request),
you can also tag the Playnet team in a comment: `@uclaacm/playnet-team`!

## Changing Feedback Form URL
1. go to [PlaynetConstants](src/components/shared/PlaynetConstants.ts)
2. change `FEEDBACK_FORM_URL` and add your new url!

## License

[MIT](LICENSE.md)
