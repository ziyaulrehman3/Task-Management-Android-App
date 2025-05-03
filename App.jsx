import './gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigator} from '@react-navigation/native';

import {View, Text} from 'react-native';

import Home from './src/Home';
import List from './src/List';
import NewTask from './src/NewTask';

import './global.css';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureDirection: 'vertical',
        }}>
        <Stack.Screen name="List" component={List} />

        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="NewTask" component={NewTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
