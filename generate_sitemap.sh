#!/bin/bash

BASE_URL="https://archives.laelfamily.org"
OUTPUT_FILE="sitemap.xml"
TODAY=$(date +%F)

echo '<?xml version="1.0" encoding="UTF-8"?>' >"$OUTPUT_FILE"
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >>"$OUTPUT_FILE"

# Add homepage
cat <<EOT >>"$OUTPUT_FILE"
  <url>
    <loc>$BASE_URL/</loc>
    <lastmod>$TODAY</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
EOT

# Add each file in books, guides, images
find books guides images -type f | while read -r file; do
	echo "  <url>" >>"$OUTPUT_FILE"
	echo "    <loc>$BASE_URL/${file}</loc>" >>"$OUTPUT_FILE"
	echo "    <lastmod>$TODAY</lastmod>" >>"$OUTPUT_FILE"
	echo "    <changefreq>yearly</changefreq>" >>"$OUTPUT_FILE"
	echo "    <priority>0.6</priority>" >>"$OUTPUT_FILE"
	echo "  </url>" >>"$OUTPUT_FILE"
done

echo '</urlset>' >>"$OUTPUT_FILE"

echo "Generated $OUTPUT_FILE"
