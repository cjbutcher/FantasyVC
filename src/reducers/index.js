import { combineReducers } from 'redux';
import CompaniesReducer from './reducer_companies';
import CurrentUserReducer from './reducer_current_user';

const rootReducer = combineReducers({
  companies: CompaniesReducer,
  currentUser: CurrentUserReducer
});

export default rootReducer;
