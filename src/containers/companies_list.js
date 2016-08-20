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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCompany } from '../actions/index';

class CompaniesList extends Component {

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(company) {
    return(
      <TouchableHighlight onPress={() => this.props.selectCompany(company)}>
        <View style={styles.row}>
          <Text style={styles.text}>{company.name}</Text>
          <Text style={styles.text}>{company.price}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
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

};

function mapStateToProps(state) {
  return {
    companies: state.companies,
    currentCompany: state.currentCompany
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectCompany: selectCompany }, dispatch);
}

var styles = StyleSheet.create({
  container: {
    flex: 1
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
