import React, {
  Component
} from 'react';
import {
  View,
  Slider,
  Text,
  StyleSheet
} from 'react-native'
var Button = require('../components/common/button');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { purchase } from '../actions/index';


class TransactionSlider extends Component {

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
        <Text>{'Number of shares: ' + this.state.numberOfShares}</Text>
        <Text>{'Percentage of cash: ' + this.percentageOfCash()}</Text>
        <Text>{'Cost: ' + this.cost()}</Text>
        <Button text={'Buy!'} onPress={this.purchase} />
      </View>
    )
  }

  purchase() {
    this.props.purchase(this.props.currentUser, this.currentCompany(), this.state.numberOfShares).then(() => {
      Actions.index();
    });
  }

  currentCompany() {
    return this.props.companies[this.props.currentCompany]
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
    companies: state.companies,
    currentCompany: state.currentCompany,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ purchase }, dispatch);
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSlider);
