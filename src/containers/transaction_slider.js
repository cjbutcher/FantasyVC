import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
var Button = require('../components/common/button');
import { connect } from 'react-redux';

class TransactionSlider extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>'This is the transaction slider page'</Text>
        <Text style={styles.text}>{this.props.companies[this.props.currentCompany].name}</Text>
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

export default connect(mapStateToProps, null)(TransactionSlider);
