export default function(state = [], action) {
  switch(action.type) {
  case 'COMPANIES_LOADED':
    return action.payload;
  }
  
  return state;
}
