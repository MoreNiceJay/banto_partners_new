import React, { useEffect, useState } from "react";
import firebase from "./firebaseConfig";
export const AuthContext = React.createContext();
export function useAuth() {
  return React.useContext(AuthContext);
}
//2.

//3.
export const AuthProvider = ({ children }) => {
  let db = firebase.firestore();
  let userRef = db.collection("Users");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [bUserInfoAdded, setBUserInfoAdded] = useState(false);
  var auth = firebase.auth();
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        setUserStatus();
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const sendPasswordResetEmail = (email) => {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const sendEmailVerfication = () => {
    user
      .sendEmailVerification()
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const singUpWithEmail = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setUserStatus();
          userRef.doc(email).set({});
          resolve(userRef.doc(email));
        })
        .catch((error) => {
          reject(error);
          // ...
        });
    });
  };
  const singInWithEmail = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log("로그인 벨류", value);
        setUserStatus();

        return Promise.resolve({ success: true });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // window.alert(errorMessage);
        // ...
        return Promise.reject({ errorCode, errorMessage });
      });
    return Promise.resolve();
  };
  const setUserStatus = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...

        console.log("로그인!", displayName, email, emailVerified, uid);
        console.log("로그인!", user);
        setUser(user);
        setIsLogin(true);
      } else {
        // User is signed out.
        // ...
        setUser(null);
        setIsLogin(false);

        console.log("로그아웃...");
      }
    });
  };

  const updateUserPhoneNumber = (phoneNumber) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  useEffect(() => {
    setUserStatus();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin,
        bUserInfoAdded,
        signOut,
        sendPasswordResetEmail,
        sendEmailVerfication,
        singUpWithEmail,
        singInWithEmail,
        setUserStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
