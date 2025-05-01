import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD_i-mdD1yu4G2Lc3oWG8Gv8mKInqH36u0",
    authDomain: "innocent-cogs.firebaseapp.com",
    projectId: "innocent-cogs",
    storageBucket: "innocent-cogs.appspot.com", // ✅ correct
    messagingSenderId: "1057353135128",
    appId: "1:1057353135128:web:61eb933b4e488218433f6d"
  }  

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
