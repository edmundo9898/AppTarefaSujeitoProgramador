import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDBcXTfDDERYC0IbQJjAle4hctzyTfL9YQ",
    authDomain: "tarefas-72437.firebaseapp.com",
    projectId: "tarefas-72437",
    storageBucket: "tarefas-72437.appspot.com",
    messagingSenderId: "997977965668",
    appId: "1:997977965668:web:b082b9c6d188d0fb7ccb71"
  };
  
  
    if(!firebase.apps.length){
       firebase.initializeApp(firebaseConfig);
      }

export default firebase;