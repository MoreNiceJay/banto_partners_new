import React from "react";
import firebase from "./firebaseConfig";
import moment from "moment";
import { ThemeConsumer } from "styled-components";
import { reject } from "lodash";
import * as constant from "./Const";
var db = firebase.firestore();

const GlobalContext = React.createContext();
export function useGlobal() {
  return React.useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState({
    phoneNumber: ""
  });
  let db = firebase.firestore();

  async function setUser(a) {
    await setUserInfo((prevState) => {
      return { ...prevState, phoneNumber: a };
    });
  }
  const [register, setRegister] = React.useState({
    phoneNumber: "",
    email: "",
    name: "",
    birthdate: "",
    bank: "",
    accountNumber: "",
    accountHolder: "",
    id: "",
    point: 0,
    bPrivacyInfoAgreed: false,
    bProfitable: false,
    bBusinessLicense: false,
    businessNumber: "",
    identification: "",
    businessLicenseImg: ""
  });
  const [invest, setInvest] = React.useState({
    applicationId: "",
    status: "WAITING",
    stationId: "",
    salesMethod: "",
    salesPortion: 0,
    salesManager: "",
    preSalesIds: [],
    preSalesManagers: [],
    buyer: "",
    buyerPortion: 0,
    storeOwner: "",
    storePortion: "",
    storeBonusPortion: "",
    amount: 0,
    totalPrice: 0,
    bReserved: false,
    depositor: "",
    bank: "",
    bankAccount: "",
    createdBy: "",
    confirmedBy: "",
    installedBy: "",
    franchiseDoc: "",
    bIsOn: false,
    bNeedToSend: false,
    bNeedToRetrieve: false,
    retrievingAskedBy: "",
    registeredBy: "",
    lastUpdated: ""
  });

  const [store, setStore] = React.useState({
    applicationId: "",
    stationDoc: "",
    status: "WAITING",
    storeName: "",
    storeMainAddress: "",
    storeRestAddress: "",
    storeOwnerPhoneNumber: "",
    storePhoneNumber: "",
    storeOwner: "",
    storePortion: 0,
    storeBonusPortion: 0,
    salesManager: "",
    salesPortion: 0,
    buyer: "",
    buyerPortion: 0,
    stationId: [],
    storePhoto: [],
    naverStoreUrl: "",
    createdBy: "",
    confirmedBy: "",
    contractYear: 0
  });

  const [salesRegisterationInfo, setSalesRegisterationInfo] = React.useState({
    applicationId: "",
    stationDoc: "",

    status: "WAITING",
    storeName: "",
    storeMainAddress: "",
    storeRestAddress: "",
    storeOwnerPhoneNumber: "",
    storePhoneNumber: "",
    storeOwner: "",
    storePortion: 0,
    storeBonusPortion: 0,
    salesManager: "",
    salesPortion: 0,
    buyer: "",
    buyerPortion: 0,
    stationId: [],
    storePhoto: [],
    naverStoreUrl: "",
    createdBy: "",

    confirmedBy: "",
    contractYear: 0
  });

  async function isAvailable(stationId) {
    return new Promise((resolve, reject) => {
      let stationRef = db.collection("Stations");
      let stations = stationRef.where("stationId", "==", stationId);
      stations.get().then(function (qs) {
        // qs.forEach(function (doc) {
        //   console.log(doc.id, " => ", doc.data());
        //   console.log(doc.length, " => ", typeof doc);
        if (qs.size) {
          resolve({ code: 200, data: qs });
        } else {
          resolve({ code: 200, data: null });
        }
        // });
      });
    }).catch(function (error) {
      reject({ code: 400, msg: "시스템에러 고객센터에 문의해주세요" });
    });
  }

  async function fetchApplications(userId, role) {
    try {
      const dataArray = [];
      let applicaitonDB;
      if (role === "buyer") {
        applicaitonDB = constant.dbCollection.buyerApplication;
      } else if (role === "salesManager") {
        applicaitonDB = constant.dbCollection.salesApplication;
      } else if (role === "storeOwner") {
        applicaitonDB = constant.dbCollection.storeApplication;
      } else {
        alert("다시 시도해 주세요");
        return;
      }
      const applicationRef = db
        .collection(applicaitonDB)
        .where(role, "==", userId);

      const querySnapshot = await applicationRef.get();

      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });

      return {
        code: 200,
        data: dataArray
      };
    } catch (error) {
      return {
        code: 400,
        msg: "시스템에러 고객센터에 문의해주세요"
      };
    }
  }
  async function isAvailable(stationId) {
    return new Promise((resolve, reject) => {
      let stationRef = db.collection("Stations");
      let stations = stationRef.where("stationId", "==", stationId);
      stations.get().then(function (qs) {
        // qs.forEach(function (doc) {
        //   console.log(doc.id, " => ", doc.data());
        //   console.log(doc.length, " => ", typeof doc);
        if (qs.size) {
          resolve({ code: 200, data: qs });
        } else {
          resolve({ code: 200, data: null });
        }
        // });
      });
    }).catch(function (error) {
      reject({ code: 400, msg: "시스템에러 고객센터에 문의해주세요" });
    });
  }
  async function getBuyerId(stationId) {
    return new Promise((resolve, reject) => {
      let stationRef = db.collection("Stations");
      let stations = stationRef.where("stationId", "==", stationId);
      let buyerId = "";
      let buyerPortion = 0;
      stations.get().then(function (qs) {
        qs.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          buyerId = doc.data().buyer;
          buyerPortion = doc.data().buyerPortion;
        });

        if (qs.size) {
          resolve({ code: 200, data: { buyer: buyerId, buyerPortion } });
        } else {
          resolve({ code: 200, data: null });
        }
      });
    }).catch(function (error) {
      reject({ code: 400, msg: "시스템에러 고객센터에 문의해주세요" });
    });
  }

  // register
  async function setRegister_phoneNumber(a) {
    await setRegister((prevState) => {
      return { ...prevState, phoneNumber: a };
    });
  }
  async function setRegister_email(a) {
    await setRegister((prevState) => {
      const lowercaseA = a.toLowerCase();
      return { ...prevState, email: lowercaseA };
    });
  }

  async function setRegister_name(a) {
    await setRegister((prevState) => {
      return { ...prevState, name: a };
    });
  }

  async function setRegister_birthdate(a) {
    await setRegister((prevState) => {
      return { ...prevState, birthdate: a };
    });
  }

  async function setRegister_bank(a) {
    await setRegister((prevState) => {
      return { ...prevState, bank: a };
    });
  }

  async function setRegister_id(a) {
    await setRegister((prevState) => {
      console.log("에이다", a);
      return { ...prevState, id: a };
    });
  }

  async function setRegister_accountNumber(a) {
    await setRegister((prevState) => {
      return { ...prevState, accountNumber: a };
    });
  }

  async function setRegister_accountHolder(a) {
    await setRegister((prevState) => {
      return { ...prevState, accountHolder: a };
    });
  }

  async function setRegister_bBusinessLicense(a) {
    await setRegister((prevState) => {
      return { ...prevState, bBusinessLicense: a };
    });
  }
  async function setRegister_businessLicenseImg(a) {
    await setRegister((prevState) => {
      return { ...prevState, businessLicenseImg: a };
    });
  }

  // invest
  async function setInvest_salesMethod(a) {
    await setInvest((prevState) => {
      return { ...prevState, salesMethod: a };
    });
  }
  async function setInvest_salesPortion(a) {
    await setInvest((prevState) => {
      return { ...prevState, salesPortion: a };
    });
  }
  async function setInvest_salesManager(a) {
    await setInvest((prevState) => {
      return { ...prevState, salesManager: a };
    });
  }
  async function setInvest_preSalesIds(a) {
    await setInvest((prevState) => {
      return { ...prevState, preSalesIds: a };
    });
  }
  async function setInvest_preSalesManagers(a) {
    await setInvest((prevState) => {
      return {
        ...prevState,
        preSalesManagers: a
      };
    });
  }
  async function setInvest_buyer(a) {
    await setInvest((prevState) => {
      return { ...prevState, buyer: a };
    });
  }

  async function setInvest_buyerPortion(a) {
    await setInvest((prevState) => {
      return { ...prevState, buyerPortion: a };
    });
  }
  async function setInvest_storeOwner(a) {
    await setInvest((prevState) => {
      return { ...prevState, storeOwner: a };
    });
  }

  async function setInvest_storePortion(a) {
    await setInvest((prevState) => {
      return { ...prevState, storePortion: a };
    });
  }

  async function setInvest_amount(a) {
    await setInvest((prevState) => {
      return { ...prevState, amount: a };
    });
  }
  async function setInvest_totalPrice(a) {
    await setInvest((prevState) => {
      return { ...prevState, totalPrice: a };
    });
  }

  async function setInvest_bReserved(a) {
    await setInvest((prevState) => {
      return { ...prevState, bReserved: a };
    });
  }

  async function setInvest_depositor(a) {
    await setInvest((prevState) => {
      return { ...prevState, depositor: a };
    });
  }

  async function setInvest_bank(a) {
    await setInvest((prevState) => {
      return { ...prevState, bank: a };
    });
  }
  async function setInvest_bankAccount(a) {
    await setInvest((prevState) => {
      return { ...prevState, bankAccount: a };
    });
  }

  // store
  async function setStore_storeName(a) {
    await setStore((prevState) => {
      return { ...prevState, storeName: a };
    });
  }
  async function setStore_storeMainAddress(a) {
    await setStore((prevState) => {
      return { ...prevState, storeMainAddress: a };
    });
  }
  async function setStore_storeRestAddress(a) {
    await setStore((prevState) => {
      return { ...prevState, storeRestAddress: a };
    });
  }
  async function setStore_storeOwnerPhoneNumber(a) {
    await setStore((prevState) => {
      return { ...prevState, storeOwnerPhoneNumber: a };
    });
  }
  async function setStore_storePhoneNumber(a) {
    await setStore((prevState) => {
      return { ...prevState, storePhoneNumber: a };
    });
  }
  async function setStore_storeOwner(a) {
    await setStore((prevState) => {
      return { ...prevState, storeOwner: a };
    });
  }
  async function setStore_storePortion(a) {
    await setStore((prevState) => {
      return { ...prevState, storePortion: a };
    });
  }
  async function setStore_storeBonusPortion(a) {
    await setStore((prevState) => {
      return { ...prevState, storeBonusPortion: a };
    });
  }

  async function setStore_salesManager(a) {
    await setStore((prevState) => {
      return { ...prevState, salesManager: a };
    });
  }
  async function setStore_salesPortion(a) {
    await setStore((prevState) => {
      return { ...prevState, salesPortion: a };
    });
  }

  async function setStore_buyer(a) {
    await setStore((prevState) => {
      return { ...prevState, buyer: a };
    });
  }

  async function setStore_buyerPortion(a) {
    await setStore((prevState) => {
      return { ...prevState, buyerPortion: a };
    });
  }
  async function setStore_stationId(a) {
    await setStore((prevState) => {
      return { ...prevState, stationId: a };
    });
  }
  async function setStore_storePhoto(a) {
    await setStore((prevState) => {
      return { ...prevState, stationId: [...prevState.storePhoto, a] };
    });
  }
  async function setStore_naverStoreUrl(a) {
    await setStore((prevState) => {
      return { ...prevState, naverStoreUrl: a };
    });
  }
  async function setStore_contractYear(a) {
    await setStore((prevState) => {
      return { ...prevState, contractYear: a };
    });
  }
  async function setStore_stationDoc(a) {
    await setStore((prevState) => {
      return { ...prevState, stationDoc: a };
    });
  }

  // sales
  async function setSales_storeName(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeName: a };
    });
  }
  async function setSales_storeMainAddress(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeMainAddress: a };
    });
  }
  async function setSales_storeRestAddress(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeRestAddress: a };
    });
  }
  async function setSales_storeOwnerPhoneNumber(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeOwnerPhoneNumber: a };
    });
  }
  async function setSales_storePhoneNumber(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storePhoneNumber: a };
    });
  }
  async function setSales_storeOwner(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeOwner: a };
    });
  }
  async function setSales_storePortion(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storePortion: a };
    });
  }
  async function setSales_storeBonusPortion(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeBonusPortion: a };
    });
  }

  async function setSales_salesManager(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, salesManager: a };
    });
  }
  async function setSales_salesPortion(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, salesPortion: a };
    });
  }

  async function setSales_buyer(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, buyer: a };
    });
  }

  async function setSales_buyerPortion(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, buyerPortion: a };
    });
  }
  async function setSales_stationId(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, stationId: a };
    });
  }
  async function setSales_storePhoto(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, stationId: [...prevState.storePhoto, a] };
    });
  }
  async function setSales_naverStoreUrl(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, naverStoreUrl: a };
    });
  }
  async function setSales_contractYear(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, contractYear: a };
    });
  }
  async function setSales_stationDoc(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, stationDoc: a };
    });
  }

  return (
    <>
      <GlobalContext.Provider
        value={{
          isAvailable,
          getBuyerId,
          fetchApplications,
          // getUser: userInfo,
          // setUser: setUser,
          // register
          getRegisterInfo: register,
          setRegister_email,
          setRegister_phoneNumber,
          setRegister_name,
          setRegister_birthdate,
          setRegister_bank,
          setRegister_id,
          setRegister_accountNumber,
          setRegister_accountHolder,
          setRegister_bBusinessLicense,
          setRegister_businessLicenseImg,
          // invest
          getInvestInfo: invest,
          setInvest_bankAccount,
          setInvest_bank,
          setInvest_depositor,
          setInvest_bReserved,
          setInvest_totalPrice,
          setInvest_amount,
          setInvest_storePortion,
          setInvest_storeOwner,
          setInvest_buyerPortion,
          setInvest_buyer,
          setInvest_preSalesManagers,
          setInvest_preSalesIds,
          setInvest_salesManager,
          setInvest_salesPortion,
          setInvest_salesMethod,
          // sales
          salesInfo: salesRegisterationInfo,
          setSales_storeName,
          setSales_storeMainAddress,
          setSales_storeRestAddress,
          setSales_storeOwnerPhoneNumber,
          setSales_storePhoneNumber,
          setSales_storeOwner,
          setSales_storePortion,
          setSales_salesManager,
          setSales_salesPortion,
          setSales_storeBonusPortion,
          setSales_buyer,
          setSales_buyerPortion,
          setSales_stationId,
          setSales_storePhoto,
          setSales_naverStoreUrl,
          setSales_contractYear,
          setSales_stationDoc,
          // Store
          getStoreInfo: store,
          setStore_storeName,
          setStore_storeMainAddress,
          setStore_storeRestAddress,
          setStore_storeOwnerPhoneNumber,
          setStore_storePhoneNumber,
          setStore_storeOwner,
          setStore_storePortion,
          setStore_salesManager,
          setStore_salesPortion,
          setStore_storeBonusPortion,
          setStore_buyer,
          setStore_buyerPortion,
          setStore_stationId,
          setStore_storePhoto,
          setStore_naverStoreUrl,
          setStore_contractYear,
          setStore_stationDoc
        }}
      >
        {/* <ThemeUpdateContext.Provider value={{ userNinfo, getUserNinfo }}> */}
        {children}
        {/* </ThemeUpdateContext.Provider> */}
      </GlobalContext.Provider>
    </>
  );
}
