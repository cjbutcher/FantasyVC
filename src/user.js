import {
  AsyncStorage
} from 'react-native'

function currentUser() {
  return AsyncStorage.getItem('currentUser')
}

function setCurrentUser(user) {
  return AsyncStorage.setItem('currentUser', JSON.stringify(user));
}

function signOutUser() {
  return AsyncStorage.removeItem('currentUser');
}

export { currentUser, setCurrentUser, signOutUser }
