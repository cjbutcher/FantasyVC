import React, {
  Component
} from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

var CompaniesIndex = require('./components/companies_index');

const rootReducer = require('./reducers/index').default;
const store = createStore(rootReducer)

var ROUTES = {
  companiesIndex: CompaniesIndex
}

module.exports = class CompaniesIndex extends Component {
  constructor() {
    super();
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return(
      <Provider store={store}>
        <Navigator style={styles.container}
                   initialRoute={{name: 'companiesIndex'}}
                   renderScene={this.renderScene}
                   configureScene={ () => {return Navigator.SceneConfigs.FloatFromBottom;} } />
      </Provider>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
