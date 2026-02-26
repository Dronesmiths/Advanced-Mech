#!/bin/bash

# Knowledge Factory Cloning Script
# Usage: ./scripts/clone-template.sh

echo "🏭 Welcome to the Knowledge Factory Cloner"
echo "----------------------------------------"

read -p "Enter new client/project name (e.g. Acme_Corp): " CLIENT_NAME

if [ -z "$CLIENT_NAME" ]; then
  echo "❌ Client name cannot be empty."
  exit 1
fi

# Sanitize directory name (simple regex)
DIR_NAME=$(echo "$CLIENT_NAME" | sed 's/ /_/g')

echo "🚀 Cloning factory to ../$DIR_NAME..."

mkdir -p "../$DIR_NAME"

# Copy resources
cp -r _factory_resources "../$DIR_NAME/"
cp -r scripts "../$DIR_NAME/"

# Initialize fresh Git
cd "../$DIR_NAME"
git init

echo "✅ Factory cloned to ../$DIR_NAME"
echo "👉 Next steps:"
echo "   1. cd ../$DIR_NAME"
echo "   2. Update _factory_resources/CLIENT_INTAKE.md"
echo "   3. Run 'npm install'"
echo "   4. Start the Agent with ANTIGRAVITY_BOOTSTRAP.md"
