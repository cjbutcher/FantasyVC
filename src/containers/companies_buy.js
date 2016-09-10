import React, {
  Component
} from 'react';
import {
  View,
  Slider,
  Text
} from 'react-native'
var Button = require('../components/common/button');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { purchase } from '../actions/index';
var styles = require('../styles/main').styles();

class CompaniesBuy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfShares: 0
    }
    this.purchase = this.purchase.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.currentCompany().name}</Text>
        <Slider
          maximumValue={this.maxNumberOfShares()}
          step={1}
          onValueChange={(numberOfShares) => this.setState({numberOfShares: numberOfShares})} />
        <Text style={styles.text}>{'Number of shares: ' + this.state.numberOfShares}</Text>
        <Text style={styles.text}>{'Percentage of cash: ' + this.percentageOfCash()}</Text>
        <Text style={styles.text}>{'Cost: ' + this.cost()}</Text>
        <Button buttonStyle={[styles.button, styles.blueButton]} buttonTextStyle={styles.buttonText} text={'Buy!'} onPress={this.purchase} />
      </View>
    )
  }

  purchase() {
    Actions.index({type: "reset"});
    this.props.purchase(this.props.currentUser, this.currentCompany(), this.state.numberOfShares);
  }

  currentCompany() {
    return this.props.market.companies[this.props.currentCompany]
  }

  cost() {
    return (this.state.numberOfShares * this.currentCompany().price)
  }

  percentageOfCash() {
    return (this.cost() / this.props.currentUser.cash) * 100
  }

  maxNumberOfShares() {
    cash = this.props.currentUser.cash
    price_per_share = this.currentCompany().price;
    return (cash / price_per_share)
  }
}

function mapStateToProps(state) {
  return {
    market: state.market,
    currentCompany: state.currentCompany,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ purchase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesBuy);
