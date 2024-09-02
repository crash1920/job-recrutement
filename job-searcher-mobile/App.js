import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import MyStack from './src/components/StackScreen'
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <MyStack />
  );
}

