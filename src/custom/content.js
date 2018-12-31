var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports = 
  [
    '# Topics\n' +
    fs.readFileSync('./content/v1/introduction.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v1/api_requests.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v1/api_responses.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v1/network.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v1/node.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v1/reference.md', 'utf8') + '\n',
    '# Topics\n' +
    fs.readFileSync('./content/v3/introduction.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v3/api_requests.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v3/api_responses.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v3/address.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v3/block.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v3/network.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v3/tx.md', 'utf8') + '\n' +
    fs.readFileSync('./content/v3/reference.md', 'utf8') + '\n'
  ]
