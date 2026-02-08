const fs = require('fs');
const path = require('path');

const dirs = [
    'src/pages/admin',
    'src/layouts/admin',
    'src/components/admin'
];

function removeBom(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        // Check for UTF-8 BOM (EF BB BF)
        if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
            console.log(`BOM found in ${filePath}. Removing...`);
            const newBuffer = buffer.subarray(3);
            fs.writeFileSync(filePath, newBuffer);
            console.log(`✅ Fixed: ${filePath}`);
        } else {
            // Check if read as utf8 string has charCode 0xFEFF at start
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.charCodeAt(0) === 0xFEFF) {
                console.log(`BOM (0xFEFF) found in ${filePath}. Removing...`);
                fs.writeFileSync(filePath, content.slice(1), 'utf8');
                console.log(`✅ Fixed: ${filePath}`);
            } else {
                console.log(`Checked ${filePath}: Clean`);
            }
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
    }
}

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            removeBom(filePath);
        }
    }
}

dirs.forEach(dir => {
    console.log(`Scanning ${dir}...`);
    walkDir(dir);
});
