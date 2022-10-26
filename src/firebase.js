import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUK6C3siStpwkE3pQBYBmaiFRJXWwjYO8",
    authDomain: "chore-chart-ef798.firebaseapp.com",
    projectId: "chore-chart-ef798",
    storageBucket: "chore-chart-ef798.appspot.com",
    messagingSenderId: "329584946766",
    appId: "1:329584946766:web:53c42f7104392bbbce1d1f"
  };
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
// const usersCollection = db.collection('users');
// const favoritesCollection = db.collection('favorites');
// const trylistCollection = db.collection('trylist');
// const networkCollection = db.collection('network');

// export utils/refs
export {
    db,
    auth
    // usersCollection,
    // favoritesCollection,
    // trylistCollection,
    // networkCollection
}