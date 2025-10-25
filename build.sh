#!/bin/bash

# Enhanced Portfolio Build Script
echo "🚀 Building Portfolio..."

# Create dist directory
mkdir -p dist

# Copy main files
echo "📂 Copying main files..."
cp index.html dist/
cp styles.css dist/
cp script.js dist/
cp README.md dist/

# Copy images
echo "🖼️  Copying images..."
cp -r images dist/

# Copy projects
echo "📁 Copying projects..."
cp -r projects dist/

# Optimize images (if imagemin is available)
if command -v imagemin &> /dev/null; then
    echo "🎨 Optimizing images..."
    imagemin dist/images/*.png --out-dir=dist/images/
    imagemin dist/images/*.jpg --out-dir=dist/images/
fi

# Generate sitemap
echo "🗺️  Generating sitemap..."
cat > dist/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://372lisa372-beep.github.io/my-portfolio/</loc>
    <lastmod>$(date -u +%Y-%m-%dT%H:%M:%SZ)</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://372lisa372-beep.github.io/my-portfolio/projects/mythic-quiz/</loc>
    <lastmod>$(date -u +%Y-%m-%dT%H:%M:%SZ)</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://372lisa372-beep.github.io/my-portfolio/projects/mood-mirror/</loc>
    <lastmod>$(date -u +%Y-%m-%dT%H:%M:%SZ)</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://372lisa372-beep.github.io/my-portfolio/projects/horoscope-navigation/</loc>
    <lastmod>$(date -u +%Y-%m-%dT%H:%M:%SZ)</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://372lisa372-beep.github.io/my-portfolio/projects/soul-elements-mood-cycle/</loc>
    <lastmod>$(date -u +%Y-%m-%dT%H:%M:%SZ)</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
EOF

# Generate robots.txt
echo "🤖 Creating robots.txt..."
cat > dist/robots.txt << EOF
User-agent: *
Allow: /

Sitemap: https://372lisa372-beep.github.io/my-portfolio/sitemap.xml
EOF

echo "✅ Build completed successfully!"
echo "📍 Files ready in dist/ directory"