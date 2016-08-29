import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux';

class UserBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <Text style={styles.text}>{'Not signed in'}</Text>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.currentUser.username}</Text>
        <Text style={styles.text}>{this.props.currentUser.cash}</Text>
      </View>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ purchase }, dispatch);
}


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20
  }
});

export default connect(mapStateToProps, null)(UserBar);
