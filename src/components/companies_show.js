import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
var Button = require('./common/button');
var TitleBar = require('./common/title_bar');

module.exports = class CompaniesShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: this.props.data
    }
    this.renderCompaniesBuy = this.renderCompaniesBuy.bind(this);
    this.renderCompaniesSell = this.renderCompaniesSell.bind(this);
  }

  // renderCompaniesBuy() {
  //   this.props.navigator.push({ name: 'companiesBuy', data: this.state.company });
  // }
  //
  // renderCompaniesSell() {
  //   this.props.navigator.push({ name: 'companiesSell', data: this.state.company });
  // }

   render() {
     return (
       <View style={styles.container}>
        <TitleBar navigator={this.props.navigator} />
        <Text style={styles.text}>{this.state.company.name}</Text>
        //  <Button text={'Buy'} onPress={this.renderCompaniesBuy} />
        //  <Button text={'Sell'} onPress={this.renderCompaniesSell} />
       </View>
     )
   }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});
