import React, {
  Component
} from 'react';
import {
  Image,
  View,
  ListView,
  TouchableHighlight,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMarket, updateMarket, selectCompany } from '../actions/index';
import ActionCable from 'react-native-actioncable'
import LoadingContainer from 'react-native-loading-container';
import { sharesOwned } from '../portfolio';
var styles = require('../styles/main').styles();

const cable = ActionCable.createConsumer('ws://82c91f4d.ngrok.io/cable')

class CompaniesList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderCompany = this.renderCompany.bind(this);

    this._loadInitialDataAsync = this._loadInitialDataAsync.bind(this);
    this._onReadyAsync = this._onReadyAsync.bind(this);
  }

  componentDidMount() {
    var parent = this;
    this.subscription = cable.subscriptions.create('PriceListsChannel', {
      received(data) {
        parent.props.updateMarket(data);
      }
    });
  }

  renderCompany(pos_in_array) {
    this.props.selectCompany(pos_in_array);
    Actions.companiesShow();
  }

  renderRow(company) {
    var pos_in_array = this.props.market.companies.findIndex(x => x == company);
    return(
      <TouchableHighlight onPress={() => this.renderCompany(pos_in_array)}>
        <View style={styles.row}>
          <Image source={{uri: (company.logo ? company.logo : 'http://i.imgbox.com/BZQ7ogZX.png')}} style={styles.smallLogo}/>
          <Text style={styles.text}>{company.name}</Text>
          <Text style={styles.text}>{company.price}</Text>
          <Text style={this.selectColor(company.change)}>{this.formatChange(company.change)}</Text>
          <Text style={styles.text}>{sharesOwned(this.props.currentUser, company.id)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  selectColor(change) {
    if (!change.startsWith("-")) {
      return [styles.text, styles.greenText];
    }
    return [styles.text, styles.redText];
  }

  formatChange(change) {
    if (!change.startsWith("-")) {
      change = ('+' + change)
    }
    return change
  }

  renderList() {
    if (!this.props.market.companies) {
      return;
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.container}>
        <ListView
          dataSource={ds.cloneWithRows(this.props.market.companies)}
          renderRow={this.renderRow}
        />
      </View>
    )
  }

  render() {
    return (
      <LoadingContainer
        onLoadStartAsync={this._loadInitialDataAsync}
        onReadyAsync={this._onReadyAsync}>
        {this.renderList()}
      </LoadingContainer>
    );
  }

  async _loadInitialDataAsync() {
    return this.props.fetchMarket();
  }

  async _onReadyAsync(data) {
    return;
  }

};

function mapStateToProps(state) {
  return {
    market: state.market,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMarket, updateMarket, selectCompany }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);
