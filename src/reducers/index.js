import { combineReducers } from 'redux';
import MarketReducer from './reducer_market';
import CurrentUserReducer from './reducer_current_user';
import CurrentCompanyReducer from './reducer_current_company';
import CurrentPurchaseReducer from './reducer_current_purchase';

const rootReducer = combineReducers({
  market: MarketReducer,
  currentUser: CurrentUserReducer,
  currentCompany: CurrentCompanyReducer,
  currentPurchase: CurrentPurchaseReducer
});

export default rootReducer;
