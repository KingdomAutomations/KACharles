#!/bin/bash

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist

# Build the frontend
echo "Building frontend..."
vite build

# Build the backend
echo "Building backend..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Copy files from dist/public to dist root for deployment
echo "Reorganizing build files for deployment..."
if [ -d "dist/public" ]; then
    # Create temporary directory
    mkdir -p temp_build
    # Copy all files from dist/public to temp directory
    cp -r dist/public/* temp_build/
    # Copy backend files to temp directory
    cp dist/index.js temp_build/
    # Remove old dist directory
    rm -rf dist
    # Move temp directory to dist
    mv temp_build dist
    echo "Build files reorganized successfully"
else
    echo "Warning: dist/public directory not found"
fi

echo "Build complete!"