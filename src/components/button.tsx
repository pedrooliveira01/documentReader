import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import  Icon from '@expo/vector-icons/build/MaterialCommunityIcons';
import {IconProps} from '@expo/vector-icons/build/createIconSet';


import { StyleSheet } from 'react-native';


interface iProps extends TouchableOpacityProps {
  label?: string,
  icon?: any,
  iconSize?: number,
  iconColor?: string

}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize:  16,      
  },

});

export default function OSButton({label, icon, iconSize, iconColor,  ...rest} : iProps){
  return (  
    <TouchableOpacity  {...rest} >   
      {icon ? <Icon name={icon} size={iconSize ? iconSize : 18} color={iconColor ? iconColor : '#fff'} /> : undefined}  
      {label ?  <Text style={[styles.label ]}>
                  {label}                           
                 </Text> : undefined}       
    </TouchableOpacity>  
  ) 
              
}


