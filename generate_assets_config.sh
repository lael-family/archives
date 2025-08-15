#!/bin/bash

OUTPUT_FILE="assets.config.json"
FOLDERS=("books" "guides" "images") # Folders to include

echo "{" >"$OUTPUT_FILE"

first_folder=true
for folder_name in "${FOLDERS[@]}"; do
	folder_path="$folder_name"

	# Skip if folder doesn't exist
	[ ! -d "$folder_path" ] && continue

	# Add comma between JSON keys if not the first
	if [ "$first_folder" = true ]; then
		first_folder=false
	else
		echo "," >>"$OUTPUT_FILE"
	fi

	echo "    \"$folder_name\": [" >>"$OUTPUT_FILE"

	first_file=true
	for file in "$folder_path"/*; do
		if [ -f "$file" ]; then
			file_name=$(basename "$file")
			file_url="$folder_name/$file_name"

			# Format the display name: remove extension, replace '-' with spaces, capitalize each word
			display_name=$(echo "${file_name%.*}" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}}1')

			# Add comma between file objects if not the first
			if [ "$first_file" = true ]; then
				first_file=false
			else
				echo "," >>"$OUTPUT_FILE"
			fi

			echo "        { \"name\": \"$display_name\", \"url\": \"$file_url\" }" >>"$OUTPUT_FILE"
		fi
	done

	echo -n "    ]" >>"$OUTPUT_FILE"
done

echo "" >>"$OUTPUT_FILE"
echo "}" >>"$OUTPUT_FILE"

echo "Generated $OUTPUT_FILE"
