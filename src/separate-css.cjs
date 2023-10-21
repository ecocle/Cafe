const fs = require('fs');
const path = require('path');

const cssDirectory = path.resolve(__dirname, '../dist/assets');
const criticalDirectory = path.resolve(__dirname, '../dist/assets/critical');
const nonCriticalDirectory = path.resolve(__dirname, '../dist/assets/non-critical');

if (!fs.existsSync(criticalDirectory)) {
  fs.mkdirSync(criticalDirectory, { recursive: true });
}

if (!fs.existsSync(nonCriticalDirectory)) {
  fs.mkdirSync(nonCriticalDirectory, { recursive: true });
}

const cssFiles = fs.readdirSync(cssDirectory).filter(file => file.endsWith('.css'));

cssFiles.forEach(cssFile => {
  const filePath = path.join(cssDirectory, cssFile);
  const sourceCss = fs.readFileSync(filePath, 'utf8');

  console.log(`Processing ${cssFile}`);  // Log the file being processed

  const criticalStyles = sourceCss.match(/\.critical[^{]*{[^}]*}/g) || [];
  const nonCriticalStyles = sourceCss.match(/^(?!.*\.critical)[^{]*{[^}]*}/gm) || [];

  console.log(`Critical Styles: ${criticalStyles.length}`);  // Log the number of critical styles found

  fs.writeFileSync(path.join(criticalDirectory, 'critical.css'), criticalStyles.join('\n'), 'utf8');
  fs.writeFileSync(path.join(nonCriticalDirectory, 'non-critical.css'), nonCriticalStyles.join('\n'), 'utf8');
});
