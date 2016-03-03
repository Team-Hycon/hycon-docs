import React from 'react';
import remark from 'remark';
import remarkHTML from 'remark-html';
import remarkHighlight from 'remark-highlight.js';
import Waypoint from 'react-waypoint';
import PureRenderMixin from 'react-pure-render/mixin';

function renderHighlighted(nodes) {
  return {
    __html: remark()
    .use(remarkHTML)
    .stringify(remark().use(remarkHighlight).run({
      type: 'root',
      children: nodes
    }))
    .replace(
      /<span class="hljs-string">"{timestamp}"<\/span>/g,
      `<span class="hljs-string">"</span><a class='hljs-linked' href='#dates'>{timestamp}</a><span class="hljs-string">"</span>`)
  };
}

var Section = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    chunk: React.PropTypes.object.isRequired,
    onSpy: React.PropTypes.func.isRequired
  },
  waypointEnterFromAbove(e, direction) {
    if (direction === 'above') {
      this.props.onSpy(this.props.chunk.title);
    }
  },
  waypointEnterFromBelow(e, direction) {
    if (direction === 'below') {
      this.props.onSpy(this.props.chunk.title);
    }
  },
  render() {
    let { chunk } = this.props;
    let { left, right, preview } = chunk;
    return (<div className={`contain clearfix ${preview ? 'preview' : ''}`}>
      <Waypoint onEnter={this.waypointEnterFromBelow} />
      <div
        className='col6 pad2x prose clip'
        dangerouslySetInnerHTML={renderHighlighted(left)} />
      {(right.length > 0) && <div
        className='col6 pad2 prose dark space-top5 clip keyline-top fill-dark'
        dangerouslySetInnerHTML={renderHighlighted(right)} />}
      <div className='pin-bottom'>
        <Waypoint onEnter={this.waypointEnterFromAbove} />
      </div>
    </div>);
  }
});

module.exports = Section;
