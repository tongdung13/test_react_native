import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
// import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (email, password) => {
    axios
      .post('http://103.226.249.210:3022/api/login', {
        email,
        password,
      })
      .then(response => {
        if (response.data.code == 200) {
          navigation.navigate('Blog');
          AsyncStorage.setItem('AccessToken', response.data.data.token);
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={newEmail => setEmail(newEmail)}
        value={email}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={newPassword => setPassword(newPassword)}
        value={password}
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
      />
      <TouchableOpacity
        onPress={() => onSubmit(email, password)}
        style={styles.button}>
        <Text style={styles.submit}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 30,
    color: 'darkcyan',
  },
  label: {
    color: 'black',
    margin: 10,
    marginLeft: 0,
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    paddingLeft: 14,
    borderRadius: 50,
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 30,
  },
  submit: {
    fontSize: 20,
    color: 'white',
  },
});

export default Login;
