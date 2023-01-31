# timewarrior-recap

An extension for [`timewarrior`](https://timewarrior.net/) that helps summarizing work hours/minutes spend on specific tags.

## Installation

Either [build](#buildingdeveloping) the extension yourself or download `recap.js` from the latest [release](https://github.com/cbe/timewarrior-recap/releases) and move it to `~/.timewarrior/extensions`. The script needs the executable permission bit.

## Usage

```sh
timew [report] recap [<range>] [<tag>...]
```

ℹ️ This assumes that you installed this extension as `recap.js` (or just `recap`) in the extensions directory, which is usually `~/.timewarrior/extensions`.

### Example

So let's say you tracked the following 3 times during the day.

```sh
timew track 9am - 11am 'Staff Meeting'
timew track 11am - 0:30pm 'They call me work horse'
timew track 3pm - 5pm 'Staff Meeting'
```

This extension then prints

```sh
timew report recap :day

Tags                    Duration
Staff Meeting           4 hours
They call me work horse 1 hour 30 minutes
```

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
