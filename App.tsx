import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main  from './src/pages/main';
import Camera  from './src/pages/camera';

export default function App() {
  const Stack = createStackNavigator();  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }}/>
        <Stack.Screen name="Camera" component={Camera} options={{ title: 'Camera' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

