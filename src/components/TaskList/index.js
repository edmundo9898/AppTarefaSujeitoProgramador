import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

export default function TaskList({data, deleteItem, editItem}){

    return(

        <View style={styles.container}>
            
            <TouchableOpacity style={styles.btnRemove} 
            onPress={() => deleteItem(data.key)}
            >
                 <Ionicons name='trash' size={22} color='#fff' />
            </TouchableOpacity>

            <View style={styles.containerFeed}>
                <TouchableWithoutFeedback
                onPress={() => editItem(data)}
                >
                    <Text style={styles.txtFeed}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,

},
btnRemove:{
    marginRight: 10,
},

containerFeed:{
    paddingRight: 10,
},

txtFeed:{
    color: '#fff',
    paddingRight: 10,
}

})
