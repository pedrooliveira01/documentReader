import React,{useState, useEffect, useRef} from 'react';
import { View, Text, SafeAreaView, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Button from '../../components/button';
import * as ImageManipulator  from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles'


export default function CameraScreen(){
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [foto, setFoto] = useState<ImageManipulator.ImageResult | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(()=>{
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted')
    })();
  },[]);

  if (hasPermission === null || hasPermission === false){
    return <Text>Acesso a camera negado</Text>
  }


  async function handleTirarFoto(){
    if (null !== cameraRef.current){
      const data = await cameraRef.current.takePictureAsync();
      let _width = data.width;
      let _height = data.height;

      if (_width>2000){
        _width  =_width - 50 * _width / 100;
        _height  = _height - 50 * _height / 100;
      }      


      const manipResult = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: _width, height: _height } }],//
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      setFoto(manipResult);
      setOpen(true)
    }

  }

  function handleSaveFoto(){    
    setOpen(false)    
    navigation.navigate('Main',{foto: foto?.uri, base64: foto?.base64});
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Camera 
       ref={cameraRef} 
       style={styles.camera}
       type={Camera.Constants.Type.back}
      />   

   
      <Button 
        onPress={handleTirarFoto}
        style={styles.buttonFoto}
        icon={'camera'}
        iconSize={25}/>        

      {foto && 
      
      <Modal animationType="slide"
      transparent={false}
      visible={open}>

        <View style={styles.containerModal}>
          <Text style={{fontSize:20}}>Confirmar imagem?</Text>
          <Text style={{fontSize:14}}>Verifique se os dados estão visiveis</Text>

          <Image style={styles.foto} source={{uri: foto.uri}}/>

          <View style={styles.containerCameraButtons}>

            <Button 
              onPress={handleSaveFoto}
              style={styles.buttonOK}
              icon={'content-save'} 
              iconSize={25}/>

            <Button 
              onPress={() => setOpen(false)}
              style={styles.buttonOK}
              icon={'close'} 
              iconSize={25}/>
              
          </View>
         
        </View>
      </Modal>

    }


    </SafeAreaView>
  )
}

