var User = require('../user');
var Backend = require('../backend');

function updateMarket(companies) {
  return {
    type: 'MARKET_LOADED',
    payload: companies
  };
}

function fetchMarket() {
  var market = Backend.priceIndex().then((index) => {
    return index;
  });
  return {
    type: 'MARKET_LOADED',
    payload: market
  };
}

function loadCurrentUser() {
  var currentUser = User.currentUser();
  return {
    type: 'USER_LOADED',
    payload: currentUser
  };
}

function createGuestUser() {
  var new_user = Backend.createUser().then((user) => {
    return User.setCurrentUser(user).then(() => {
      return User.currentUser().then((user) => {
        return user
      });
    });
  });
  return {
    type: 'USER_LOADED',
    payload: new_user
  };
}

function signOutUser() {
  var signout = User.signOutUser().then(() => {
    return null
  });
  return {
    type: 'USER_LOADED',
    payload: signout
  };
}

function selectCompany(pos_in_array) {
  return {
    type: 'COMPANY_SELECTED',
    payload: pos_in_array
  };
}

function selectPurchase(purchase) {
  return {
    type: 'PURCHASE_SELECTED',
    payload: purchase
  };
}

function purchase(currentUser, currentCompany, numberOfShares) {
  var user = Backend.buy(currentUser, currentCompany, numberOfShares).then((user) => {
    return User.setCurrentUser(user).then(() => {
      return User.currentUser().then((user) => {
        return user
      });
    });
  });
  return {
    type: 'USER_LOADED',
    payload: user
  }
}

function sell(currentUser, currentPurchase, currentCompany, numberOfShares) {
  var user = Backend.sell(currentUser, currentPurchase, currentCompany, numberOfShares).then((user) => {
    return User.setCurrentUser(user).then(() => {
      return User.currentUser().then((user) => {
        return user
      });
    });
  });
  return {
    type: 'USER_LOADED',
    payload: user
  }
}


export { selectCompany, loadCurrentUser, createGuestUser, updateMarket, fetchMarket, signOutUser, purchase, sell, selectPurchase }
