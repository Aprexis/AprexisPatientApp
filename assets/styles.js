import { StyleSheet } from 'react-native';

export const $color: ColorTheme = {
  lightBlue: '#03718D',
  midBlue: '#003949',
  brightBlue: '#6DD6F0',
  darkBlue: '#112B37',
  red: '#D52700',
  primary: '#03a9f4',
  darkBg: '#03718D',
  lightBg: '#F3F6F9',
  icon: '#112B37',
};

export default StyleSheet.create(
  {
    lightBackground: {
      backgroundColor: $color.lightBg
    },
    mainApp: {
      backgroundColor: $color.darkBg,
    },
    mainFullScreen: {
      flex: 1,
      backgroundColor: $color.darkBg,
      justifyContent: 'center',
      alignContent: 'center',
    },
    mainBody: {
      flex: 1,
      backgroundColor: $color.lightBg,
      textAlign:'center'
    },
    row:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop:6, 
      marginBottom:6,
    },
    sectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10
    },
    btnPrimary: {
      backgroundColor: $color.brightBlue,
      color: $color.darkBlue,
    },
    buttonStyle: {
      backgroundColor: $color.brightBlue,
      borderWidth: 0,
      color: $color.darkBlue,
      borderColor: $color.brightBlue,
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25
    },
    buttonTextStyle: {
      color: $color.darkBlue,
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: '500'
    },
    listButton: {
      borderRadius:5,
      padding:10,
      backgroundColor:'#E0EBF1',
      flexDirection: "row",
      alignItems:'center',
      marginTop:5,
      width:'100%',
      alignSelf: 'center',
    },
    inputField: {
      flex: 1,
      color: $color.darkBlue,
      fontWeight: '500',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#dadae8',
      backgroundColor:'rgba(255,255,255,.65)',
      outlineColor: '#fff',
      outlineWidth: '1px',
      shadowColor: "#86B9C7",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.53,
      shadowRadius: 13.97,
      elevation: 21,
    },
    icon: {
      color: $color.darkBlue,
      display:'inline-block'
    }
  }
);
