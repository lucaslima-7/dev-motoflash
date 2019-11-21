import history from "@history";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  onAuthStateChanged = (callback) => {
    if (!this.auth) {
      return;
    }
    this.auth.onAuthStateChanged(callback);
  };



  getAllCouriers = () => {
    const couriersCollection = this.db.collection("couriers")
    if (!firebase.apps.length) {
      return
    }
    return new Promise((resolve, reject) => {
      couriersCollection.get()
        .then((snapshot) => {
          const couriers = snapshot.docs.map(doc => doc.data())
          resolve(couriers)
        })
    })
  }

  getAllCompanies = () => {
    const companiesCollection = this.db.collection("companies")
    if (!firebase.app.length) {
      return
    }
    return new Promise((resolve, reject) => {
      companiesCollection.get()
        .then((snapshot) => {
          const companies = snapshot.docs.map(doc => doc.data())
          console.log(companies)
          resolve(companies)
        })
    })
  }

  getAllWorkOrders = () => {
    const workOrdersCollection = this.db.collection("workOrders")
    if (!firebase.apps.length) {
      return
    }
    return new Promise((resolve, reject) => {
      workOrdersCollection.get()
        .then((snapshot) => {
          const workOrders = snapshot.docs.map(doc => doc.data())
          console.log(workOrders)
          resolve(workOrders)
        })
    })
  }

  getAllQuotations = () => {
    const quotationsCollection = this.db.collection("quotations")
    if (!firebase.apps.length) {
      return
    }
    return new Promise((resolve, reject) => {
      quotationsCollection.get()
        .then((snapshot) => {
          const quotations = snapshot.docs.map(doc => doc.data())
          console.log(quotations)
          resolve(quotations)
        })
    })
  }

  signOut = () => {
    if (!this.auth) {
      return;
    }
    this.auth.signOut().then(() => {
      history.push('/')
    });
  }
}

const instance = new firebaseService();

export default instance;