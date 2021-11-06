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

**NOTE:** You need to have the [nektos/act](https://github.com/nektos/act) cli on your system for this to work as it has been developed
Once installed, you can call the below command.

**NOTE:** You need to create the github token for yourself in order to test on your local machine. As it is your github token, you will only be able to push to repos you have write access to.

```bash
act -v -s GITHUB_TOKEN=YOUR_USER_TOKEN -j refresh
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

      - name: Install Yarn
        run: npm i -g yarn
      
      # hack given that we don't have top-level dependencies
      # go into the directory and install (resets dir before next command is run)
      - name: Install dependencies
        run: cd ./.github/actions/generate-resources && yarn install --frozen-lockfile

      - name: Run action
        uses: ./.github/actions/generate-resources

      - name: Prettier clean up
        run: ./.github/actions/generate-resources/node_modules/.bin/prettier README.md --write

      # note the harcode of the repo name. this could be done better if we wanted to use this repeatedly, but seems like a one-off
      # if you're testing, make sure that the repo organization and repo name (gjsyme and resources, respectively, here) are replaced by something
      # that something needs to be writable by a user with your permissions (from your GH token)
      - name: Commit changes
        run: |
          git add README.md
          git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/gjsyme/resources
          git -c user.name="D_D RESOURCE BOT" -c user.email="resource_bot@users.noreply.github.com" commit -m 'Refresh README.md from Airtable' || echo 'No changes to commit'
          git push origin || echo 'No changes to commit'
```