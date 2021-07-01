import firebase from "firebase/app";
// importing firebases util from firebase package  it gives access to db and auth

import "firebase/firestore";
import "firebase/auth";
//? firebase config script from firebase console
const config = {
  apiKey: "AIzaSyAvs96p9jH1_cX2w3J3z06E5qLHPo5nVqY",
  authDomain: "muscle-nepal.firebaseapp.com",
  projectId: "muscle-nepal",
  storageBucket: "muscle-nepal.appspot.com",
  messagingSenderId: "790947193360",
  appId: "1:790947193360:web:8f8d5c57fe3d513dc62095",
};

// initialiing firebase app with our id
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // querying for the doc to get data ref (doc ref)

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const collectionRef = firestore.collection(`users`);
  // userref is query ref which gives snapshot which in turn gives info about data at place
  // it is either doc reference or collecton ref
  const snapShot = await userRef.get();
  console.log("this is the user reference obj", userRef, collectionRef);
  console.log(snapShot);
  // snapshot obj has data we looking for
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    //adding new db
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// export the auth and firestore(db)
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// create a provider for auth
// ? making obj from the firebase.auth and within the GoogleAuthProvider class
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
// selectiing google for popup...there could be others like twitter ,fb

export const createCollectionAndDocs = async (collectionkey, objectToAdd) => {
  //creating collection
  const collectionsRef = firestore.collection(collectionkey);

  const batch = firestore.batch();
  //batching all the calls for atomicity
  objectToAdd.forEach((obj) => {
    //? creating a doc ref for each of the item using the collectionRef and setting value to docrefs
    const docRef = collectionsRef.doc();
    batch.set(docRef, obj);
  });
  // to fire the set using batch we use commit method which is async
  return await batch.commit();
};
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  console.log(transformedCollection, "this is transformed");
  return transformedCollection.reduce((acc, collection) => {
    //adding prop to the object and returning the obj
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
