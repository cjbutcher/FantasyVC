import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCompanies, updateCompanies, selectCompany } from '../actions/index';
import ActionCable from 'react-native-actioncable'
import LoadingContainer from 'react-native-loading-container';

const cable = ActionCable.createConsumer('ws://216bb1ff.ngrok.io/cable')

class CompaniesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null
    }

    this.renderRow = this.renderRow.bind(this);
    this.renderCompany = this.renderCompany.bind(this);

    this._loadInitialDataAsync = this._loadInitialDataAsync.bind(this);
    this._onReadyAsync = this._onReadyAsync.bind(this);
  }

  componentDidMount() {
    var parent = this;
    this.subscription = cable.subscriptions.create('PriceListsChannel', {
      received(data) {
        parent.props.updateCompanies(data);
      }
    });
  }

  renderCompany(pos_in_array) {
    this.props.selectCompany(pos_in_array);
    Actions.companiesShow();
  }

  renderRow(company) {
    var pos_in_array = this.props.companies.findIndex(x => x == company);
    return(
      <TouchableHighlight onPress={() => this.renderCompany(pos_in_array)}>
        <View style={styles.row}>
          <Text style={styles.text}>{company.name}</Text>
          <Text style={styles.text}>{company.price}</Text>
          <Text style={styles.text}>{this.sharesOwned(company.id)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  sharesOwned(companyID) {
    return this.props.currentUser.portfolio[companyID]
  }

  renderList() {
    if (!this.props.companies) {
      return;
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.container}>
        <ListView
          dataSource={ds.cloneWithRows(this.props.companies)}
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
    return this.props.fetchCompanies();
  }

  async _onReadyAsync(data) {
    return;
  }

};

function mapStateToProps(state) {
  return {
    companies: state.companies,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCompanies, updateCompanies, selectCompany }, dispatch);
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  text: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);
