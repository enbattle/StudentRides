import firebase from 'firebase/app'
import 'firebase/storage'

var config = {
  apiKey: "AIzaSyCVlDxeWkuBo2lxTsItjmx_hCzExuScBrs",
  authDomain: "edvor-e7f95.firebaseapp.com",
  databaseURL: "https://edvor-e7f95.firebaseio.com",
  projectId: "edvor-e7f95",
  storageBucket: "edvor-e7f95.appspot.com",
  messagingSenderId: "275747962455",
}

firebase.initializeApp(config)

var storage = firebase.storage()

export {
  storage, firebase as default
}