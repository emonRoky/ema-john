import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () =>{
   if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
   }
}


export const handelGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(result =>{
      const {displayName, email, photoURL} = result.user;
      const signedUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedUser;
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  export const handelFbSignIn = () =>{
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(fbprovider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  export const handelSignOut = () =>{
    return firebase.auth().signOut()
    .then(result =>{
      const logedOutUser = {
        isSignedIn: false,
        name:'',
        email:'',
        photo:'',
        error:'',
        success: false
      }
      return logedOutUser;
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInwithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
     
    });
  }

  const updateUserName = name =>{
    var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name
      }).then(function() {
        // Update successful.
        console.log("user name updated successfully");
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
  
  }