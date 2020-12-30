import React from 'react';
import { View, FlatList, Text } from 'react-native';
import Button from '../../components/button'
import { styles } from './styles'
import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native';
import { processDocument } from '../../components/reader'
import {RootStackParamList, LocateArr, iLocate } from '../../types'
import getEnvVars from '../../../environment';

type CameraScreenRouteProp = RouteProp<RootStackParamList, 'Camera'>;

// Define here to read a image
const LocateArrDoc : LocateArr = [
  { locate: 'NOME', key: 'nome'},
  { locate: 'NASCIMENTO', key: 'cpf', copyIndex: [0,14]},
  { locate: 'NASCIMENTO', key: 'nascimento', copyIndex: [15,10]},
  { locate: 'UF', key: 'rg'},
  { locate: 'FILIAÇÃO', key: 'pai', copyLine: [1]},
  { locate: 'FILIAÇÃO', key: 'mae', copyLine: [2]}
]

export default function Main() {
  const navigation = useNavigation()
  const route = useRoute<CameraScreenRouteProp>()
  // This const is a result after read a image
  const [resultObj , setResultObj] = React.useState<any | undefined>(undefined)
  // This const is a document without trataments
  const [doc, setDoc] = React.useState<string[] | undefined>( undefined )

  // Navigate to camera screen
  function handleCameraClick(){
    navigation.navigate('Camera');
  }

  // Show log 
  React.useEffect(()=>{
    console.log(resultObj)
  },[resultObj])

  //Read and set result
  React.useEffect(()=>{
    const tempUser : any = {};
    console.log(doc)
    LocateArrDoc.map((locate: iLocate) => {
      doc?.map((line: string, index: number) => {
        
        if (line.includes(locate.locate)){
         
            const _begin = locate.copyLine && locate.copyLine[0] ? locate.copyLine[0] : 1;
            const _lines = locate.copyLine && locate.copyLine[1] ? locate.copyLine[1] : 0;
            const _count = _begin + _lines;
            
            for (let i = 0; i <= _count; i++) {
              if (i >= _begin && doc[index + i]){
                const _lineOK = locate.copyIndex 
                                  ? doc[index + i].substr(locate.copyIndex[0] ? locate.copyIndex[0] : 0, 
                                                          locate.copyIndex[1] ? locate.copyIndex[1] : doc[index + i].length )
                                  : doc[index + i];                       
                                                                          
                if (!tempUser[locate.key]){
                  tempUser[locate.key]  = _lineOK;
                } else {
                  tempUser[locate.key]  = tempUser[locate.key]  + _lineOK;
                }
              }             
            }
              
        }
      })
    })
    setResultObj(tempUser)
  },[doc])  


  // Process document
  React.useEffect(()=>{   
    if (route.params && route.params.foto && route.params.foto !== ''){
       processDocument( getEnvVars()?.API_KEY , route.params.base64 )
        .then(result => setDoc(result))
        .catch( err => console.log(err))
    }
  },[route.params])
  

  
  return (
    <View style={styles.container}>

      <View style={styles.containerList}>
  
        {resultObj && 
          <FlatList
            data={LocateArrDoc}          
            renderItem={({item}) => <View style={styles.listItemView}>
              <Text style={styles.listItemHeader}>{item.key}</Text>
              <Text style={styles.listItem}>{resultObj[item.key]}</Text>
            
            </View>}
          />
        }
      </View>
      
      <Button 
        icon='camera'
        iconSize={25}
        style={styles.button}
        onPress={handleCameraClick}
      />
      
    </View>
  );
}
