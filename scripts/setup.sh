#!/bin/bash

echo "Setting up next-forge..."

echo "Installing dependencies..."
pnpm install

echo "Copying .env.example files to .env.local..."
cp apps/api/.env.example apps/api/.env.local
cp apps/app/.env.example apps/app/.env.local
cp apps/web/.env.example apps/web/.env.local
cp packages/database/.env.example packages/database/.env

echo "Deleting internal content..."
rm -rf .github/workflows
rm .github/CONTRIBUTING.md
rm .github/FUNDING.md
rm .github/SECURITY.md
rm -rf docs
rm -rf splash
rm .autorc
rm .coderabbit.yaml
rm CHANGELOG.md
rm license.md

echo "Setting up Prisma..."
pnpm build --filter @repo/database

echo "Setup complete! Deleting scripts folder..."
rm -rf scripts

