import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import JobScreen from '../pages/JobPages.js/JobScreen';

const Tab = createBottomTabNavigator();

export default MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }} />
        <Tab.Screen name="jobs " component={JobScreen} options={{
          tabBarLabel: 'job offers',
          tabBarIcon: ({ focused, size }) => (
            <Icon
              name="newspaper-o"
              size={size}
              color={focused ? 'blue' : 'gray'}
            />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};