@echo off

echo Setting up next-forge...

echo Installing dependencies...
pnpm install

echo Copying .env.example files to .env.local...
copy apps\api\.env.example apps\api\.env.local
copy apps\app\.env.example apps\app\.env.local
copy apps\web\.env.example apps\web\.env.local
copy packages\database\.env.example packages\database\.env

echo Deleting demo folders...
rmdir /S /Q splash
rmdir /S /Q docs

echo Setting up Prisma...
pnpm build --filter @repo/database

echo Setup complete! Deleting setup folder...
rmdir /S /Q scripts
