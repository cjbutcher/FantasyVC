import React, {
  Component
} from 'react';
import {
  StyleSheet
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoadingContainer from 'react-native-loading-container';

var CompaniesIndex = require('../components/companies_index');
var CompaniesShow = require('../components/companies_show');
var Welcome = require('./welcome').default;

const RouterWithRedux = connect()(Router);

import { loadCurrentUser } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRoute: null
    }

    this._loadInitialDataAsync = this._loadInitialDataAsync.bind(this);
    this._onReadyAsync = this._onReadyAsync.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
  }

  async _loadInitialDataAsync() {
    var route;
    await this.props.loadCurrentUser();
    if (this.props.currentUser) {
      console.log('the current user is: ', this.props.currentUser);
      route = 'companiesIndex'
    } else {
      route = 'welcome'
    }
    return route
  }

  async _onReadyAsync(route) {
    return new Promise((resolve) => {
      this.setState({
        initialRoute: route
      }, resolve);
    });
  }

  renderRouter() {
    if (!this.state.initialRoute) {
      return;
    }
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key="welcome" component={Welcome} title="Welcome" initial={this.state.initialRoute == 'welcome'} />
          <Scene key="companiesIndex" component={CompaniesIndex} title="Companies#Index" initial={this.state.initialRoute == 'companiesIndex'} />
          <Scene key="companiesShow" component={CompaniesShow} title="Companies#Show" />
        </Scene>
      </RouterWithRedux>
    );
  }

  render() {
    return(
      <LoadingContainer
        onLoadStartAsync={this._loadInitialDataAsync}
        onReadyAsync={this._onReadyAsync}>
        {this.renderRouter()}
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
