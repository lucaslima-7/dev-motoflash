import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class firebaseService {
  init() {
    if (firebase.apps.length) {
      return;
    }
    firebase.initializeApp(config);
    this.db = firebase.database();
    this.auth = firebase.auth();
  }

  getUserData = (userId) => {
    if (!firebase.apps.length) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.db.ref(`users/${userId}`)
        .once('value')
        .then((snapshot) => {
          const user = snapshot.val();
          resolve(user);
        });
    });
  };

  updateUserData = (user) => {
    if (!firebase.apps.length) {
      return;
    }
    return this.db.ref(`users/${user.uid}`)
      .set(user);
  };

  onAuthStateChanged = (callback) => {
    if (!this.auth) {
      return;
    }
    this.auth.onAuthStateChanged(callback);
  };

  signOut = () => {
    if (!this.auth) {
      return;
    }
    this.auth.signOut();
  }
}

const instance = new firebaseService();

export default instance;