// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ProductSearchScreen from './src/screens/ProductSearchScreen';
import ContactFormScreen from './src/screens/ContactFormScreen';
import ReviewDataScreen from './src/screens/ReviewDataScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2171B5',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Delta Grupo' }}
        />
        <Stack.Screen 
          name="ProductSearch" 
          component={ProductSearchScreen}
          options={{ title: 'Busca por Produto' }}
        />
        <Stack.Screen 
          name="ContactForm" 
          component={ContactFormScreen}
          options={{ title: 'Formulário de Contato' }}
        />
        <Stack.Screen 
          name="ReviewData" 
          component={ReviewDataScreen}
          options={{ title: 'Revisão dos Dados' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/delta-logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductSearch')}
      >
        <Text style={styles.buttonText}>Busca por produto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContactForm')}
      >
        <Text style={styles.buttonText}>Faça contato</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#2171B5',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
