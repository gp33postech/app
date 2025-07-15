// Em: src/config/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Suas chaves de configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUZ46MW745J_tQ3Lihcooxtk5QB_Y5JGM",
  authDomain: "fiap-mobile-8056b.firebaseapp.com",
  projectId: "fiap-mobile-8056b",
  storageBucket: "fiap-mobile-8056b.appspot.com", // Corrigido para o domínio correto do storage
  messagingSenderId: "887067353846",
  appId: "1:887067353846:web:5458ef54f32005d36202d7",
  measurementId: "G-FPHCLERKHF"
};

// 1. Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// 2. Inicializa a autenticação com persistência de dados no dispositivo
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// 3. Inicializa os outros serviços que vamos usar
const db = getFirestore(app);
const functions = getFunctions(app);

// 4. Exporta todas as instâncias para serem usadas no resto do app
export { auth, db, functions };
