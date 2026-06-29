#!/bin/bash
rm -f package-lock.json yarn.lock && pnpm install --frozen-lockfile && pnpm --filter=@workspace/db build && cd artifacts/api-server && pnpm exec tsc -p tsconfig.json --noEmit && pnpm exec esbuild src/app.ts --bundle --platform=node --format=cjs --outfile=dist/app.cjs --external:pino --external:pg-native
