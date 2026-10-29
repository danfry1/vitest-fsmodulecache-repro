# vitest-fsmodulecache-repro

Reproduction for [vitest-dev/vitest#11789](https://github.com/vitest-dev/vitest/issues/11789):
with `fsModuleCache: true`, a test in a subdirectory that dynamically imports a relative
path outside the project root keeps failing after the missing file is created.

The project root is `app/`. The test is `app/src/nested.test.js` and imports
`../../shared/value.js`, which does not exist at first.

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
