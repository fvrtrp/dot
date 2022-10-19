// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore,
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  authDomain: "dotapp-66ea5.firebaseapp.com",
  projectId: "dotapp-66ea5",
  storageBucket: "dotapp-66ea5.appspot.com",
  messagingSenderId: "158738776534",
  measurementId: "G-GMG7XYSGKZ"
};
const collection_name = 'test'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const analytics = getAnalytics(app)

export const get_docs = async () => {
    const querySnapshot = await getDocs(collection(db, collection_name))
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
    });
}

export const add_doc = async () => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collection_name), {
        name: "Tokyo",
        country: "Japan",
        timestamp: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
}