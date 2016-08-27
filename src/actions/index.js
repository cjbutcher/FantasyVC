var User = require('../user');
var Backend = require('../backend');

function updateCompanies(companies) {
  return {
    type: 'COMPANIES_LOADED',
    payload: companies
  };
}

function fetchCompanies() {
  var companies = Backend.priceIndex().then((index) => {
    return index;
  });
  return {
    type: 'COMPANIES_LOADED',
    payload: companies
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
      return user
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

function purchase(currentUser, currentCompany, numberOfShares) {
  var user = Backend.buy(currentUser, currentCompany, numberOfShares).then((user) => {
    console.log('user is ' + JSON.stringify(user));
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


export { selectCompany, loadCurrentUser, createGuestUser, updateCompanies, fetchCompanies, signOutUser, purchase }
