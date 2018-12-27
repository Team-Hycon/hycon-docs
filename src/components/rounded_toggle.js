import React from 'react';
import PropTypes from 'prop-types';

var roundedToggleOptionType = PropTypes.shape({
  title: PropTypes.string,
  value: PropTypes.string
});

export default class RoundedToggle extends React.PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(roundedToggleOptionType).isRequired,
    className: PropTypes.string,
    active: roundedToggleOptionType,
    short: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  }
  render() {
    let { options, active, className } = this.props;
    return (<div style={{ backgroundColor: "#e4e4e4" }} className={`rounded-toggle inline short ${className === undefined ? '' : className}`}>
      {options.map(option =>
        (<RoundedToggleOption
          key={option.value}
          option={option}
          short={this.props.short}
          onClick={this.props.onChange}
          className={`strong ${option.value === active.value ? 'active': ''}`} />))}
    </div>);
  }
}

class RoundedToggleOption extends React.PureComponent {
  static propTypes = {
    option: roundedToggleOptionType,
    className: PropTypes.string.isRequired,
    short: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }
  onClick = () => {
    this.props.onClick(this.props.option);
  }
  render() {
    let { className, option } = this.props;
    return (<a
      onClick={this.onClick}
      className={className}>{this.props.short ? option.short : option.title}</a>);
  }
}
