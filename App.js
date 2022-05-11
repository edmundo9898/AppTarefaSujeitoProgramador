import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text, 
    TextInput, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity,
    FlatList,
    Keyboard
    } from 'react-native';


import {Feather} from '@expo/vector-icons'
import Login from './src/components/login';
import TaskList from './src/components/TaskList'
import firebase from './src/firebase/FirebaseConnection';


 

export default function App(){

    const [user, setUser] = useState(null);
    const inputRef = useRef(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [key, setKey] = useState('');

    useEffect(() => {

      function getUser(){
          if(!user){
              return;
            }


        //Usuario quer editar uma tarefa

        if(key !== ''){
            firebase.database().ref('tarefas').child(user).child(key).update({
              nome: newTask
            })
            .then(()=> {
              console.log('Atualizado')
      
      
            })
      
            Keyboard.dismiss();
            setNewTask('');
            setKey('');
            return;
          }



           let tarefas = firebase.database().ref('tarefas').child(user);
           let chave = tarefas.push().key;
            firebase.database().ref('tarefas').child(user).once('value', (snapshot)  => {
            setTasks([]);
            
            snapshot?.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    nome: childItem.val().nome,
                 }
                 setTasks(oldTasks => [...oldTasks, data])
            })


            })
      }

      getUser();


    }, [user])


   function handleAdd(){
       if(newTask === ''){
           return;

       }


       if(key !== ''){
           firebase.database().ref('tarefas').child(user).child(key).update({
              nome: newTask 
           })

           .then(() => {
               const tasksIndex = tasks.findIndex(item => item.key === key)
               let tasksClone = tasks;
               tasksClone[tasksIndex].nome = newTask

               setTasks([...tasksClone])
           })

           Keyboard.dismiss();
           setNewTask('');
           setKey('');
           return;

       }

       let tarefas = firebase.database().ref('tarefas').child(user);
       let chave = tarefas.push().key;

       tarefas.child(chave).set({
           nome: newTask
       })
       .then(() => {
           const data = {
               key: chave,
               nome: newTask
           };

           setTasks(oldTasks => [...oldTasks, data])
       })
        
       Keyboard.dismiss();
       setNewTask('');
       

   }

    function handleDelete(key){
        firebase.database().ref('tarefas').child(user).child(key).remove()
        .then(() => {
            const findTasks = tasks.filter( item => item.key !== key)
            setTasks(findTasks)
        })
    }

    function handleEdit(data){
       setKey(data.key)
       setNewTask(data.nome)
       inputRef.current.focus();

    }

    function cancelEdit(){
        setKey('');
        setNewTask('');
        Keyboard.dismiss();

    }

     
    if(!user){
        return <Login changeStatus={ (user) => setUser(user) }/>
    }



    return(

        <SafeAreaView style={styles.container}>

            {key.length > 0 && (
                <View style={{flexDirection: 'row', marginBottom: 8,}}>
                    <TouchableOpacity onPress={cancelEdit}>
                    <Feather name="x-octagon" size={24} color="#FF0000" />
                    </TouchableOpacity>
                    <Text style={{marginLeft: 8, color: '#ff0000'}}>
                        Você está editando uma tarefa
                    </Text>
                </View>

            )}     
            

            <View style={styles.containerTask}>
                <TextInput
                style={styles.input}
                placeholder='O que vou fazer hoje ?'
                value={newTask}
                onChangeText={(text) => setNewTask(text)}
                ref={inputRef}
                 
                />

                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.btnTxt}>+</Text>
                </TouchableOpacity>
                
            </View>

                <FlatList
                data={tasks} // onde está a lista
                keyExtractor={ item => item.key} // qual é o id desse item
                renderItem={ ({item}) => (  // qual o componente que vai ser renderizado
                    <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
                 )}
                />
              
         
            

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
    containerTask:{
        flexDirection: 'row',
    },
    input:{
        flex: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#141414',
        height: 45,
    },
    buttonAdd:{
        backgroundColor: '#141414',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        paddingHorizontal: 14,
        borderRadius: 4,
    },
    btnTxt:{
        color: '#fff',
        fontSize: 20,
    }
})