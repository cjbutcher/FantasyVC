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

class CompaniesShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current_company: this.props.pos_in_array
    }
  }

   render() {
     return (
       <View style={styles.container}>
        <Text style={styles.text}>{this.props.companies[this.state.current_company].name}</Text>
        <Text style={styles.text}>{this.props.companies[this.state.current_company].price}</Text>
       </View>
     )
   }
}

function mapStateToProps(state) {
  return {
    companies: state.companies
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
