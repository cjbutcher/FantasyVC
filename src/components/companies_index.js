import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

var CompaniesList = require('../containers/companies_list').default;

module.exports = class CompaniesIndex extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <View style={styles.container}>
        <CompaniesList />
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
