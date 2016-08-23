import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

module.exports = class Dummy extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>'This is a dummy page'</Text>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  }
})
