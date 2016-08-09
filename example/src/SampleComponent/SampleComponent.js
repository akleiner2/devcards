import React, { PropTypes, Component } from 'react';

export default class SampleComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;

    return (
      <div className="sample"> {text} </div>
    );
  }
}

SampleComponent.propTypes = {
  text: PropTypes.string.isRequired
};
