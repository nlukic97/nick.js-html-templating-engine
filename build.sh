#!/bin/bash

# Define paths to content files
INDEX_PAGE_PATH="./content/index.html"
CONTENT_COMPONENT_PATH="./content/components/Content.nick"
NAV_COMPONENT_PATH="./content/components/Nav.nick"
BUILD_PATH="./build/index.html"

# Check if all required files exist
if [[ ! -f "$INDEX_PAGE_PATH" ]]; then
    echo "Error: $INDEX_PAGE_PATH not found."
    exit 1
fi

if [[ ! -f "$CONTENT_COMPONENT_PATH" ]]; then
    echo "Error: $CONTENT_COMPONENT_PATH not found."
    exit 1
fi

if [[ ! -f "$NAV_COMPONENT_PATH" ]]; then
    echo "Error: $NAV_COMPONENT_PATH not found."
    exit 1
fi

# Read files into variables
indexPage=$(<"$INDEX_PAGE_PATH")
contentCode=$(<"$CONTENT_COMPONENT_PATH")
navCode=$(<"$NAV_COMPONENT_PATH")

# Replace placeholders with content
fullData="${indexPage//<Content\/>/$contentCode}"
fullData="${fullData//<Nav\/>/$navCode}"

# Create build directory if it doesn't exist
if [[ ! -d "./build" ]]; then
    mkdir -p "./build"
fi

# Write the result to the build path
echo "$fullData" > "$BUILD_PATH"

# Check if the file was written successfully
if [[ $? -eq 0 ]]; then
    echo "Build completed: $BUILD_PATH"
else
    echo "Error: Failed to write to $BUILD_PATH"
    exit 1
fi
