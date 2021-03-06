import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';
import { Router, Scene, TabBar } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
var styles = require('../styles/main').styles();

import LoadingContainer from 'react-native-loading-container';

var CompaniesIndex = require('../components/companies_index');
var CompaniesShow = require('../containers/companies_show').default;
var CompaniesBuy = require('../containers/companies_buy').default;
var CompanyPurchases = require('../containers/company_purchases').default;
var PurchasesSell = require('../containers/purchases_sell').default;
var Welcome = require('./welcome').default;
var Account = require('./account').default;
var News = require('../containers/news').default;

var UserBar = require('../containers/user_bar').default;

const RouterWithRedux = connect()(Router);

import { loadCurrentUser } from '../actions/index';

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? '#77DDFF' : 'white'}}>{this.props.title}</Text>
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
      <View style={styles.appContainer}>
        <View style={styles.scenes}>
          <RouterWithRedux navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>
            <Scene key="root">
              <Scene key="welcome" component={Welcome} title="Welcome" initial={this.state.initialRoute == 'welcome'} />
              <Scene key="index" type="replace" initial={this.state.initialRoute == 'index'} tabs={true} >
                <Scene key="companiesIndex" component={CompaniesIndex} title="Market" icon={TabIcon}/>
                <Scene key="news" component={News} title="News" icon={TabIcon}/>
                <Scene key="account" component={Account} title="Account" icon={TabIcon}/>
              </Scene>
              <Scene key="companiesShow" component={CompaniesShow} title="Companies#Show" />
              <Scene key="companiesBuy" component={CompaniesBuy} title="Companies#Buy" />
              <Scene key="companyPurchases" component={CompanyPurchases} title="Company#Purchases" />
              <Scene key="purchasesSell" component={PurchasesSell} title="Purchases#Sell" />
            </Scene>
          </RouterWithRedux>
        </View>
        <UserBar />
      </View>
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
