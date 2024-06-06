import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestoreをインポート
import { getStorage } from "firebase/storage"; // Storageをインポート
import 'firebase/app'; 
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2B4krm2lEYj4v9srqDKTGpGD5JSLJplk",
  authDomain: "tokusetu-c2b0c.firebaseapp.com",
  projectId: "tokusetu-c2b0c",
  storageBucket: "tokusetu-c2b0c.appspot.com",
  messagingSenderId: "413732280630",
  appId: "1:413732280630:web:84845fe01176ccd8dcbb97"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestoreの参照を取得
const storage = getStorage(app); // Storageの参照を取得

export { auth, db, storage };
