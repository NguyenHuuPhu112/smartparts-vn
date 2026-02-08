const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const dirs = [
    'src/pages/admin',
    'src/layouts/admin',
    'src/components/admin'
];

function removeBom(filePath) {
    try {
        const fullPath = path.join(baseDir, filePath);
        if (!fs.existsSync(fullPath)) return;

        const buffer = fs.readFileSync(fullPath);
        // Check for UTF-8 BOM (EF BB BF)
        if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
            console.log(`BOM found in ${filePath} (UTF-8 signature). Removing...`);
            const newBuffer = buffer.subarray(3);
            fs.writeFileSync(fullPath, newBuffer);
            console.log(`✅ Fixed: ${filePath}`);
        } else {
            // Check for potential string BOM (FEFF)
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.charCodeAt(0) === 0xFEFF) {
                console.log(`BOM (0xFEFF char) found in ${filePath}. Removing...`);
                fs.writeFileSync(fullPath, content.slice(1), 'utf8');
                console.log(`✅ Fixed: ${filePath}`);
            } else {
                // Double check specific hex sequences just in case
                if (content.startsWith('\uFEFF')) {
                    console.log(`BOM (unicode FEFF) found in ${filePath}. Removing...`);
                    fs.writeFileSync(fullPath, content.substring(1), 'utf8');
                    console.log(`✅ Fixed: ${filePath}`);
                } else {
                    // console.log(`Checked ${filePath}: Clean`);
                }
            }
        }

    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
    }
}

function walkDir(dir) {
    const fullDir = path.join(baseDir, dir);
    if (!fs.existsSync(fullDir)) return;

    // Explicit list to check all newly created files
    ['AdminOrders.tsx', 'AdminProducts.tsx', 'AdminDashboard.tsx', 'AdminCategories.tsx', 'AdminLogin.tsx', 'AdminSidebar.tsx', 'AdminLayout.tsx'].forEach(targetFile => {
        const targetPath = path.join(fullDir, targetFile);
        if (fs.existsSync(targetPath)) {
            removeBom(path.relative(baseDir, targetPath));
        }
    });

    const files = fs.readdirSync(fullDir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const fullPath = path.join(baseDir, filePath);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            removeBom(filePath);
        }
    }
}

console.log('--- Starting BOM Removal ---');
dirs.forEach(dir => {
    // walkDir(dir);
    // Let's just target the known files explicitly to be sure
    const knownFiles = [
        'src/pages/admin/AdminOrders.tsx',
        'src/pages/admin/AdminProducts.tsx',
        'src/pages/admin/AdminDashboard.tsx',
        'src/pages/admin/AdminCategories.tsx',
        'src/pages/admin/AdminLogin.tsx',
        'src/layouts/admin/AdminLayout.tsx',
        'src/components/admin/AdminSidebar.tsx'
    ];

    knownFiles.forEach(f => removeBom(f));
});
console.log('--- Finished BOM Removal ---');
