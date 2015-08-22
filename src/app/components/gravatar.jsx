import React from 'react';
import md5 from 'md5';
import isRetina from 'is-retina';
import querystring from 'querystring';

export default class Gravatar extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    let base, query, src;
    let props = {};
    if (this.props.onClick)
      props.onClick = this.props.onClick;
    base = this.props.https ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
    query = querystring.stringify({
      s: isRetina() ? this.props.s * 2 : this.props.s,
      d: this.props.d,
    });
    src = base + md5(this.props.email) + "?" + query;
    return (
      <div>
        { this.props.d === 'blank' && this.props.fallBack &&
          React.cloneElement(this.props.fallBack, {})
        }
        <img {...props} src={src} className={'gravatar ' + this.props.className} height={this.props.s} width={this.props.s} />
      </div>
    )
  }

};

Gravatar.defaultProps = {
  s: 50,
  r: 'g',
  https: false,
  d: 'blank',
  className: '',
};

Gravatar.propTypes = {
  s: React.PropTypes.number,
  r: React.PropTypes.string,
  https: React.PropTypes.bool,
  d: React.PropTypes.string,
  email: React.PropTypes.string.isRequired,
  fallBack: React.PropTypes.element,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
}