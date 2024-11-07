@echo off
echo Setting up next-forge...

:: Install dependencies
echo Installing dependencies...
pnpm install

:: Duplicate .env.example files
echo Copying .env.example files to .env.local...
copy apps\api\.env.example apps\api\.env.local
copy apps\app\.env.example apps\app\.env.local
copy apps\web\.env.example apps\web\.env.local
copy packages\database\.env.example packages\database\.env

:: Delete demo folder
echo Deleting demo folder...
rmdir /S /Q apps\_docs

:: Finish setup
echo Setup complete! Deleting setup script...

:: Script self-deletion command
del "%~f0"
