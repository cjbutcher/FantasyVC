import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native'
import { Actions } from 'react-native-router-flux';
var Button = require('../components/common/button');
import { connect } from 'react-redux';
var styles = require('../styles/main').styles();

class CompaniesShow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerWithGroupedButtons}>
          <Text style={styles.text}>{this.props.market.companies[this.props.currentCompany].name}</Text>
          <Text style={styles.text}>{this.props.market.companies[this.props.currentCompany].price}</Text>
        </View>
        <View style={styles.groupedButtonsContainer}>
          <Button buttonStyle={[styles.button, styles.orangeButton]} buttonTextStyle={styles.buttonText} text='Sell' onPress={Actions.companyPurchases} />
          <Button buttonStyle={[styles.button, styles.blueButton]} buttonTextStyle={styles.buttonText} text='Buy' onPress={Actions.companiesBuy} />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    market: state.market,
    currentCompany: state.currentCompany
  };
}

export default connect(mapStateToProps, null)(CompaniesShow);
