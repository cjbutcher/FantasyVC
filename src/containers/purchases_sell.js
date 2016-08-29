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
import { sell } from '../actions/index';

class PurchasesSell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfShares: 0
    }
    this.sell = this.sell.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.currentCompany().name}</Text>
        <Slider
          maximumValue={this.props.currentPurchase.remaining}
          step={1}
          onValueChange={(numberOfShares) => this.setState({numberOfShares: numberOfShares})} />
        <Text>{'Number of shares: ' + this.state.numberOfShares}</Text>
        <Text>{'Revenue: ' + this.revenue()}</Text>
        <Text>{'Profit/Loss: ' + this.profit()}</Text>
        <Button text={'Sell!'} onPress={this.sell} />
      </View>
    )
  }

  revenue() {
    return (this.currentCompany().price * this.state.numberOfShares)
  }

  sell() {
    Actions.index({type: "reset"});
    this.props.sell(this.props.currentUser, this.props.currentPurchase, this.currentCompany(), this.state.numberOfShares);
  }

  currentCompany() {
    return this.props.companies[this.props.currentCompany]
  }

  profit() {
    var total_cost = (this.props.currentPurchase.price * this.state.numberOfShares)
    var total_revenue = (this.currentCompany().price *  this.state.numberOfShares)
    return total_revenue - total_cost
  }

}

function mapStateToProps(state) {
  return {
    companies: state.companies,
    currentCompany: state.currentCompany,
    currentUser: state.currentUser,
    currentPurchase: state.currentPurchase
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sell }, dispatch);
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

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesSell);