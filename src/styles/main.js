import { StyleSheet } from 'react-native';

function styles() {
  return StyleSheet.create({
    appContainer: {
      flex: 10
    },
    scenes: {
      flex: 9
    },
    userBar: {
      flex: 1,
      backgroundColor: 'black'
    },
    navBar: {
      backgroundColor: 'black',
      borderBottomColor: 'rgba(255, 255, 255, 0.2)'
    },
    navBarTitle:{
      color: 'white'
    },
    barButtonTextStyle:{
      color: 'white'
    },
    barButtonIconStyle:{
      tintColor: 'white'
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      flex: 10,
      paddingTop: 64,
      backgroundColor: 'black'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'black',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)'
    },
    smallLogo: {
      height: 30,
      width: 30
    },
    text: {
      alignSelf: 'center',
      color: 'white',
    },
    redText: {
      color: '#ff6961',
    },
    greenText: {
      color: '#77dd77',
    },
    containerWithGroupedButtons: {
      flex: 8,
      borderWidth: 2,
      borderColor: 'white'
    },
    groupedButtonsContainer: {
      flex: 2,
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: 'white'
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 5,
      borderColor: 'white',
      marginTop: 10
    },
    buttonText: {
      alignSelf: 'center',
      fontSize: 20,
      color: 'white'
    },
    blueButton: {
      backgroundColor: '#779ecb'
    },
    orangeButton: {
      backgroundColor: '#ffb347'
    }
  });
}

export { styles }
