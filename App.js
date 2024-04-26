import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/component/HomeScreen'; // Assuming your HomeScreen.js is in src/screens
import EmotionalState from './src/component/EmotionalState';

const Stack = createStackNavigator();

const App = () => {
  console.log("Its working");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmotionalState" component={EmotionalState} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
