#!/bin/bash

# Specify the output path relative to the script location or an absolute path
outputFile="./app/src/environments/environment.development.ts"

# Check if the target directory exists, create it if it doesn't
if [ ! -d "$(dirname "$outputFile")" ]; then
  mkdir -p "$(dirname "$outputFile")"
fi

# Initialize a variable to hold the JSON string
json="export const environment ={"

# Define the keys you want to include
include_keys=("NODE_ENV" "DATABASE_URI" "APP_ID" "MASTER_KEY" "SERVER_URL")

# Read the .env file
while IFS= read -r line || [[ -n "$line" ]]; do
    # Skip empty lines and lines starting with # (comments)
    if [ -z "$line" ] || [[ $line = \#* ]]; then
        continue
    fi
    
    # Extract key and value from the line
    key=$(echo $line | cut -d '=' -f 1)
    
    # Check if the key is one of the ones we want to include
    if printf '%s\n' "${include_keys[@]}" | grep -q "^$key$"; then
        value=$(echo $line | cut -d '=' -f 2-)
        
        # Append the key-value pair to the JSON string, with proper escaping of existing quotes
        json+="\"$key\":\"$(echo $value | sed 's/"/\\"/g')\","
    fi
done < "${1:-.env}" # Default to reading .env file, but allow for other files as an argument

# Remove the trailing comma and close the JSON string
json="${json%,}}"

# Output the JSON string to the specified output file
echo $json > $outputFile

# Optional: Echo the path of the generated JSON file
echo "Generated JSON file: $outputFile"
