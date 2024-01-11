const sourceMap = require('source-map');
const fs = require('fs');
const chalk = require('chalk');

const args = process.argv.slice(2);
const line = parseInt(args[0]);
const column = parseInt(args[1]);

console.log();

console.log(chalk.blue.bold('🔍 WELCOME TO THE REACT NATIVE STACK TRACER 🔍'), '\n');

console.log(chalk.green.bold('Finding original position for:'));
console.log(chalk.yellow(`- Line: ${line}`));
console.log(chalk.yellow(`- Column: ${column}`), '\n');

const sourcemap = JSON.parse(fs.readFileSync('sourcemap.js', 'utf8'));

const smc = new sourceMap.SourceMapConsumer(sourcemap);
const originalPosition = smc.originalPositionFor({
  line,
  column,
});

console.log(chalk.green.bold('Here is the original position of the stack:'));
console.log(chalk.magenta(`- Source file: ${originalPosition.source}`));
console.log(chalk.magenta(`- Line: ${originalPosition.line}`));
console.log(chalk.magenta(`- Column: ${originalPosition.column}`));
console.log(chalk.magenta(`- Function: ${originalPosition.name || 'N/A'}`));
