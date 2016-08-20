import { combineReducers } from 'redux';
import CompaniesReducer from './reducer_companies';
import CurrentCompanyReducer from './reducer_current_company';


const rootReducer = combineReducers({
  companies: CompaniesReducer,
  currentCompany: CurrentCompanyReducer
});

export default rootReducer;
