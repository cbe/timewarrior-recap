# timewarrior-recap

An extension for [`timewarrior`](https://timewarrior.net/) that helps summarizing work hours/minutes spend on specific tags.

## Usage

```sh
timew [report] recap [<range>] [<tag>...]
```

ℹ️: This assumes that you installed this extension as `recap.js` (or just `recap`) in the extensions directory, which is usually `~/.timewarrior/extensions`.

## Dependencies

- [Node.js](https://nodejs.org/) (a `.node-version` file is present, you can use your favorite Node.js version manager)
- Yarn, which ships with Node.js and can be enabled with
  ```
  corepack enable
  ```

## Building/developing

Currently there's no real difference between building for production and developing as this extension is rather small and build times are very fast.

```sh
# Install node for example with `fnm`
fnm install

# Install dependencies
yarn install

# Run tests
yarn test
# Run tests continuously (for development)
yarn test:watch

# Build extension
yarn build
```
