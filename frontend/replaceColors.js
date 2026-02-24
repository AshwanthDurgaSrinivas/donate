const fs = require('fs');
const path = require('path');

const replacements = [
    // Navy colors -> Dark Red/Black colors
    { search: /#020817/g, replace: '#0a0404' },
    { search: /#0a0f1e/g, replace: '#100606' },
    { search: /#0d1528/g, replace: '#160808' },
    { search: /#111d35/g, replace: '#1c0a0a' },
    { search: /#172141/g, replace: '#220c0c' },
    { search: /2, 8, 23/g, replace: '10, 4, 4' },

    // Primary blue -> Primary Red
    { search: /#3b82f6/g, replace: '#d32f2f' },
    { search: /59, 130, 246/g, replace: '211, 47, 47' },
    { search: /#1d4ed8/g, replace: '#b71c1c' },
    { search: /#60a5fa/g, replace: '#ff7b7b' },

    // Secondary/Accent blues/indigos -> Darker or brighter reds
    { search: /#6366f1/g, replace: '#ff4d4d' },
    { search: /99, 102, 241/g, replace: '255, 77, 77' },
    { search: /#818cf8/g, replace: '#ff4d4d' },
    { search: /129, 140, 248/g, replace: '255, 77, 77' },

    // Cyans -> another red/warm color
    { search: /#22d3ee/g, replace: '#ff8585' },
    { search: /34, 211, 238/g, replace: '255, 133, 133' },

    // Pink/Gold can stay as they are warm colors, or maybe tweak them
    // Pink: #f472b6
    // Gold: #fbbf24

    // Also replace text glowing classes and arbitrary Tailwind classes if any
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    replacements.forEach(({ search, replace }) => {
        content = content.replace(search, replace);
    });

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

console.log('Color replacement complete.');
