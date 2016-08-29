function sharesOwned(currentUser, companyID) {
  var matching_purchases = currentUser.portfolio[companyID]
  if (!matching_purchases) {
    return
  }
  return matching_purchases.reduce(function (a,b) { return a + b.remaining; }, 0);
}

export { sharesOwned }
