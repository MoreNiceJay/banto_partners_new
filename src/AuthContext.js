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
      console.log("유저인포체인지드", user);
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
          if (!user.email) {
            return { code: 200, data: null };
          }
          if (!user) {
            console.log(user, "user1");

            return { code: 200, data: null };
          }
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
      console.log(userInfo, "유저인포");
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
    try {
      await firebase.auth().signOut();
      // Sign-out successful.
      await fetchUserStatus();

      // delete all context info
      return { code: 200 };
      // An error happened
    } catch (e) {
      console.log(e);
      return { code: 400, msg: "시스템 에러 고객센터에 문의해주세요" };
    }
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
  const updateExtraProfiles = async (data) => {
    let user = firebase.auth().currentUser;
    if (!user) {
      return { code: 400, message: "로그인이 필요합니다" };
    }

    var postData = {
      data
    };
    try {
      await userRef.doc(user.email).set(postData);
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
      return { code: 200 };
      console.log(value);
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // window.alert(errorMessage);
      // ...
      return { code: 400, msg: errorCode };
      console.log("1", errorCode);
      console.log("2", errorMessage);
    }
  };

  const fetchUserStatus = async () => {
    try {
      console.log(user, "user");
      if (!user.email) {
        return { code: 200, data: null };
      }
      if (!user) {
        console.log(user, "user1");

        return { code: 200, data: null };
      }
      console.log(user, "user2");

      const userRef = db.collection("Users").doc(user.email);
      const doc = await userRef.get();
      let otherInfo = {};
      if (doc.exists) {
        otherInfo = doc.data();
      } else {
        return { code: 400, msg: "시스템 오류 다시 시도해주세요" };
      }
      return { code: 200, data: otherInfo };
    } catch (e) {
      console.log("5", e);
      return { code: 400, msg: "시스템 오류 다시 시도해주세요" };
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
    let user = firebase.auth().currentUser;

    if (!user) {
      return { code: 400, msg: "로그인이 필요합니다" };
    }
    try {
      if (role === constant.role.buyer) {
        let today = String(new Date());
        application.applicationId = uuidv4();
        application.createdBy = today;
        await db
          .collection("BuyerApplications")
          .doc(`${application.buyer}_${today}`)
          .set(application);
        return { code: 200 };
      }
      if (role === constant.role.sales) {
        //나갔는지 확인
        const stationQs = await db
          .collection(constant.dbCollection.station)
          .doc(application.stationDoc)
          .get();

        if (!stationQs.exists) {
          return { code: 400, msg: "스테이션이 삭제되었습니다" };
        }
        if (stationQs.bReserved) {
          return { code: 400, msg: "스테이션이 이미 예약되었습니다" };
        }

        let today = String(new Date());
        application.applicationId = uuidv4();
        application.createdBy = today;
        await db
          .collection("SalesApplications")
          .doc(`${application.storeName}_${today}`)
          .set(application);

        await db
          .collection(constant.dbCollection.station)
          .doc(application.stationDoc)
          .update({ bReserved: true });
        return { code: 200 };
      }
      if (role === constant.role.store) {
        console.log(application.stationDoc, "application.stationDoc");
        if (application.stationDoc !== "") {
          const stationQs = await db
            .collection(constant.dbCollection.station)
            .doc(application.stationDoc)
            .get();

          if (!stationQs.exists) {
            return { code: 400, msg: "스테이션이 삭제되었습니다" };
          }
          if (stationQs.bReserved) {
            return { code: 400, msg: "스테이션이 이미 예약되었습니다" };
          }
        }

        let today = String(new Date());
        application.applicationId = uuidv4();
        application.createdBy = today;
        if (application.stationDoc !== "") {
          await db
            .collection(constant.dbCollection.station)
            .doc(application.stationDoc)
            .update({ bReserved: true });
        }

        await db
          .collection("StoreApplications")
          .doc(`${application.storeName}_${today}`)
          .set(application);

        return { code: 200 };
      }
    } catch (e) {
      console.log(e);
      return { code: 400, msg: e };
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
