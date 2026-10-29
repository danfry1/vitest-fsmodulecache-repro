# vitest-fsmodulecache-repro

Reproduction for [vitest-dev/vitest#11789](https://github.com/vitest-dev/vitest/issues/11789).

With `fsModuleCache: true`, a test in a subdirectory that imports a relative path
outside the project root keeps failing after the missing file is created. It fails
until the cache is cleared.

The project root is `app/`. Both tests import `../../shared/value.js`, which does not
exist at first:

- `app/src/nested.test.js` imports it dynamically.
- `app/src/mocked.test.js` imports it statically but also calls `vi.mock`, which
  turns the import into a dynamic one.

## Run it

```sh
cd app
npm i
npm run repro
```

`npm run repro` runs the steps below and exits with 1 while the bug is present.

## By hand

```sh
cd app
npm i
npx vitest run          # fails: shared/value.js does not exist yet (expected)
echo "export const value = 1;" > ../shared/value.js
npx vitest run          # still fails: Cannot find module '/shared/value.js'
npx vitest --clearCache && npx vitest run   # passes
```

With `fsModuleCache: false` in `app/vitest.config.js`, the second run passes.

To start over: `rm ../shared/value.js && npx vitest --clearCache`.
