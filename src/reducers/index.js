import { combineReducers } from 'redux';
import CompaniesReducer from './reducer_companies';
import CurrentCompanyReducer from './reducer_current_company';
import CurrentUserReducer from './reducer_current_user';

const rootReducer = combineReducers({
  companies: CompaniesReducer,
  currentCompany: CurrentCompanyReducer,
  currentUser: CurrentUserReducer
});

export default rootReducer;
