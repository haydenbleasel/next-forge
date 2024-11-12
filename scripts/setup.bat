@echo off

echo Setting up next-forge...

echo Installing dependencies...
pnpm install

echo Copying .env.example files to .env.local...
copy apps\api\.env.example apps\api\.env.local
copy apps\app\.env.example apps\app\.env.local
copy apps\web\.env.example apps\web\.env.local
copy packages\database\.env.example packages\database\.env

echo Deleting internal content...
rmdir /S /Q .github/workflows
del .github/CONTRIBUTING.md
del .github/FUNDING.md
del .github/SECURITY.md
rmdir /S /Q docs
rmdir /S /Q splash
del .autorc
del .coderabbit.yaml
del CHANGELOG.md
del license.md

echo Setting up Prisma...
pnpm build --filter @repo/database

echo Setup complete! Deleting scripts folder...
rmdir /S /Q scripts
