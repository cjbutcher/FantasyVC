export default function(state = [], action) {
  switch(action.type) {
  case 'MARKET_LOADED':
    return action.payload;
  }

  return state;
}
