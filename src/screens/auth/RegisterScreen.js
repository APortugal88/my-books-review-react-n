import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { auth } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    // Función para registrar al usuario
    const handleRegister = async () => {
      console.log("handleRegister called");
      if (password !== confirmPassword) {
        console.log("Las contraseñas no coinciden");
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
  
      try {
        // Registra al usuario en Firebase
        console.log(auth);
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Éxito");
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        navigation.navigate('Login'); // Redirige a la pantalla de login
      } catch (error) {
        // Muestra un mensaje de error si ocurre un fallo
        console.log("error ", error);
        Alert.alert('Error', error.message);
      }
    };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.button}
        onPress={handleRegister}
      />
      <Button 
        title="¿Ya tienes cuenta? Inicia sesión" 
        type="clear"
        onPress={() => navigation.navigate('Login')}
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
});