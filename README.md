# Welcome to Holdex


> Thank you for joining the Holdex project! Before diving in, please review our [contributing guidelines](https://github.com/holdex/developers/blob/main/.github/CONTRIBUTING.md) to ensure smooth collaboration.


## Developing

To get started, follow these steps:

1. Install Dependencies

 After cloning the repository, install the required dependencies:

  ```bash
npm install
# or use yarn
yarn
```

2. Start the Development Server

Launch a local development server with:

```bash
npm run dev
```

Alternatively, start the server and open the app in a new browser tab:

```bash
npm run dev -- --open
```


## Building

To create a production version of your app:

```bash
npm run build
```

## Environment Options

By default, the localhost runs in the staging environment. You can switch to the production environment for testing and revert back as needed.

### How to Switch Environments

1. Open the .env file in the project root.

2. Set the following variable to toggle the production API:

```bash
PUB_USE_PRODUCTION_API=true;
```

3. Run the clean development command to apply changes:

```bash
npm run clean-dev
```
