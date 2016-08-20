export default function(state = null, action) {
  switch(action.type) {
  case 'USER_LOADED':
    return JSON.parse(action.payload);
  }

  return null;
}
