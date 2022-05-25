import { StyleSheet } from 'react-native';
export default StyleSheet.create(
  {
    mainApp: {
      backgroundColor: '#03718D'
    },
    mainFullScreen: {
      flex: 1,
      backgroundColor: '#03718D',
      justifyContent: 'center',
      alignContent: 'center'
    },
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#E7F0FF',
      alignContent: 'center'
    },
    sectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10
    },
    buttonStyle: {
      backgroundColor: '#74DEFF',
      borderWidth: 0,
      color: '#003949',
      borderColor: '#74DEFF',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25
    },
    buttonTextStyle: {
      color: '#003949',
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: 500
    },
    inputField: {
      flex: 1,
      color: '#003949',
      fontWeight: 500,
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#dadae8',
      backgroundColor:'rgba(255,255,255,.65)',
      outlineColor: '#fff',
      outlineWidth: '1px'
    }
  }
);
