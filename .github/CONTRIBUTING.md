# Holdex Contributing Guide <!-- omit in toc -->

Thank you for your interest in contributing to our project! Any contribution you make will be reflected on [holdex.io](https://holdex.io) or related websites. Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## Getting started

There are 3 core concepts which are the core pilars of our collaboration success:
1. **Goal** – a business aim
1. **Problem** – an issue that is on the way to help us achieve the goal
1. **Solution** – a mean of solving a problem

In this guide you will get an overview of the contribution workflow: from finding a goal to work on, identifying the obstacles (problems) to achieve it, and the process of delivering your solutions.

### Goal

As soon as you get involved in one of our projects, you must understand the it's current goal.  
Investigate the conversations, make your own assessments, and figure out how things are already moving towards achieving the goal. 
It is crucial to understand the business context of the goal and how achieving the goal will impact the project.

All goals can be identified as GitHub issues in the relevant repository. Goals are created and managed by Partner level contributor.

### Problem
Once the goal is clear, you must identify what stops you from achieving it. Anything that is stopping us - is a “Problem”. A typical question to ask are: "what valuable action the user can’t perform?".

As team members, we find and report these problems through [GitHub Issues](https://docs.github.com/en/issues). Sometimes, a Goal already has a few problems reported, but it’s not always the case. 

We’re counting on our contributors to find these problems.

### Solve the Problem
The third final pillar of our success is the "solution". Different problems may require different sets of skills. Whether it’s code, design, or marketing material, we expect a lean and clean solution you can provide in your area of expertise.

If the source-code modification is required, the solution is presented as [GitHub PR](https://docs.github.com/en/pull-requests). 

Our solution requiremest:
1. [Keep PRs small](https://artsy.github.io/blog/2021/03/09/strategies-for-small-focused-pull-requests/) and completable within 3-4 hours. If the solution requires more time, then decompose the problem into smaller problems until you can solve that problem within 3-4 hours.
2. When creating PRs and commits, make sure the name of the PR is super [clean and simple](https://pulsar.apache.org/contribute/develop-semantic-title/#how-to-write-good-pr-titles). You must follow [Conventional Commit](https://www.conventionalcommits.org) guidelines here.

#

Trial
Fidning problem
Forking
Support
Roles & Compensation


### Issues

#### Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/github/docs/issues/new/choose).

#### Solve an issue

Scan through our [existing issues](https://github.com/github/docs/issues) to find one that interests you. You can narrow down the search using `labels` as filters. See [Labels](/contributing/how-to-use-labels.md) for more information. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

#### Make changes in the UI

Click **Make a contribution** at the bottom of any docs page to make small changes such as a typo, sentence fix, or a broken link. This takes you to the `.md` file where you can make your changes and [create a pull request](#pull-request) for a review.

 <img src="/contributing/images/contribution_cta.png" />

#### Make changes in a codespace

For more information about using a codespace for working on GitHub documentation, see "[Working in a codespace](https://github.com/github/docs/blob/main/contributing/codespace.md)."

#### Make changes locally

1. Fork the repository.
- Using GitHub Desktop:
  - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

- Using the command line:
  - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2. Install or update to **Node.js**, at the version specified in `.node-version`. For more information, see [the development guide](contributing/development.md).

3. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them. Don't forget to [self-review](/contributing/self-review.md) to speed up the review process:zap:.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.
- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: The GitHub team thanks you :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [GitHub docs](https://docs.github.com/en).

Now that you are part of the GitHub docs community, see how else you can [contribute to the docs](/contributing/types-of-contributions.md).

# Support 
https://discord.gg/JswagFgdR9