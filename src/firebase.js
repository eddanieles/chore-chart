import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUK6C3siStpwkE3pQBYBmaiFRJXWwjYO8",
    authDomain: "chore-chart-ef798.firebaseapp.com",
    projectId: "chore-chart-ef798",
    storageBucket: "chore-chart-ef798.appspot.com",
    messagingSenderId: "329584946766",
    appId: "1:329584946766:web:53c42f7104392bbbce1d1f"
  };
const app = initializeApp(firebaseConfig);

// utils
const db = getFirestore(app);

// export utils/refs
export {
    db
}