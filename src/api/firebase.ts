import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from './secrets'
import { getAuth } from 'firebase/auth'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
