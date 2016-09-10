import React, {
  Component
} from 'react';
import {
  Text,
  TouchableHighlight
} from 'react-native';

module.exports = class Button extends Component {
  render() {
    return(
      <TouchableHighlight style={this.props.buttonStyle} underlayColor={'grey'} onPress={this.props.onPress}>
        <Text style={this.props.buttonTextStyle}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
};
