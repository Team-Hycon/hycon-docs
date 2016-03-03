import React from 'react';
import Section from './section';
import PureRenderMixin from 'react-pure-render/mixin';
import GithubSlugger from 'github-slugger';
let slugger = new GithubSlugger();
let slug = title => { slugger.reset(); return slugger.slug(title); };

function highlightTokens(str) {
  return str.replace(/{[\w_]+}/g,
    (str) => '<span class="strong">' + str + '</span>')
  .replace(
    /{@2x}/g,
    `<a title='Retina support: adding @2x to this URL will produce 2x scale images' href='#retina'>{@2x}</a>`);
}

function transformURL(node) {
  let { value } = node;
  let parts = value.split(/\s+/);
  if (parts.length === 3) {
    return {
      type: 'html',
      value: `<div class='endpoint'>
        <div class='round-left pad0y pad1x fill-lighten0 code micro endpoint-method'>${parts[0]}</div>
        <div class='fill-darken1 pad0 code micro endpoint-url'>${highlightTokens(parts[1])}</div>
        <div class='endpoint-token contain fill-lighten0 pad0x round-topright'>
          <span class='pad0 micro code'>${parts[2]}</span>
          <a href='#access-tokens' class='center endpoint-scope space-top3 micro pad1x pin-top fill-lighten1 round-bottom'>
            Token scope
          </a>
        </div>
      </div>`
    };
  } else {
    return {
      type: 'html',
      value: `<div class='endpoint'>
        <div class='round-left pad0y pad1x fill-lighten0 code small endpoint-method'>${parts[0]}</div>
        <div class='fill-darken1 pad0 code small endpoint-url'>${highlightTokens(parts[1])}</div>
      </div>`
    };
  }
}

function chunkifyAST(ast, language) {
  var preview = false;
  return ast.children.reduce((chunks, node) => {
    if (node.type === 'heading' && node.depth === 1) {
      return chunks;
    } else if (node.type === 'heading' && node.depth < 4) {
      chunks.push([node]);
    } else {
      chunks[chunks.length - 1].push(node);
    }
    return chunks;
  }, [[]]).filter(chunk => chunk.length)
  .map(chunk => {
    var left = [], right = [], title;
    if (language === 'cli') {
      language = 'bash';
    }
    if (chunk[0].depth < 3) {
      preview = false;
    }
    chunk.forEach(node => {
      if (node.type === 'code') {
        if (node.lang === 'json' || node.lang === 'http' || node.lang === 'html') {
          right.push(node);
        } else if (node.lang === language) {
          if (language === 'curl') {
            right.push({ ...node, lang: 'bash'  });
          } else {
            right.push(node);
          }
        } else if (node.lang === 'endpoint') {
          right.push(transformURL(node));
        }
      } else if (node.type === 'heading' && node.depth >= 4) {
        right.push(node);
      } else if (node.type === 'blockquote') {
        right.push(node);
      } else if (node.type === 'heading' && node.depth < 4 && !title) {
        title = node.children[0].value;
        left.push(node);
      } else if (node.type === 'html') {
        if (node.value.indexOf('<!--') === 0) {
          var content = node.value
            .replace(/^<!--/, '')
            .replace(/-->$/, '')
            .trim();
          if (content === 'preview') {
            preview = true;
          }
        }
      } else {
        left.push(node);
      }
    });
    return { left, right, title, preview, slug: slug(title) };
  });
}

var Content = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    ast: React.PropTypes.object.isRequired,
    language: React.PropTypes.string.isRequired
  },
  render() {
    return (<div className='clearfix'>
      {chunkifyAST(this.props.ast, this.props.language).map((chunk, i) => <Section
        chunk={chunk}
        key={i} />)}
    </div>);
  }
});

module.exports = Content;
