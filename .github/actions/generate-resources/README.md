# Generate RESOURCES.md Action

This action reads data from the Developer DAO Airtable and puts its content into README.md.

## Authors

- [@gjsyme](https://github.com/gjsyme)
- [@codingwithmanny](https://github.com/codingwithmanny)

## Requirements

- NVM or Node `v16.13.0`

## Setup

```bash
yarn install;
```

## Tests

```bash
yarn test;
```

## How To Run Locally

**NOTE:** `DO NOT` run this from within the `actions/generate-resources` folder, it will overwrite this `README.md`.

```bash
# make sure you're in the repo root
node .github/actions/generate-resources/main.js --run;

# clean up
node .github/actions/generate-resources/node_modules/.bin/prettier README.md --write;
```

## Example GitHub Action Usage 

```yaml
jobs:
  refresh:
    name: Scheduling
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Enable node
        uses: actions/setup-node@v2
        with:
          node-version: 16.x
      
      - name: Install dependencies
        run: cd ./.github/actions/generate-resources && yarn install --frozen-lockfile

      # Example use
      - name: Run action
        uses: ./.github/actions/generate-resources
```