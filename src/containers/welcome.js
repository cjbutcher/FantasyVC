import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGuestUser } from '../actions/index';

var Button = require('../components/common/button');

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.continueAsGuest = this.continueAsGuest.bind(this);
  }

  continueAsGuest() {
    this.props.createGuestUser().then(() => {
      this.props.navigator.resetTo({ name: 'companiesIndex' });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text={'Sign In'} />
        <Button text={'Continue as Guest'} onPress={this.continueAsGuest} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
