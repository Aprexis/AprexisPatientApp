import { StyleSheet } from 'react-native';

export const themeColor = {
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

export const styles = StyleSheet.create(
  {
    lightBackground: {
      backgroundColor: themeColor.lightBg
    },
    mainApp: {
      backgroundColor: themeColor.darkBg,
    },
    mainFullScreen: {
      flex: 1,
      backgroundColor: themeColor.darkBg,
      justifyContent: 'center',
      alignContent: 'center',
    },
    mainBody: {
      flex: 1,
      backgroundColor: themeColor.lightBg,
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
      backgroundColor: themeColor.brightBlue,
      color: themeColor.darkBlue,
      lignItems: 'center',
    },
    buttonStyle: {
      backgroundColor: themeColor.brightBlue,
      borderWidth: 0,
      color: themeColor.darkBlue,
      borderColor: themeColor.brightBlue,
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25
    },
    buttonTextStyle: {
      color: themeColor.darkBlue,
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
      color: themeColor.darkBlue,
      fontWeight: '500',
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#dadae8',
      backgroundColor:'rgba(255,255,255,.65)',
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
      color: themeColor.darkBlue,
      display:'inline-block',
    },
    formRow: {
      marginTop:10,
      marginBottom:10,
    },
    fieldLabel: {
      fontWeight:500,
      fontSize:17,
      marginBottom:8
    },
    inlineLabel: {
      fontWeight:500,
      marginLeft:3,
      fontSize:15
    },
    picker: { 
      padding: 6, 
      fontSize:15, 
      fontWeight:600, 
      color:themeColor.midBlue, 
      borderColor:themeColor.lightBlue, 
      borderWidth:1,
      borderRadius:3,
      backgroundColor:'#fff'
    }
  }
);
