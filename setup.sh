#!/bin/bash

echo "Setting up next-forge..."

# Install Homebrew
if which brew >/dev/null; then
  echo "Homebrew is installed. Updating..."
  brew update
else
  echo "Homebrew is not installed. Installing..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install NVM
if which nvm >/dev/null; then
  echo "NVM is installed."
else
  echo "NVM is not installed. Installing..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  nvm install node
fi

# Install pnpm
if which pnpm >/dev/null; then
  echo "PNPM is installed."
else
  echo "PNPM is not installed. Installing..."
  brew install pnpm
fi

# Install pscale
if which pscale >/dev/null; then
  echo "Pscale is installed."
else
  echo "Pscale is not installed. Installing..."
  brew install pscale
fi

# Install Stripe
if which stripe >/dev/null; then
  echo "Stripe is installed."
else
  echo "Stripe is not installed. Installing..."
  brew install stripe/stripe-cli/stripe
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Copy .env.example to .env.local
echo "Copying .env.example files to .env.local..."
cp apps/api/.env.example apps/api/.env.local
cp apps/web/.env.example apps/web/.env.local
cp apps/app/.env.example apps/app/.env.local

# Delete demo folder
echo "Deleting demo folder..."
rm -rf apps/demo

# Finish setup
echo "Setup complete! Deleting setup script..."

# Script self-deletion command
rm -- "$0"
