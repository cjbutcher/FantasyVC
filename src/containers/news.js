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
import { selectCompany } from '../actions/index';
import { convertIDToIndex, timeSince } from '../market';

class News extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderCompany = this.renderCompany.bind(this);
  }

  renderCompany(company_id) {
    var pos_in_array = convertIDToIndex(this.props.market.companies, company_id);
    this.props.selectCompany(pos_in_array);
    Actions.companiesShow();
  }

  renderRow(news) {
    return(
      <TouchableHighlight onPress={() => this.renderCompany(news.company_id)}>
        <View style={styles.row}>
          <Text style={styles.text}>{news.text}</Text>
          <Text style={styles.text}>{timeSince(news.created_at)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.container}>
        <ListView
          dataSource={ds.cloneWithRows(this.props.market.news)}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    market: state.market
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCompany }, dispatch);
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
