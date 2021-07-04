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

  const registerInitial = {
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
  }
  const stationInitial = {

    status: "WAITING",  //
    stationId: "",
    salesMethod: "",   //
    salesPortion: 0,
    preSalesIds: [],   //
    preSalesManagers: [],
    buyer: "",
    buyerPortion: 0,
    contractDoc: "",

    createdBy: "",  //
    approvedBy: "",
    reservedBy: "",   //
    bReserved: false,
    amount: 0,      // 
    totalPrice: 0,    //
    depositor: "",
    bank: "",
    bankAccount: "",
    bIsOn: false,
    lastUpdated: "",


  }


  const franchiseInitial = {

    contractDocs: [],

    storeName: "",
    storeMainAddress: "",
    storeRestAddress: "",
    storeOwnerPhoneNumber: "",
    storePhoneNumber: "",
    storeOwner: "",

    storePhoto: [],
    naverStoreUrl: "",
    lat: 0,
    longi: 0,

    createdBy: "",


  }
  const contractInitial = {
    contractType: "",
    stationDoc: "",
    franchiseDoc: "", //
    stationId: "",
    createdBy: "",
    approvedBy: "",
    sendBy: "",
    contractedBy: "", //
    contractYear: 0,

    status: "WAITING",


    rejectedReason: "",

    storeOwner: "",
    storePortion: 0,
    storeBonusPortion: 0,
    storeOwnerSignature: "",//

    stationMethod: "",


    salesManager: "", //
    salesPortion: 0,  //


    buyer: "",
    buyerPortion: 0,


    bStoreOwnerRegistered: false,

    bNeedToSend: false,
    bNeedToRetrieve: false,
    retrievingAskedBy: "",

    postCode: "",



  }

  const [register, setRegister] = React.useState(registerInitial);
  const [station, setStation] = React.useState(stationInitial);

  const [franchise, setFranchiseContract] = React.useState(franchiseInitial);

  const [contract, setContract] = React.useState(contractInitial);

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
        applicaitonDB = constant.dbCollection.contract;
      } else if (role === "storeOwner") {
        applicaitonDB = constant.dbCollection.contract;
      } else {
        alert("다시 시도해 주세요");
        return;
      }
      const applicationRef = db
        .collection(applicaitonDB)
        .where(role, "==", userId);

      const querySnapshot = await applicationRef.get();
      // 여기서 투두닷
      // 여기서 투두닷



      querySnapshot.forEach(async (doc) => {
        dataArray.push({ id: doc.id, data: doc.data() });
      });


      await Promise.all(dataArray.map(async (value, index) => {
        let hasFranchiseDoc = typeof value.data.franchiseDoc !== "undefined"
        console.log("닥", hasFranchiseDoc, value.data.franchiseDoc)
        if (hasFranchiseDoc) {
          const franchiseData = await db
            .collection(constant.dbCollection.franchise)
            .doc(value.data.franchiseDoc).get()
          console.log("프차", franchiseData.data())
          dataArray[index].franchise = franchiseData.data()

        }
      }))


      return {
        code: 200,
        data: dataArray
      };
    } catch (error) {
      console.log(error)

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
  async function setRegister_initialize(a) {
    await setRegister(registerInitial);
  }
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






  // station
  async function setStation_initialize(a) {
    setStation(stationInitial);
  }
  async function setStation_status(a) {
    await setStation((prevState) => {
      return { ...prevState, status: a };
    });
  }

  async function setStation_stationId(a) {
    await setStation((prevState) => {
      return { ...prevState, stationId: a };
    });
  }
  async function setStation_contractDoc(a) {
    await setStation((prevState) => {
      return { ...prevState, contractDoc: a };
    });
  }
  async function setStation_createdBy(a) {
    await setStation((prevState) => {
      return { ...prevState, createdBy: a };
    });
  }
  async function setStation_approvedBy(a) {
    await setStation((prevState) => {
      return { ...prevState, approvedBy: a };
    });
  }

  async function setStation_reservedBy(a) {
    await setStation((prevState) => {
      return { ...prevState, reservedBy: a };
    });
  }

  async function setStation_bIsOn(a) {
    await setStation((prevState) => {
      return { ...prevState, bIsOn: a };
    });
  }
  async function setStation_lastUpdated(a) {
    await setStation((prevState) => {
      return { ...prevState, lastUpdated: a };
    });
  }



  async function setStation_salesMethod(a) {
    await setStation((prevState) => {
      return { ...prevState, salesMethod: a };
    });
  }
  async function setStation_salesPortion(a) {
    await setStation((prevState) => {
      return { ...prevState, salesPortion: a };
    });
  }

  async function setStation_preSalesIds(a) {
    await setStation((prevState) => {
      return { ...prevState, preSalesIds: a };
    });
  }
  async function setStation_preSalesManagers(a) {
    await setStation((prevState) => {
      return {
        ...prevState,
        preSalesManagers: a
      };
    });
  }
  async function setStation_buyer(a) {
    await setStation((prevState) => {
      return { ...prevState, buyer: a };
    });
  }

  async function setStation_buyerPortion(a) {
    await setStation((prevState) => {
      return { ...prevState, buyerPortion: a };
    });
  }


  async function setStation_amount(a) {
    await setStation((prevState) => {
      return { ...prevState, amount: a };
    });
  }
  async function setStation_totalPrice(a) {
    await setStation((prevState) => {
      return { ...prevState, totalPrice: a };
    });
  }

  async function setStation_bReserved(a) {
    await setStation((prevState) => {
      return { ...prevState, bReserved: a };
    });
  }

  async function setStation_depositor(a) {
    await setStation((prevState) => {
      return { ...prevState, depositor: a };
    });
  }

  async function setStation_bank(a) {
    await setStation((prevState) => {
      return { ...prevState, bank: a };
    });
  }
  async function setStation_bankAccount(a) {
    await setStation((prevState) => {
      return { ...prevState, bankAccount: a };
    });
  }

  // contract

  async function setContract_initialize(a) {
    setContract(contractInitial);
  }
  async function setContract_salesManager(a) {
    await setContract((prevState) => {
      return { ...prevState, salesManager: a };
    });
  }
  async function setContract_salesPortion(a) {
    await setContract((prevState) => {
      return { ...prevState, salesPortion: a };
    });
  }


  async function setContract_storeOwnerSignature(a) {
    await setContract((prevState) => {
      return { ...prevState, storeOwnerSignature: a };
    });
  }

  async function setContract_franchiseDoc(a) {
    await setContract((prevState) => {
      return { ...prevState, franchiseDoc: a };
    });
  }

  async function setContract_contractedBy(a) {
    await setContract((prevState) => {
      return { ...prevState, contractedBy: a };
    });
  }

  async function setContract_bStoreOwnerRegistered(a) {
    await setContract((prevState) => {
      return { ...prevState, bStoreOwnerRegistered: a };
    });
  }

  async function setContract_contractType(a) {
    await setContract((prevState) => {
      return { ...prevState, contractType: a };
    });
  }
  async function setContract_stationDoc(a) {
    await setContract((prevState) => {
      return { ...prevState, stationDoc: a };
    });
  }
  async function setContract_stationId(a) {
    await setContract((prevState) => {
      return { ...prevState, stationId: a };
    });
  }

  async function setContract_createdBy(a) {
    await setContract((prevState) => {
      return { ...prevState, createdBy: a };
    });
  }
  async function setContract_approvedBy(a) {
    await setContract((prevState) => {
      return { ...prevState, approvedBy: a };
    });
  }
  async function setContract_sendBy(a) {
    await setContract((prevState) => {
      return { ...prevState, sendBy: a };
    });
  } async function setContract_contractYear(a) {
    await setContract((prevState) => {
      return { ...prevState, contractYear: a };
    });
  }
  async function setContract_status(a) {
    await setContract((prevState) => {
      return { ...prevState, status: a };
    });
  }
  async function setContract_rejectedReason(a) {
    await setContract((prevState) => {
      return { ...prevState, rejectedReason: a };
    });
  }
  async function setContract_storeOwner(a) {
    await setContract((prevState) => {
      return { ...prevState, storeOwner: a };
    });
  }
  async function setContract_storePortion(a) {
    await setContract((prevState) => {
      return { ...prevState, storePortion: a };
    });
  } async function setContract_storeBonusPortion(a) {
    await setContract((prevState) => {
      return { ...prevState, storeBonusPortion: a };
    });
  }
  async function setContract_stationMethod(a) {
    await setContract((prevState) => {
      return { ...prevState, stationMethod: a };
    });
  }
  async function setContract_salesMethod(a) {
    await setContract((prevState) => {
      return { ...prevState, salesMethod: a };
    });
  }
  async function setContract_buyer(a) {
    await setContract((prevState) => {
      return { ...prevState, buyer: a };
    });
  }


  async function setContract_buyerPortion(a) {
    await setContract((prevState) => {
      return { ...prevState, buyerPortion: a };
    });
  }
  async function setContract_bNeedToSend(a) {
    await setContract((prevState) => {
      return { ...prevState, bNeedToSend: a };
    });
  } async function setContract_bNeedToRetrieve(a) {
    await setContract((prevState) => {
      return { ...prevState, bNeedToRetrieve: a };
    });
  }
  async function setContract_retrievingAskedBy(a) {
    await setContract((prevState) => {
      return { ...prevState, retrievingAskedBy: a };
    });
  }
  async function setContract_postCode(a) {
    await setContract((prevState) => {
      return { ...prevState, postCode: a };
    });
  }








  // franchise

  async function setFranchise_initialize(a) {
    setFranchiseContract(franchiseInitial);
    setContract(contractInitial)
  }
  async function setFranchise_storeName(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storeName: a };
    });
  }
  async function setFranchise_storeMainAddress(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storeMainAddress: a };
    });
  }
  async function setFranchise_storeRestAddress(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storeRestAddress: a };
    });
  }
  async function setFranchise_storeOwnerPhoneNumber(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storeOwnerPhoneNumber: a };
    });
  }
  async function setFranchise_storePhoneNumber(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storePhoneNumber: a };
    });
  }
  async function setFranchise_storeOwner(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storeOwner: a };
    });
  }
  async function setFranchise_storePortion(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storePortion: a };
    });
  }
  async function setFranchise_storeBonusPortion(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storeBonusPortion: a };
    });
  }



  async function setFranchise_stationMethod(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, stationMethod: a };
    });
  }

  async function setFranchise_storePhoto(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, storePhoto: [...prevState.storePhoto, a] };
    });
  }
  async function setFranchise_naverStoreUrl(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, naverStoreUrl: a };
    });
  }

  async function setFranchise_stationDocs(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, stationDocs: a };
    });
  }

  async function setFranchise_contractDocs(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, contractDocs: a };
    });
  }

  async function setFranchise_contractYear(a) {
    await setFranchiseContract((prevState) => {
      return { ...prevState, contractYear: a };
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
          getRegisterObj: register,
          setRegister_initialize,
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
          // station
          getStationObj: station,
          setStation_initialize,
          setStation_status,
          setStation_stationId,
          setStation_contractDoc,
          setStation_createdBy,
          setStation_approvedBy,
          setStation_reservedBy,
          setStation_bIsOn,
          setStation_lastUpdated,
          setStation_salesMethod,
          setStation_salesPortion,
          setStation_preSalesIds,
          setStation_preSalesManagers,
          setStation_buyer,
          setStation_buyerPortion,
          setStation_amount,
          setStation_totalPrice,
          setStation_bReserved,
          setStation_depositor,
          setStation_bank,
          setStation_bankAccount,
          // contract
          getContractObj: contract,
          setContract_initialize,
          setContract_salesManager,
          setContract_salesPortion,
          setContract_storeOwnerSignature,
          setContract_franchiseDoc,
          setContract_contractedBy,
          setContract_bStoreOwnerRegistered,
          setContract_contractType,
          setContract_stationDoc,
          setContract_stationId,
          setContract_createdBy,
          setContract_approvedBy,
          setContract_sendBy,
          setContract_contractYear,
          setContract_status,
          setContract_rejectedReason,
          setContract_storeOwner,
          setContract_storePortion,
          setContract_storeBonusPortion,
          setContract_stationMethod,
          setContract_buyer,
          setContract_buyerPortion,
          setContract_bNeedToSend,
          setContract_bNeedToRetrieve,
          setContract_retrievingAskedBy,
          setContract_postCode,
          // franchise
          getFranchiseObj: franchise,
          setFranchise_initialize,
          setFranchise_storeName,
          setFranchise_storeMainAddress,
          setFranchise_storeRestAddress,
          setFranchise_storeOwnerPhoneNumber,
          setFranchise_storePhoneNumber,
          setFranchise_storeOwner,
          setFranchise_storePortion,
          setFranchise_storeBonusPortion,
          setFranchise_storePhoto,
          setFranchise_naverStoreUrl,
          setFranchise_contractYear,
          setFranchise_stationDocs,
          setFranchise_contractDocs,
          setFranchise_stationMethod,

          registerInitial,
          stationInitial,
          franchiseInitial,
          contractInitial
        }}
      >
        {/* <ThemeUpdateContext.Provider value={{ userNinfo, getUserNinfo }}> */}
        {children}
        {/* </ThemeUpdateContext.Provider> */}
      </GlobalContext.Provider>
    </>
  );
}
