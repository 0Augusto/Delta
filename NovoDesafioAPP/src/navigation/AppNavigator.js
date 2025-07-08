import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProductSearchScreen from '../screens/ProductSearchScreen';
import ContactFormScreen from '../screens/ContactFormScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Início' }}
        />
        <Stack.Screen 
          name="ProductSearch" 
          component={ProductSearchScreen} 
          options={{ title: 'Busca de Produtos' }}
        />
        <Stack.Screen 
          name="ContactForm" 
          component={ContactFormScreen} 
          options={{ title: 'Formulário de Contato' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
