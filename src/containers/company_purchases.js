import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPurchase } from '../actions/index';

class CompanyPurchases extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderPurchase = this.renderPurchase.bind(this);
  }

  renderPurchase(purchase) {
    this.props.selectPurchase(purchase);
    Actions.purchasesSell();
  }

  renderRow(purchase) {
    return(
      <TouchableHighlight onPress={() => this.renderPurchase(purchase)}>
        <View style={styles.row}>
          <Text style={styles.text}>{'Company: ' + this.currentCompany().name}</Text>
          <Text style={styles.text}>{'Current Price: ' + this.currentCompany().price}</Text>
          <Text style={styles.text}>{'Strike price: ' + purchase.price}</Text>
          <Text style={styles.text}>{'Total profit/loss: ' + this.possibleProfit(purchase)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  possibleProfit(purchase) {
    var total_cost = purchase.price * purchase.amount
    var total_revenue = this.currentCompany().price * purchase.amount
    return total_revenue - total_cost
  }

  currentCompany() {
    return this.props.companies[this.props.currentCompany]
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.container}>
        <ListView
          dataSource={ds.cloneWithRows(this.props.currentUser.portfolio[this.currentCompany().id])}
          renderRow={this.renderRow}
        />
      </View>
    )
  }

};

function mapStateToProps(state) {
  return {
    companies: state.companies,
    currentUser: state.currentUser,
    currentCompany: state.currentCompany
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectPurchase }, dispatch);
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  text: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPurchases);
