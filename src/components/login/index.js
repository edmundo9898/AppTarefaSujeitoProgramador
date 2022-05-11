import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';

import firebase from '../../firebase/FirebaseConnection';

export default function Login( { changeStatus }){


    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function hundleLogin(){
        //Fazendo login
        if(type === 'login'){
          const user = firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
             changeStatus(user.user.uid)
          })
          .catch((err) => {
              console.log(err);
              alert('Erro encontrado');
              return;
          })

        }else{
            // cadastrando o usuario

            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid)
            })
            .catch((err) => {
                console.log(err)
                alert('Erro ao cadastrar')
                return;
            })
        }
    }

    return(

        <SafeAreaView style={styles.container}>
           
           <TextInput 
           placeholder='Seu Email'
           style={styles.input} 
           value={email}
           onChangeText={(text) => setEmail(text)}
           />
          
           <TextInput 
           placeholder='*********'
           style={styles.input} 
           value={password}
           onChangeText={(text) => setPassword(text)}
           />

           <TouchableOpacity 
           style={[styles.btnLogin, { backgroundColor:  type === 'login' ? '#3ea6f2' : '#141414'}]}
           onPress={hundleLogin}
           >
               <Text style={styles.loginTxt}>
                   {type === 'login' ? 'Acessar' : 'Cadastrar'}
                   </Text>
           </TouchableOpacity>

           <TouchableOpacity 
           onPress={() => setType(type === 'login' ? 'Cadastrar' : 'login')}
           >
               <Text style={[styles.txtBtn, {textAlign: 'center'}]}>
                   {type === 'login' ? 'Criar uma conta' : 'Já tenho login'}
                   </Text>
           </TouchableOpacity>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 30,
        paddingTop: 25,
        paddingHorizontal: 10,
    },
    input:{
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: '#141414',
    },
    btnLogin:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginBottom: 10,

    },
    loginTxt:{
        color: '#fff',
        fontSize: 17,
    }
        
})