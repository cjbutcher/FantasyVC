import { combineReducers } from 'redux';
import CompaniesReducer from './reducer_companies';
import CurrentUserReducer from './reducer_current_user';
import CurrentCompanyReducer from './reducer_current_company';

const rootReducer = combineReducers({
  companies: CompaniesReducer,
  currentUser: CurrentUserReducer,
  currentCompany: CurrentCompanyReducer
});

export default rootReducer;
