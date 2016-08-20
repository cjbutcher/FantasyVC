import React, {
  Component
} from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoadingContainer from 'react-native-loading-container';

var CompaniesIndex = require('../components/companies_index');
var CompaniesShow = require('../components/companies_show');
var Welcome = require('./welcome').default;

import { loadCurrentUser } from '../actions/index';

var ROUTES = {
  companiesIndex: CompaniesIndex,
  companiesShow: CompaniesShow,
  welcome: Welcome
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRoute: null
    }

    this._loadInitialDataAsync = this._loadInitialDataAsync.bind(this);
    this._onReadyAsync = this._onReadyAsync.bind(this);
    this.renderNavigator = this.renderNavigator.bind(this);
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  async _loadInitialDataAsync() {
    var route;
    await this.props.loadCurrentUser();
    if (this.props.currentUser) {
      route = 'companiesIndex'
    } else {
      route = 'welcome'
    }
    return { name: route }
  }

  async _onReadyAsync(route) {
    return new Promise((resolve) => {
      this.setState({
        initialRoute: route
      }, resolve);
    });
  }

  renderNavigator() {
    if (!this.state.initialRoute) {
      return;
    }
    return (
      <Navigator style={styles.container}
                 initialRoute={this.state.initialRoute}
                 renderScene={this.renderScene}
                 configureScene={ () => {return Navigator.SceneConfigs.FloatFromBottom;} } />
    );
  }

  render() {
    return(
      <LoadingContainer
        onLoadStartAsync={this._loadInitialDataAsync}
        onReadyAsync={this._onReadyAsync}>
        {this.renderNavigator()}
      </LoadingContainer>
    )
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
