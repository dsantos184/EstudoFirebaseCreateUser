/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import firebase from 'firebase';

export default class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      users:
      {
        email: '',
        password: '',
      }
    };

     // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDNjOj537Hga8pA41LO6Gjob89k8bNlfr0",
      authDomain: "create-user-c3cd4.firebaseapp.com",
      databaseURL: "https://create-user-c3cd4.firebaseio.com",
      projectId: "create-user-c3cd4",
      storageBucket: "create-user-c3cd4.appspot.com",
      messagingSenderId: "96820603524"
    };
    firebase.initializeApp(config);

    this.setUserEmail = this.setUserEmail.bind(this);
    this.setUserPassword = this.setUserPassword.bind(this);
    this.addUsers = this.addUsers.bind(this);
  }

  setUserEmail(email)
  {
    let estado = this.state;
    estado.users.email = email;
    this.setState(estado);
  }

  setUserPassword(password)
  {
    let estado = this.state;
    estado.users.password = password;
    this.setState(estado);
  }

  addUsers()
  {
    const { users } = this.state;
    firebase.auth().createUserWithEmailAndPassword(users.email, users.password)
      .catch(error=>{

        mensageError = '' ;

        switch(error.code)
        {
          case 'auth/weak-password':
            mensageError = 'A senha deve ter o mínimo de 6 caracteres!';
          break;

          case 'auth/invalid-email':
            mensageError = 'Email inválido!'
          break

          case 'auth/email-already-in-use':
            mensageError = 'Email ja cadastrado!';
          break

          default:
            mensageError = 'Erro ao cadastrar o usuario!'
        }

        alert(mensageError);

      });

    alert("Usuário cadastrado com sucesso!");

    let estado = this.state;
    
    const usuarios = {email:'', password:''}

    estado.users = usuarios;

    this.setState(estado);
      
  }


  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.textColor}>Email:</Text>
        <TextInput 
          onChangeText={(email)=>{this.setUserEmail(email)}}
          style={styles.inputText}
          underlineColorAndroid='transparent'
          value={this.state.users.email}
        />

        <Text style={styles.textColor}>Senha:</Text>
        <TextInput 
          secureTextEntry={true}
          onChangeText={(password)=>{this.setUserPassword(password)}}
          style={styles.inputText}
          underlineColorAndroid='transparent'
          value={this.state.users.password}
        />

        <View style={styles.containerBtn}>
          <TouchableOpacity
            onPress={this.addUsers}
            style={styles.btnCadastrar}  
          >
            <Text style={styles.textBtn}>cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: '#19212b',
    padding: 20,
  },

  textColor:
  {
    color: '#FFF',
  },

  inputText:
  {
    backgroundColor: '#FFF',
    marginBottom: 20,
  },

  containerBtn:
  {
    alignItems: 'center',
  },  

  btnCadastrar:
  {
    backgroundColor: '#FFF',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },

  textBtn:
  {
    fontSize: 16,
    fontWeight: 'bold'
  }



});
