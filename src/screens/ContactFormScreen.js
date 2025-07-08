import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { formatCPF, formatCEP } from '../utils/masks';
import { validateCPF } from '../utils/validation';
import { fetchAddressByCEP } from '../utils/api';

const ContactFormScreen = () => {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    cep: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (name, value) => {
    // Aplicar máscaras
    if (name === 'cpf') {
      value = formatCPF(value);
    } else if (name === 'cep') {
      value = formatCEP(value);
    }
    
    setForm({
      ...form,
      [name]: value,
    });
    
    // Limpar erro quando o campo é alterado
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const handleBlurCep = async () => {
    if (form.cep.replace(/\D/g, '').length === 8) {
      setLoading(true);
      try {
        const addressData = await fetchAddressByCEP(form.cep);
        setForm({
          ...form,
          address: addressData.logradouro || '',
          neighborhood: addressData.bairro || '',
          city: addressData.localidade || '',
          state: addressData.uf || '',
        });
      } catch (error) {
        Alert.alert('Erro', 'CEP não encontrado');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!validateCPF(form.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }
    
    if (form.cep.replace(/\D/g, '').length !== 8) {
      newErrors.cep = 'CEP inválido';
    }
    
    if (!form.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Simular envio do formulário
      Alert.alert(
        'Sucesso!', 
        'Formulário enviado com sucesso',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      console.log('Dados do formulário:', form);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Formulário de Contato</Text>
        
        <InputField
          label="Nome Completo"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
          error={errors.name}
          placeholder="Digite seu nome"
        />
        
        <InputField
          label="CPF"
          value={form.cpf}
          onChangeText={(text) => handleChange('cpf', text)}
          error={errors.cpf}
          placeholder="000.000.000-00"
          keyboardType="numeric"
          maxLength={14}
        />
        
        <InputField
          label="CEP"
          value={form.cep}
          onChangeText={(text) => handleChange('cep', text)}
          onBlur={handleBlurCep}
          error={errors.cep}
          placeholder="00000-000"
          keyboardType="numeric"
          maxLength={9}
        />
        
        <InputField
          label="Endereço"
          value={form.address}
          onChangeText={(text) => handleChange('address', text)}
          error={errors.address}
          placeholder="Digite seu endereço"
          editable={!loading}
        />
        
        <InputField
          label="Bairro"
          value={form.neighborhood}
          onChangeText={(text) => handleChange('neighborhood', text)}
          placeholder="Digite seu bairro"
          editable={!loading}
        />
        
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <InputField
              label="Cidade"
              value={form.city}
              onChangeText={(text) => handleChange('city', text)}
              placeholder="Cidade"
              editable={!loading}
            />
          </View>
          
          <View style={[styles.halfInput, styles.stateInput]}>
            <InputField
              label="UF"
              value={form.state}
              onChangeText={(text) => handleChange('state', text)}
              placeholder="UF"
              maxLength={2}
              editable={!loading}
            />
          </View>
        </View>
        
        <InputField
          label="Email"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          error={errors.email}
          placeholder="seu.email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <InputField
          label="Telefone"
          value={form.phone}
          onChangeText={(text) => handleChange('phone', text)}
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
        />
        
        <Button 
          title="Enviar Formulário" 
          onPress={handleSubmit}
          style={styles.submitButton}
          isLoading={loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  stateInput: {
    width: '20%',
  },
  submitButton: {
    marginTop: 20,
  },
});

export default ContactFormScreen;
