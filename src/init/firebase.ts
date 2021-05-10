import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'
import { config } from 'configs/firebase';
import firebase from 'firebase/app'

// Initialize Firebase instance
firebase.initializeApp(config)
