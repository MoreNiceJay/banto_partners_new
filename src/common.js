import React, { useEffect, useState } from "react";
import firebase from "./firebaseConfig";
import moment from "moment";
import * as constant from "./Const";
import { last } from "lodash";
import axios from "axios";


let db = firebase.firestore();
let user = firebase.auth().currentUser;
export var storage = firebase.storage();

var _ = require("lodash");

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  var d = this;
  var h
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy": return d.getFullYear();
      case "yy": return (d.getFullYear() % 1000).zf(2);
      case "MM": return (d.getMonth() + 1).zf(2);
      case "dd": return d.getDate().zf(2);
      case "E": return weekName[d.getDay()];
      case "HH": return d.getHours().zf(2);
      case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm": return d.getMinutes().zf(2);
      case "ss": return d.getSeconds().zf(2);
      case "a/p": return d.getHours() < 12 ? "오전" : "오후";
      default: return $1;
    }
  });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };




export const StationObject = {
  stationId: "",
  isOn: false,
  bReserved: false,
  method: "",
  lastUpdated: "",
  status: "APPROVE",
  storeName: "",
  storeMainAddress: "",
  storeRestAddress: "",
  storeOwnerPhoneNumber: "",
  storePhoneNumber: "",
  storeOwner: "",
  storePortion: 0,
  salesManager: "",
  salesPortion: 0,
  buyerStatus: "",
  buyer: "",
  buyerPortion: 0,
  registerDate: "",
  installDate: "",
  resultData: ""
};
export const ApplicationObject = {

  status: "WAITING",
  type: "SALES",
  storeName: "",
  storeMainAddress: "",
  storeRestAddress: "",
  storeOwnerPhoneNumber: "",
  storePhoneNumber: "",
  storeOwner: "",
  storePortion: 0,
  salesManager: "",
  salesPortion: 0,
  buyerStatus: "",
  buyer: "",
  buyerPortion: 0,
  stationId: "",
  registerDate: "",
  installDate: "",
  resultData: ""
};

export async function fetchMessages(userId) {
  try {
    let dataArray = [];
    const querySnapshot = await db
      .collection("Users")
      .doc(userId)
      .collection("Messages")
      .orderBy("receivedDate", "desc")
      .get();

    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
        dataArray.push({ id: doc.id, data: doc.data() });
      }
    });

    return { code: 200, data: dataArray };
  } catch (e) {
    console.log("에러", e);
    return { code: 400, msg: "시스템에러, 다시시도해 주세요" };
  }
}

export async function fetchPartnerStations() {
  try {
    let dataArray = [];
    const stationRef = db.collection("Stations");

    const querySnapshot = await stationRef
      .where("salesMethod", "==", "banto")
      .where("bReserved", "==", false)
      .where("salesMethod", "!=", "yet")
      .get();

    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
        dataArray.push({ id: doc.id, data: doc.data() });
      }
    });

    return { code: 200, data: dataArray };
  } catch (e) {
    console.log("에러1", e);

    alert(e);

    return { code: 400, msg: "시스템에러, 다시시도해 주세요" };
  }
}
export async function fetchUserStations(userId) {
  try {
    let dataArray = [];
    const stationRef = db.collection("Stations");

    const querySnapshot = await stationRef
      .where("buyer", "==", userId)
      .where("bReserved", "==", false)
      .where("salesMethod", "!=", "yet")
      .get();

    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        dataArray.push({ id: doc.id, data: doc.data() });
      }
    });

    return { code: 200, data: dataArray };
  } catch (e) {
    console.log("에러2", e);

    alert(e);

    return { code: 400, msg: "시스템에러, 다시시도해 주세요" };
  }
}
//TODO Sales 마지막에 아직 스테이션이 남아있는지 체크
export async function fetchOwnSalesStations(id) {
  try {
    let dataArray = [];
    const stationRef = db.collection("Stations");
    const querySnapshot = await stationRef
      .where("salesMethod", "==", "ownSales")
      .where("preSalesIds", "array-contains", id)
      .where("bReserved", "==", false)
      .where("salesMethod", "!=", "yet")

      .get();

    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
        dataArray.push({ id: doc.id, data: doc.data() });
      }
    });

    return { code: 200, data: dataArray };
  } catch (e) {
    console.log("에러3", e);
    return { code: 400, msg: "시스템에러, 다시시도해 주세요" };
  }
}

export async function deleteApplication(applicationId) {
  //TODO 취소하기로 바꿔야함
  //Station reserved 취소하기
  if (!user) {
    return { code: 400, msg: "로그인이 필요합니다" };
  }
  try {
    const querySnapshot = await db
      .collection("Users")
      .doc(user.email)
      .collection("Applications").doc(applicationId)
      .get();
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
    return { code: 200 };
  } catch (e) {
    console.log("에러4", e);
    return { code: 400, msg: "시스템에러, 다시시도해 주세요" };
  }
}
export async function getStationId(stationDoc) {
  try {
    const stationDoc = await db.collection(constant.dbCollection.station).doc(stationDoc).get()
    return stationDoc.data().stationId

  } catch (error) {
    console.log(error)
  }
}

export async function fetchStations(userId, role) {
  try {
    console.log("롤", role === constant.role.store)
    console.log("롤", userId)
    console.log("롤", constant.role.storeOwner)

    var startTime = new Date().getTime();
    const dataArray = [];

    if (role === constant.role.buyer) {
      const stationnRef = db.collection(constant.dbCollection.station).where(role, "==", userId).where("approvedBy", "!=", "")

      const querySnapshot = await stationnRef.get();

      querySnapshot.forEach((doc) => {
        (dataArray.push({ id: doc.id, data: doc.data() }))

      })

      await Promise.all(dataArray.map(async (value, index) => {
        if (value.data.contractDoc === "") {
          return
        }

        const contractQs = await db.collection(constant.dbCollection.contract).doc(value.data.contractDoc).get()
        console.log("콘트렉트닥", contractQs)
        const franchiseDoc = contractQs.data().franchiseDoc
        console.log("franchiseDoc", franchiseDoc)
        const doc = await db.collection(constant.dbCollection.franchise).doc(franchiseDoc).get()

        dataArray[index].franchise = doc.data()

      }))


    } else if (role === constant.role.sales) {
      //TODO
      //세일즈 어플리케이션이 가지고 있는 프렌차이즈
      //함수 getFranchises(userId,role) 
      //프렌차이즈의 스테이션 닥으로
      //함수 getStations([docs],doctype,)   
      console.log("못들어옴?")
      const contractQs = await db.collection(constant.dbCollection.contract)
        .where("salesManger", "==", userId)
        .where("status", "==", constant.applicationStatus.approve).get()
      contractQs.forEach((doc) => {
        (dataArray.push({ id: doc.id, data: doc.data() }))
        console.log(dataArray)
      })
      await Promise.all(dataArray.map(async (value, index) => {
        if (value.data.stationDoc === "") {
          return
        }
        if (value.data.franchiseDoc === "") {
          return
        }
        const stationRef = await db.collection(constant.dbCollection.station).doc(value.data.stationDoc).get()
        if (!stationRef.exists) {
          return
        }
        const franchiseRef = await db.collection(constant.dbCollection.station).doc(value.data.franchiseDoc).get()
        if (!stationRef.exists) {
          return
        }
        dataArray[index].data = stationRef.data()
        dataArray[index].data.stationDoc = stationRef.id
        dataArray[index].franchise = franchiseRef.data()
        console.log("dataArray", dataArray)
        return
      }))


    } else if (role === constant.role.store) {
      //TODO
      //프렌차이즈를 가지고 있는 아이디 getFranchises(userId,role)
      //프렌차이즈의 스테이션 닥으로
      //함수 getStations([docs],doctype,)   
      console.log("못들어옴?")

      const contractQs = await db.collection(constant.dbCollection.contract)
        .where("storeOwner", "==", userId)
        .where("status", "==", constant.applicationStatus.approve).get()
      contractQs.forEach((doc) => {
        (dataArray.push({ id: doc.id, data: doc.data() }))

      })
      await Promise.all(dataArray.map(async (value, index) => {
        if (value.data.stationDoc === "") {
          return
        }
        if (value.data.franchiseDoc === "") {
          return
        }
        const stationRef = await db.collection(constant.dbCollection.station).doc(value.data.stationDoc).get()
        if (!stationRef.exists) {
          return
        }
        const franchiseRef = await db.collection(constant.dbCollection.franchise).doc(value.data.franchiseDoc).get()
        if (!stationRef.exists) {
          return
        }
        console.log("dataArrayid", stationRef.id)

        dataArray[index].data = stationRef.data()
        dataArray[index].data.stationDoc = stationRef.id
        dataArray[index].franchise = franchiseRef.data()
        return
      }))

    }
    var endTime = new Date().getTime();
    console.log("측정시간", endTime - startTime);

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


export async function getFranchises(userId, role) {
  // try {
  const dataArray = [];

  if (role === constant.role.buyer) {
    //아이디로 스테이션 검색 후
    //getStations
    //스테이션에 붙어 있는 프렌차이즈들 어레이에 담기  
    const tempArray = []
    const stationnRef = db.collection(constant.dbCollection.station).where(role, "==", userId).where("franchiseDoc", "!=", "")
    const querySnapshot = await stationnRef.get();

    querySnapshot.forEach((doc) => {
      tempArray.push({ id: doc.id, data: doc.data() })
    })

    await Promise.all(tempArray.map(async (value, index) => {
      const doc = await db.collection('Franchises').doc(value.data.franchiseDoc).get()
      dataArray.push({ id: doc.id, data: doc.data() })
    }))


  } else if (role === constant.role.sales) {
    //아이디로 프렌차이드 검색후
    //스테이션에 붙어 있는 프렌차이즈들 어레이에 담기
    const stationnRef = db.collection(constant.dbCollection.franchiseDoc).where(role, "==", userId).where("franchiseDoc", "!=", "")


  } else if (role === constant.role.store) {
    //아이디로 프렌차이드 검색후


  }
  return

}
export async function getStations(docs, docType) {

}

export async function insertMessageExample() {
  const data = {
    bPushNoticed: false,
    bTextNoticed: false,
    category: constant.messageCategory.info,
    content: "안녕하세요 스테이션이 승인됐습니다",
    isRead: false,
    receivedDate: String(new Date()),
    readData: String(new Date()),
    receiver: "jl55359@hanmail.net",
    role: constant.role.sales,
    sender: "jl55359@hanmail.net",
    title: "정보",
    url: "https://naver.com"
  };

  await db
    .collection("Users")
    .doc("jl55359@hanmail.net")
    .collection("Messages")
    .doc(uuidv4())
    .set(data);
}
export function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export function getTodayDateForm() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month;
}
export function getMonthDayForm(date) {
  var date = new Date(date);
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  console.log("데이트", date);
  return month + "-" + day + " (" + getInputDayLabel(date) + ")";
}
function getInputDayLabel(date) {
  var week = new Array("일", "월", "화", "수", "목", "금", "토");

  var today = new Date(date).getDay();
  var todayLabel = week[today];

  return todayLabel;
}
export function getTimeStamp() {
  var d = new Date();
  var s =
    leadingZeros(d.getFullYear(), 4) +
    "-" +
    leadingZeros(d.getMonth() + 1, 2) +
    "-" +
    leadingZeros(d.getDate(), 2) +
    " " +
    leadingZeros(d.getHours(), 2) +
    ":" +
    leadingZeros(d.getMinutes(), 2) +
    ":" +
    leadingZeros(d.getSeconds(), 2);

  return s;
}
export function getMonthDayTimeMinute(time) {
  var d = new Date(time);
  var s =

    leadingZeros(d.getMonth() + 1, 2) +
    "-" +
    leadingZeros(d.getDate(), 2) +
    "(" +
    getInputDayLabel(time) +
    ") " +
    leadingZeros(d.getHours(), 2) +
    ":" +
    leadingZeros(d.getMinutes(), 2)


  return s;
}
export function getTodayYear() {
  var d = new Date();
  var s =

    leadingZeros(d.getFullYear(), 4)



  return s;
}

export function leadingZeros(n, digits) {
  var zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
}
export function diffTime(time1, time2) {
  let t1 = moment(time1);
  let t2 = moment(time2);
  const day = moment.duration(t2.diff(t1)).days();
  const hour = moment.duration(t2.diff(t1)).hours();
  const minute = moment.duration(t2.diff(t1)).minutes();
  const second = moment.duration(t2.diff(t1)).seconds();
  if (second !== 0 && minute !== 0 && hour !== 0 && day !== 0) {
    return `${day} 일 ${hour} 시간  ${minute} 분 ${second} 초 `;
  }
  if (second !== 0 && minute !== 0 && hour !== 0 && day === 0) {
    return `${hour} 시간  ${minute} 분 ${second} 초 `;
  }
  if (second !== 0 && minute !== 0 && hour === 0 && day === 0) {
    return `${minute} 분 ${second} 초 `;
  } else {
    return `${second} 초 `;
  }
}
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}
export function percentArray(startRange, lastRange) {
  return _.range(startRange, lastRange + 1);
}

export function shuffle(count) {
  //v1.0
  var chars = "acdefhiklmnoqrstuvwxyz0123456789".split("");
  var result = "";
  for (var i = 0; i < count; i++) {
    var x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result;
}

export function dateuid(count) {
  return getTimeStamp() + "_" + shuffle(5)
}


export const mailEarningData = async (email, userId, role, yearMonth) => {
  try {
    const result = await axios.post(
      constant.urls.domain + "/users/mailEarningData",
      {
        email,
        userId,
        role,
        yearMonth
      }
    );
    if (result.data.code !== 200) {
      return { code: 400, msg: result.data.msg };
    }
    return { code: 200 };
  } catch (error) {
    console.log(error);
    return { code: 400, msg: error };
  }
};

export const checkUserIdExisted = async (userId) => {
  try {
    const querySnapshot = await db
      .collection("Users")
      .where("id", "==", userId)
      .get();
    if (querySnapshot.empty) {

      return { code: 200, result: false }
    }
    const emailArray = []
    querySnapshot.forEach(doc => {
      emailArray.push(doc.data().email)
    })
    return { code: 200, result: true, email: emailArray }

  } catch (e) {
    console.log("에러4", e);
    return { code: 400, msg: "시스템에러, 다시시도해 주세요" };
  }

}

export const checkUserPhoneNumExisted = async (phoneNumber) => {
  console.log(phoneNumber)
  try {
    const querySnapshot = await db
      .collection("Users")
      .where("phoneNumber", "==", phoneNumber)
      .get();
    if (querySnapshot.empty) {

      return { code: 200, result: false }
    }
    const emailArray = []
    querySnapshot.forEach(doc => {
      emailArray.push(doc.data().email)
    })
    return { code: 200, result: true, email: emailArray }

  } catch (e) {
    console.log("에러4", e);
    return { code: 400, msg: "시스템에러, 다시시도해 주세요" };
  }

}

export const updateStationSalesMethod = async (stationDoc, salesMethod, salesPortion, preSalesIds, preSalesManagers) => {
  let user = firebase.auth().currentUser;

  if (!user) {
    return { code: 400, msg: "로그인이 필요합니다" };
  }
  try {
    console.log("스테이션 닥", stationDoc)
    await db
      .collection(constant.dbCollection.station)
      .doc(stationDoc)
      .update({ salesMethod, salesPortion, preSalesIds, preSalesManagers });
    return { code: 200 };


  } catch (e) {
    console.log(e);
    return { code: 400, msg: e };
  }
};

export const createSalesContract = async (contractObj, franchiseObj) => {
  let user = firebase.auth().currentUser;

  if (!user) {
    return { code: 400, msg: "로그인이 필요합니다" };
  }

  try {
    let today = String(new Date());
    const contractId = dateuid()
    const franchiseId = dateuid()
    contractObj.createdBy = today;
    contractObj.contractedBy = today;
    contractObj.franchiseDoc = franchiseId;
    contractObj.contractType = constant.contractType.sales
    franchiseObj.createdBy = today;


    const stationQs = await db
      .collection(constant.dbCollection.station)
      .doc(contractObj.stationDoc)
      .get();

    if (!stationQs.exists) {
      return { code: 400, msg: "스테이션을 찾을 수 없습니다" };
    }
    if (stationQs.bReserved) {
      return { code: 400, msg: "스테이션이 이미 예약되었습니다" };
    }

    await db
      .collection(constant.dbCollection.contract)
      .doc(contractId)
      .set(contractObj);

    await db
      .collection(constant.dbCollection.franchise)
      .doc(franchiseId)
      .set(franchiseObj);

    await db
      .collection(constant.dbCollection.station)
      .doc(contractObj.stationDoc)
      .update({ bReserved: true, reservedBy: today });

    return { code: 200 };

  } catch (e) {
    console.log(e);
    return { code: 400, msg: e };
  }
}
export const createStoreApplication = async (contractObj, franchiseObj) => {
  let user = firebase.auth().currentUser;

  if (!user) {
    return { code: 400, msg: "로그인이 필요합니다" };
  }

  try {
    let today = String(new Date());
    const contractId = dateuid()
    const franchiseId = dateuid()
    contractObj.createdBy = today;
    contractObj.contractedBy = today;
    contractObj.franchiseDoc = franchiseId;
    contractObj.contractType = constant.contractType.franchise
    franchiseObj.createdBy = today;
    franchiseObj.contractedBy = today;
    franchiseObj.contractDocs = [contractId]

    if (contractObj.stationMethod === "banto") {
      franchiseObj.stationDocs = []
    }

    console.log("1번", contractObj.stationMethod)
    console.log("1번", contractObj.stationDoc)


    if (contractObj.stationMethod !== "banto") {
      const stationQs = await db
        .collection(constant.dbCollection.station)
        .doc(contractObj.stationDoc)
        .get();

      if (!stationQs.exists) {
        return { code: 400, msg: "스테이션을 찾을 수 없습니다" };
      }
      if (stationQs.bReserved) {
        return { code: 400, msg: "스테이션이 이미 예약되었습니다" };
      }
    }

    console.log("2번", franchiseId)


    await db
      .collection(constant.dbCollection.franchise)
      .doc(franchiseId)
      .set(franchiseObj);

    if (contractObj.stationMethod !== "banto") {


      console.log("3번", contractObj.stationDoc)

      await db
        .collection(constant.dbCollection.station)
        .doc(contractObj.stationDoc)
        .update({ bReserved: true, reservedBy: today });


    }
    if (contractObj.stationMethod !== "banto") {

    }
    await db
      .collection(constant.dbCollection.contract)
      .doc(contractId)
      .set(contractObj);

    return { code: 200 };

  } catch (e) {
    console.log(e);
    return { code: 400, msg: e };
  }
}
export const createBuyerApplication = async (buyerApplication) => {
  let user = firebase.auth().currentUser;

  if (!user) {
    return { code: 400, msg: "로그인이 필요합니다" };
  }

  try {
    let today = String(new Date());
    const buyerApplicationID = dateuid()

    buyerApplication.createdBy = today;

    await db
      .collection(constant.dbCollection.buyerApplication)
      .doc(buyerApplicationID)
      .set(buyerApplication);
    return { code: 200 };

  } catch (e) {
    console.log(e);
    return { code: 400, msg: e };
  }
}

