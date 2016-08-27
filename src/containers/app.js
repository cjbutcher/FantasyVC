import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { Router, Scene, TabBar } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoadingContainer from 'react-native-loading-container';

var CompaniesIndex = require('../components/companies_index');
var CompaniesShow = require('../containers/companies_show').default;
var CompaniesBuy = require('../components/companies_buy');
var Welcome = require('./welcome').default;
var Account = require('./account').default;

var Dummy = require('../components/dummy');

const RouterWithRedux = connect()(Router);

import { loadCurrentUser } from '../actions/index';

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
  }
}

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
      route = 'index'
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
          <Scene key="index" initial={this.state.initialRoute == 'index'} tabs={true} >
            <Scene key="companiesIndex" component={CompaniesIndex} title="Market" icon={TabIcon}/>
            <Scene key="account" component={Account} title="Account" icon={TabIcon}/>
          </Scene>
          <Scene key="companiesShow" component={CompaniesShow} title="Companies#Show" />
          <Scene key="companiesBuy" component={CompaniesBuy} title="Companies#Buy" />
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
