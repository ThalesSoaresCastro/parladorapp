import { StatusBar } from 'expo-status-bar';
import React,{
  useEffect,
}from 'react';

import { NavigationContainer } from '@react-navigation/native';

import * as Updates from 'expo-updates';
//import Principal from './app/Views/Principal';
//import Login from './app/Views/Login';

import theme from './theme.json'

import Routes from './app/routes';

export default function App() {
  
  useEffect(()=>{
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if(isAvailable){
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
      updateApp();
    }
  });
  
  return (
      <NavigationContainer>
        <StatusBar style='light' />
        <Routes />
      </NavigationContainer>
  );
}

