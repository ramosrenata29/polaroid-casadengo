/**
 * Configuração Centralizada do Firebase
 *
 * NOTA: Para conectar ao seu projeto Firebase em produção:
 * 1. Substitua os valores abaixo pelas credenciais do seu Firebase Console.
 * 2. Ative os serviços: Anonymous Auth, Realtime Database e Firebase Storage.
 */

export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "polaroid-casadengo.firebaseapp.com",
  databaseURL: "https://polaroid-casadengo-default-rtdb.firebaseio.com",
  projectId: "polaroid-casadengo",
  storageBucket: "polaroid-casadengo.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Import do Firebase SDK v10 (ES Modules via CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref as dbRef, push, set, onValue, remove, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadString, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

let app = null;
let auth = null;
let db = null;
let storage = null;
let isConfigured = false;

// Verifica se a API Key é real (se foi substituída)
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY") {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getDatabase(app);
    storage = getStorage(app);
    isConfigured = true;

    // Autenticação Anônima para acesso seguro
    signInAnonymously(auth).catch((error) => {
      console.warn("Aviso na autenticação anônima do Firebase:", error);
    });
  } catch (err) {
    console.error("Erro ao inicializar o Firebase com credenciais:", err);
  }
} else {
  console.info("Firebase rodando em MODO SIMULADO / LOCAL DB (Configure firebase-config.js para conectar ao Firebase real).");
}

export { app, auth, db, storage, isConfigured, dbRef, push, set, onValue, remove, get, storageRef, uploadString, getDownloadURL, deleteObject };
