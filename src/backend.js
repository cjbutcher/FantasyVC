const baseURL = 'https://82c91f4d.ngrok.io'

function get(params) {
  url = baseURL + params
  return fetch(url).then(function(response){
    return response.json();
  }).then(function(json){
    return json
  });
}

function post(params, body) {
  url = baseURL + params
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  }).then(function(response){
    return response.json();
  }).then(function(json){
    return json
  });
}

function priceIndex() {
  return get('/prices');
}

function createUser() {
  return post('/users', null).then((user) => {
    return user;
  });
}

function buy(user, company, amount) {
  return post('/purchases', JSON.stringify({
    'user': {
      'token': user.token
    },
    'purchase': {
      'company_id': company.id,
      'amount': amount,
      'price': company.price
    }
  }));
}

function sell(user, purchase, company, amount) {
  return post('/sales', JSON.stringify({
    'user': {
      'token': user.token
    },
    'purchase': {
      'id': purchase.id
    },
    'sale': {
      'amount': amount,
      'price': company.price
    }
  }));
}

export { priceIndex, createUser, buy, sell }
