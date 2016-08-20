import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
var Button = require('./button');

module.exports = class TitleBar extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigator.pop();
  }

   render() {
     return (
       <Button text={'<-'} onPress={this.goBack} />
     )
   }
}

var styles = StyleSheet.create({

});
