import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGuestUser } from '../actions/index';
var styles = require('../styles/main').styles();

var Button = require('../components/common/button');

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.continueAsGuest = this.continueAsGuest.bind(this);
  }

  continueAsGuest() {
    this.props.createGuestUser().then(() => {
      return Actions.index();
    });
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <Button buttonStyle={[styles.button, styles.blueButton]} buttonTextStyle={styles.buttonText} text={'Sign In'} />
        <Button buttonStyle={[styles.button, styles.blueButton]} buttonTextStyle={styles.buttonText} text={'Continue as Guest'} onPress={this.continueAsGuest} />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createGuestUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
