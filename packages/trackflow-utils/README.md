# TrackFlow Utilities

Private TypeScript package for the `003-domain-models` exercise. It will contain reusable, pure inventory and carrier utilities as they are developed. No domain models or business functions are implemented in this preparation phase.

## Requirements

- Node.js matching the package engine range (`^22.12.0 || ^24.0.0 || >=26.0.0`)
- npm

The setup was prepared with Node.js 22.23.3 and npm 10.9.9. TypeScript and Vitest are pinned in `package.json`; the package lockfile records their resolved dependency tree.
Package-local `.gitignore` excludes installed dependencies and generated coverage output.

## Commands

Run these commands from the monorepo root:

```bash
npm --prefix packages/trackflow-utils ci
npm --prefix packages/trackflow-utils run typecheck
npm --prefix packages/trackflow-utils test
npm --prefix packages/trackflow-utils test -- tests/setup.test.ts
```

`typecheck` uses the package-local strict `tsconfig.json` with `noEmit`. `test` runs the package-local Vitest suite. The setup test only verifies that the test runner starts; it does not exercise TrackFlow business rules.

This package is isolated from root scripts, the website, and `packages/shared/`.
