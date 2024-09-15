import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA8uaQQCR7Suv8pjO4TDY0mdXhO3QzNaMI",
  authDomain: "js-todo-3d78f.firebaseapp.com",
  databaseURL: "https://js-todo-3d78f-default-rtdb.firebaseio.com",
  projectId: "js-todo-3d78f",
  storageBucket: "js-todo-3d78f.appspot.com",
  messagingSenderId: "800428777272",
  appId: "1:800428777272:web:85b090cdda0e2823bf6bcd"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
