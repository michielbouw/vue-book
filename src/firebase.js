import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAZ75lCYafbg-3sEOJVzYk33MWiSU6gZV4',
  authDomain: 'vue-book-c5dca.firebaseapp.com',
  databaseURL: 'https://vue-book-c5dca.firebaseio.com',
  projectId: 'vue-book-c5dca',
  storageBucket: 'vue-book-c5dca.appspot.com',
  messagingSenderId: '754924241387',
  appId: '1:754924241387:web:0afe2ce9265afe4adb19ae',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, db, storage };
