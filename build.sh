#!/bin/bash

# Step 1: Check if the build directory exists, create it if it doesn't
if [ ! -d "./build" ]; then
  mkdir ./build
fi

# Step 2: Extract paths passed to renderHtml() from index.js
index_js="index.js"

# Helper function to replace components in HTML
replace_components() {
  local file_path="$1"
  local index_page
  index_page=$(<"$file_path")

  # Find all components in the form <@components/componentName>
  while [[ $index_page =~ (<@([^>]+)>) ]]; do
    full_match="${BASH_REMATCH[1]}"
    component_path="${BASH_REMATCH[2]}"
    component_file="./content/$component_path"

    # Check if the component file exists
    if [ -f "$component_file" ]; then
      # Read the content of the component file
      component_content=$(<"$component_file")

      # Replace the full match (e.g., <@components/Nav.nick>) with the content
      index_page="${index_page//$full_match/$component_content}"
    else
      echo "Component file not found: $component_file"
    fi
  done

  echo "$index_page"
}

# Loop through each route in index.js
while IFS= read -r line; do
  # Extract the file path from the renderHtml argument
  if [[ $line =~ renderHtml\(\ *[\'\"]([^\"]+)[\'\"]\ *\) ]]; then
    file_path="${BASH_REMATCH[1]}"
    output_file=$(basename "$file_path" .html)

    # Step 3: Call replace_components to render the HTML and replace components
    rendered_content=$(replace_components "$file_path")

    # Step 4: Write the rendered content to the ./build directory
    if [ -n "$rendered_content" ]; then
      echo "$rendered_content" > "./build/$output_file.html"
      echo "Rendered content written to ./build/$output_file.html"
    else
      echo "Error rendering $file_path"
    fi
  fi
done < "$index_js"
