import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux';
var Button = require('../components/common/button');
import { connect } from 'react-redux';

class CompaniesShow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.companies[this.props.currentCompany].name}</Text>
        <Text style={styles.text}>{this.props.companies[this.props.currentCompany].price}</Text>
        <Button text='Buy' onPress={Actions.companiesBuy} />
        <Button text='Sell' onPress={Actions.companyPurchases} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    companies: state.companies,
    currentCompany: state.currentCompany
  };
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

export default connect(mapStateToProps, null)(CompaniesShow);
