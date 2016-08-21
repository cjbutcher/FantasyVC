import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
var Button = require('./common/button');

module.exports = class CompaniesShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: this.props.data
    }
  }

   render() {
     return (
       <View style={styles.container}>
        <Text style={styles.text}>This is the companies show page</Text>
       </View>
     )
   }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});
