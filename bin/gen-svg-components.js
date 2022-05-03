const fs = require('fs');
const path = require('path');

const generateSvgComponent = (src, destDir) => {
    const fileName = path.basename(src);
    const componentName = fileName.split(/[\.-]/).map((portion) => {
        return `${portion.slice(0, 1).toUpperCase()}${portion.slice(1)}`;
    }).join('');
    const destPath = path.join(destDir, `${componentName}.tsx`);
    if (fs.existsSync(destPath)) {
        return console.log(`skipped: ${destPath}`);
    }
    const srcSvg = fs.readFileSync(src).toString()
        .split('\n')
        .map((line) => {
            if (!line.startsWith('<svg')) {
                return line;
            }
            return line.replace(' xmlns:xlink="http://www.w3.org/1999/xlink"', '').replace('>', ' {...props}>');
        })
        .map((line) => {
            return `        ${line}`;
        })
        .filter((line) => {
            return line.length > 0;
        })
        .join('\n').trim();
    const destSvg = `
import React from 'react';

type SvgProps = React.SVGAttributes<HTMLOrSVGElement>;

export const ${componentName}: React.FC<SvgProps> = (props) => {
    return (
        ${srcSvg}
    );
};
    `.trim();
    fs.writeFileSync(destPath, destSvg);
}

const srcDir = './resources/svg';
const destDir = './src/components/images'
const files = fs.readdirSync(srcDir);
files.filter((file) => {
    return file.endsWith('.svg');
}).forEach((file) => {
    const src = path.join(srcDir, file);
    generateSvgComponent(src, destDir);
})
