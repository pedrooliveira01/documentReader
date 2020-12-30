import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  
  },
  button:{
    backgroundColor:'#323232',
    borderRadius: 50,
    padding: 16,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',   
    alignSelf: 'flex-end',   
    position: 'absolute',
    top: '88%',
    right: '4%'
  },
  containerList:{
    flex: 1,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#121212'
  },
  listItemView:{  
    margin: 2,
    padding: 8, 
    backgroundColor: '#323232'
  },  
  listItemHeader:{    
    fontSize: 18,
    color: '#c2c2c2',
    fontWeight: 'bold'
  },
  listItem:{    
    fontSize: 12,
    color: '#fff'
  }
});
