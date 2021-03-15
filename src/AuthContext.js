import React, { useEffect, useState } from "react";
import firebase from "./firebaseConfig";
import moment from "moment";
import * as common from "./common";
import * as constant from "./Const";

import { _ } from "lodash";
var db = firebase.firestore();

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
  const [userExtraInfo, setUserExtraInfo] = useState(null);
  const [userId, setUserId] = useState(null);

  const [isLogin, setIsLogin] = useState(false);
  const [userStations, setUserStations] = useState([]);
  const [pending, setPending] = useState(true);
  const [secondPending, setSecondPending] = useState(true);
  //필요있는지 생각해보기
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [bExtraInfo, setBExtraInfo] = useState(true);
  var auth = firebase.auth();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setPending(false);
      }
      setUser(user);
    });
  }, []);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const fetchUserStatus = async () => {
        try {
          const userRef = db.collection("Users").doc(user.email);
          const doc = await userRef.get();
          let otherInfo = {};
          if (doc.exists) {
            otherInfo = doc.data();
          }
          return { code: 200, data: otherInfo };
        } catch (e) {
          console.log("5", e);
        }
      };
      const fetchStations = async (userId) => {
        try {
          let stationRef = db.collection("Stations");
          let query = stationRef.where("buyer", "==", userId);
          let array = [];
          const querySnapshot = await query.get();
          querySnapshot.forEach(function (doc) {
            let data = doc.data();
            array.push(data);
          });
          return { code: 200, data: array };
        } catch (e) {
          return { code: 400, msg: "시스템에러 고객센터에 문의해주세요" };
        }
      };

      if (!user) {
        return;
      }
      const userInfo = await fetchUserStatus();

      if (userInfo.code !== 200) {
        console.log(userInfo.msg);
        return;
      }
      console.log("엑스트라인포", userInfo.data);
      setUserExtraInfo(userInfo.data);
      const userStations = await fetchStations(user.email);
      if (userStations.code !== 200) {
        console.log(userStations.msg);
        return;
      }
      console.log(userStations.data);
      setUserStations(userStations.data);
      setPending(false);
    };

    fetchUserInfo();
  }, [user]);

  if (pending) {
    return <>Loading...</>;
  }

  const signOut = async () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        fetchUserStatus();

        // delete all context info
        return { code: 200 };
      })
      .catch(function (error) {
        // An error happened
        return { code: 400, msg: "시스템 에러 고객센터에 문의해주세요" };
      });
  };

  // 디비 관련 함수 (유저가 아님 TODO: 나중에 옮기기)
  const createStoreApplication = () => {
    const applicationRef = db.collection("Applications");
    applicationRef.add({
      progress: "discussing",
      userId: user.email,
      createdAt: moment().format()
    });
  };

  //디비 관련 함수 끝
  const updateExtraProfiles = async ({
    name,
    birthdate,
    bank,
    accountNumber,
    accountHolder,
    bBusinessLicense,
    businessLicenseImg
  }) => {
    let user = firebase.auth().currentUser;
    if (!user) {
      return { code: 400, message: "로그인이 필요합니다" };
    }

    var postData = {
      bExtraInfoUpdated: true,
      name,
      birthdate,
      bank,
      accountNumber,
      accountHolder,
      bBusinessLicense,
      businessLicenseImg
    };
    try {
      await userRef.doc(user.email).update(postData);
    } catch (e) {
      alert(e);
      return { code: 400, msg: "시스템 에러, 다시시도해 주세요" };
    }
    return { code: 200 };
  };

  const sendPasswordResetEmail = (email) => {
    return new Promise((resolve, reject) => {
      auth
        .sendPasswordResetEmail(email)
        .then(function () {
          resolve();
        })
        .catch(function (error) {
          reject(error);
        });
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
          setUserExtraInfo();
          userRef.doc(email).set({
            bExtraInfoUpdated: false,
            id: common.shuffle(7)
          });
          resolve(userRef.doc(email));
        })
        .catch((error) => {
          reject(error);
          console.log(error);
          // ...
        });
    });
  };
  const singInWithEmail = async (email, password) => {
    try {
      let value = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(value);
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // window.alert(errorMessage);
      // ...
      console.log("1", errorCode);
      console.log("2", errorMessage);
    }
  };

  const fetchUserStatus = async () => {
    try {
      const userRef = db.collection("Users").doc(user.email);
      const doc = await userRef.get();
      let otherInfo = {};
      if (doc.exists) {
        otherInfo = doc.data();
      }
      return { code: 200, data: otherInfo };
    } catch (e) {
      console.log("5", e);
    }
  };

  const updateUserPhoneNumber = async (userId, phoneNumber) => {
    try {
      await db.collection("Users").doc(userId).update({ phoneNumber });
      return { code: 200 };
    } catch (e) {
      console.log(e);
      return { code: 400, msg: "시스템 오류 다시 시도해주세요" };
    }
  };
  const updateApplication = async (role, application) => {
    return new Promise((resolve, reject) => {
      let user = firebase.auth().currentUser;

      if (!user) {
        reject({ code: 400, message: "로그인이 필요합니다" });
        return;
      }
      if (role === constant.role.buyer) {
        let today = String(new Date());
        application.applicationId = uuidv4();
        application.createdBy = today;
        db.collection("BuyerApplications")
          .doc(`${application.buyer}_${today}`)
          .set(application);
        resolve({ code: 200 });
        return;
      }
      if (role === constant.role.sales) {
        let today = String(new Date());
        application.applicationId = uuidv4();
        application.createdBy = today;
        db.collection("SalesApplications")
          .doc(`${application.storeName}_${today}`)
          .set(application);
        resolve({ code: 200 });
        return;
      }
      if (role === constant.role.store) {
        let today = String(new Date());
        application.applicationId = uuidv4();
        application.createdBy = today;
        db.collection("StoreApplications")
          .doc(`${application.storeName}_${today}`)
          .set(application);
        resolve({ code: 200 });
        return;
      }
    });
  };
  const fetchStations = async (userId) => {
    try {
      let stationRef = db.collection("Stations");
      let query = stationRef.where("buyer", "==", userId);
      let array = [];
      const querySnapshot = await query.get();
      querySnapshot.forEach(function (doc) {
        let data = doc.data();
        array.push(data);
      });
      return { code: 200, data: array };
    } catch (e) {
      return { code: 400, msg: "시스템에러 고객센터에 문의해주세요" };
    }
  };

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        isLogin,
        userExtraInfo,
        newMessageCount,
        bExtraInfo,
        signOut,
        sendPasswordResetEmail,
        sendEmailVerfication,
        updateUserPhoneNumber,
        singUpWithEmail,
        singInWithEmail,
        // setUserExtraInfo,
        updateExtraProfiles,
        updateApplication,
        // 디비 업데이트 함수
        createStoreApplication,
        userStations,
        fUser: firebase.auth()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
