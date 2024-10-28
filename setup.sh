#!/bin/bash

echo "Setting up next-forge..."

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Duplicate .env.example files
echo "Copying .env.example files to .env.local..."
cp apps/api/.env.example apps/api/.env.local
cp apps/app/.env.example apps/app/.env.local
cp apps/web/.env.example apps/web/.env.local
cp apps/studio/.env.example apps/studio/.env

# Delete demo folder
echo "Deleting demo folder..."
rm -rf apps/_docs

# Finish setup
echo "Setup complete! Deleting setup script..."

# Script self-deletion command
rm -- "$0"
