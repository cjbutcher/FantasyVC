var User = require('../user');
var Backend = require('../backend');

function selectCompany(company) {
  return {
    type: 'COMPANY_SELECTED',
    payload: company
  };
}

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

export { selectCompany, loadCurrentUser, createGuestUser, updateCompanies, fetchCompanies }
