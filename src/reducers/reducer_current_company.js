export default function(state = null, action) {
  switch(action.type) {
  case 'COMPANY_SELECTED':
    return action.payload;
  }

  return { name: 'Facebook', price: 500 };
}
