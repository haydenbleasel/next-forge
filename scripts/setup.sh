#!/bin/bash

echo "Setting up next-forge..."

echo "Installing dependencies..."
pnpm install

echo "Copying .env.example files to .env.local..."
cp apps/api/.env.example apps/api/.env.local
cp apps/app/.env.example apps/app/.env.local
cp apps/web/.env.example apps/web/.env.local
cp packages/database/.env.example packages/database/.env

echo "Deleting demo folders..."
rm -rf splash
rm -rf docs

echo "Setting up Prisma..."
pnpm build --filter @repo/database

echo "Setup complete! Deleting setup folder..."
rm -rf scripts

