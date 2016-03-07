import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/app';
import remark from 'remark';
import slug from 'remark-slug';
import content from '../custom/content';
import fs from 'fs';

var ast = remark()
  .use(slug)
  .run(remark().parse(content));

var template = fs.readFileSync('./index.html', 'utf8');

var target = process.argv[2];

fs.writeFileSync(target,
  template.replace('APP',
  ReactDOMServer.renderToString(
    <App ast={ast} content={content} />)));
