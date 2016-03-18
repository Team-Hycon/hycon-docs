import React from 'react';
import remarkHTML from 'remark-html';
import remarkHighlight from '../highlight';
import PureRenderMixin from 'react-pure-render/mixin';
import { postHighlight } from '../../custom';

function renderHighlighted(nodes, parser) {
  return {
    __html: postHighlight(parser
      .use(remarkHTML)
      .stringify(parser.use(remarkHighlight).run({
        type: 'root',
        children: nodes
      })))
  };
}

var Section = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    chunk: React.PropTypes.object.isRequired,
    leftClassname: React.PropTypes.string.isRequired,
    rightClassname: React.PropTypes.string.isRequired,
    parser: React.PropTypes.object.isRequired
  },
  render() {
    let { chunk, leftClassname, rightClassname } = this.props;
    let { left, right, preview } = chunk;
    return (<div
      data-title={chunk.title}
      className={`keyline-top section contain clearfix ${preview ? 'preview' : ''}`}>
      <div
        className={leftClassname}
        dangerouslySetInnerHTML={renderHighlighted(left, this.props.parser)} />
      {right.length > 0 && <div
        className={rightClassname}
        dangerouslySetInnerHTML={renderHighlighted(right, this.props.parser)} />}
    </div>);
  }
});

module.exports = Section;
