import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Home');  // Navegar a la pantalla principal
      } catch (err) {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } else {
      setError('Por favor ingresa tu email y contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Iniciar Sesión</Text>

      {/* Mostrar error si lo hay */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Input 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
      />
      <Input 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword}
      />
      <Button 
        title="Iniciar Sesión" 
        containerStyle={styles.button} 
        onPress={handleLogin} 
      />
      <Button 
        title="¿No tienes cuenta? Regístrate" 
        type="clear"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});