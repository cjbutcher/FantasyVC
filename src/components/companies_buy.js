import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

var TransactionSlider = require('../containers/transaction_slider').default;

module.exports = class CompaniesBuy extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>'This is the companies buy page'</Text>
        <TransactionSlider />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});
