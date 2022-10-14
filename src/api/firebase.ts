import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBc5KLsEVNT5EgjPx0HW2hJqSO5F4fLw2Q',
  authDomain: 'seedandsporept.firebaseapp.com',
  projectId: 'seedandsporept',
  storageBucket: 'seedandsporept.appspot.com',
  messagingSenderId: '479584535051',
  appId: '1:479584535051:web:c86233e54f2b2886407d0e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
