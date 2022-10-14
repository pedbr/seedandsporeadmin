import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from './secrets'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
