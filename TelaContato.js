// ContactFormScreen.js
import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const ContactFormScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birthDate: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;

    // CPF validation logic here
    let sum = 0;
    let rest;

    if (cpf === '00000000000') return false;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const fetchAddressByCEP = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSubmit = () => {
    if (!validateCPF(formData.cpf)) {
      alert('CPF inválido');
      return;
    }
    
    navigation.navigate('ReviewData', { formData });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        />

        <Text style={styles.label}>CPF</Text>
        <TextInputMask
          type={'cpf'}
          style={styles.input}
          value={formData.cpf}
          onChangeText={(text) => setFormData(prev => ({ ...prev, cpf: text }))}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
        />

        <Text style={styles.label}>CEP</Text>
        <TextInputMask
          type={'custom'}
          options={{
            mask: '99999-999'
          }}
          style={styles.input}
          value={formData.cep}
          onChangeText={(text) => {
            setFormData(prev => ({ ...prev, cep: text }));
            if (text.replace(/\D/g, '').length === 8) {
              fetchAddressByCEP(text.replace(/\D/g, ''));
            }
          }}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={formData.address}
          onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
