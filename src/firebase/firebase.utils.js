import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDZYDLtHFDBdVbcxuvEaVkevwPmyMbB6zA',
  authDomain: 'react-shop-a6d95.firebaseapp.com',
  databaseURL: 'https://react-shop-a6d95.firebaseio.com',
  projectId: 'react-shop-a6d95',
  storageBucket: 'react-shop-a6d95.appspot.com',
  messagingSenderId: '684116600518',
  appId: '1:684116600518:web:9f5fd1acd0055ccc10d9c7',
  measurementId: 'G-2E0KD2KJNX'
}
firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
