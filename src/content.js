var fs = require('fs');

module.exports =
  '# Introduction\n' +
  fs.readFileSync('./content/introduction.md', 'utf8') + '\n' +
  '# Example\n' +
  fs.readFileSync('./content/example.md', 'utf8') + '\n';
