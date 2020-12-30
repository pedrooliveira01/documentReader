import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#121212'
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
    
  },  
  containerCameraButtons: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',    
    
  },
  foto: {
    width: "auto",
    height: "80%",
    borderRadius: 8,
    resizeMode: 'contain',    
  },  
  camera:{
    flex: 1,
  },
  buttonFoto:{    
    position: 'absolute',
    justifyContent: 'center',         
    alignItems: 'center', 
    alignSelf: 'center',     
    top : '88%',
    borderRadius: 50,
    backgroundColor: '#323232',
    width: 70,
    height: 70,
    
  },
  buttonOK:{
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 50,
    backgroundColor: '#323232',
    width: 70,
    height: 70,
  },  
});

