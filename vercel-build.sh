#!/bin/bash

# 1. Clear out any conflicting lockfiles
rm -f package-lock.json yarn.lock

# 2. Run the main repository installation 
pnpm install --frozen-lockfile

# 3. Build your internal workspace database types first
pnpm --filter=@workspace/db build

# 4. Navigate into the API server and execute compiling commands
cd artifacts/api-server
pnpm exec tsc -p tsconfig.json --noEmit
pnpm exec esbuild src/app.ts --bundle --platform=node --format=cjs --outfile=dist/app.cjs --external:pino --external:pg-native
