import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Desafio APP</Text>
      <Button 
        title="Busca por Produto" 
        onPress={() => navigation.navigate('ProductSearch')} 
        style={styles.button}
      />
      <Button 
        title="Formulário de Contato" 
        onPress={() => navigation.navigate('ContactForm')} 
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#343a40',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});

export default HomeScreen;
