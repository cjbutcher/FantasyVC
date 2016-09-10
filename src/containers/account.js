import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { signOutUser } from '../actions/index';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
var styles = require('../styles/main').styles();

var Button = require('../components/common/button');

class Account extends Component {
  constructor() {
    super();

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signOutUser().then(() => {
      return Actions.welcome({type: 'reset'});
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Button buttonStyle={[styles.button, styles.blueButton]} buttonTextStyle={styles.buttonText} text={'Sign Out'} onPress={this.signOut} />
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signOutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
