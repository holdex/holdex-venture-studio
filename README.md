# Welcome to Holdex

> Before you begin align yourself with [contributing guidelines](https://github.com/holdex/developers/blob/main/.github/CONTRIBUTING.md).

## Developing

Once you've installed dependencies with `npm install` (or `npm install` or `yarn`), start a development server:

```bash
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

## Environment Configuration

### Development Environment

Our localhost runs the stage environment by default. You can switch it to run the production environment as you test things out and then switch back to staging.

To switch to production data, update your `.env` file:

```bash
PUB_USE_PRODUCTION_API=true;
```

and use the

```bash
npm run clean-dev
```

### Preview Environment

Preview uses production data by default (`PUB_USE_PRODUCTION_API=true`) to help catch UI bugs during PR reviews before they reach production. This ensures you see exactly what users will see.

For new component development that requires staging data, you can temporarily override this in your branch's environment configuration.