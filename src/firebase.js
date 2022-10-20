// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore,
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    doc,
    onSnapshot,
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
const doc_name = "testdoc"

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

export const add_doc = async (obj) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collection_name, doc_name), obj)
    console.log("Document written with ID: ", docRef.id);
}

export const set_doc = async (obj) => {
  
  obj = {...obj, timeStamp: serverTimestamp()}
  console.log(`will set`, obj, collection_name, doc_name)
  const docRef = await setDoc(collection(db, collection_name), obj);
  // console.log("Document written with ID: ", docRef.id);
}

export const update_doc = async (obj) => {
  console.log(`will set`, obj, collection_name, doc_name)
  //const docRef = await setDoc(collection(db, collection_name), obj);
  // console.log("Document written with ID: ", docRef.id);

  const docRef = doc(db, collection_name, doc_name)
  // Set the "capital" field of the city 'DC'
  await updateDoc(docRef, obj)
}

export const listener = (flag) => {
  const unsub = onSnapshot(doc(db, collection_name, doc_name), (doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    const data = doc.data()
    console.log(source, " data: ", data);
    if(flag==='stop') unsub()
    else {
      flag(data)
    }
  });
  
}