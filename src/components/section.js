import React from 'react';
import remark from 'remark';
import remarkHTML from 'remark-html';
import remarkHighlight from 'remark-highlight.js';
import PureRenderMixin from 'react-pure-render/mixin';
import { postHighlight } from '../../custom';

function renderHighlighted(nodes) {
  return {
    __html: postHighlight(remark()
      .use(remarkHTML)
      .stringify(remark().use(remarkHighlight).run({
        type: 'root',
        children: nodes
      })))
  };
}

var Section = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    chunk: React.PropTypes.object.isRequired
  },
  render() {
    let { chunk } = this.props;
    let { left, right, preview } = chunk;
    return (<div
      data-title={chunk.title}
      className={`keyline-top section contain clearfix ${preview ? 'preview' : ''}`}>
      <div
        className='space-bottom8 col6 pad2x prose clip'
        dangerouslySetInnerHTML={renderHighlighted(left)} />
      {right.length > 0 && <div
        className='space-bottom4 col6 pad2 prose clip fill-light space-top5'
        dangerouslySetInnerHTML={renderHighlighted(right)} />}
    </div>);
  }
});

module.exports = Section;
