import React, { useEffect, useState } from "react";
import firebase from "./firebaseConfig";
import moment from "moment";
import * as constant from "./Const";
import { last } from "lodash";
import axios from "axios";
let db = firebase.firestore();
let user = firebase.auth().currentUser;
var _ = require("lodash");

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
  applicationId: "",
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
      .where("stationId", "!=", "")
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
      .where("stationId", "!=", "")
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
      .where("stationId", "!=", "")

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
  if (!user) {
    return { code: 400, msg: "로그인이 필요합니다" };
  }
  try {
    const querySnapshot = await db
      .collection("Users")
      .doc(user.email)
      .collection("Applications")
      .where("applicationId", "==", applicationId)
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
export async function fetchStations(userId, role) {
  try {
    var startTime = new Date().getTime();

    const dataArray = [];
    const stationnRef = db.collection("Stations").where(role, "==", userId);

    const querySnapshot = await stationnRef.get();
    
    (querySnapshot.forEach((doc) => {
         (dataArray.push(doc.data()))
 
    }))
    await Promise.all(dataArray.map(async (value,index) => {
      const doc = await db.collection('Franchises').doc(value.franchiseDoc).get()
        dataArray[index].storeName = doc.data().storeName
        console.log(doc.data().storeName)
      
    }))


    var endTime = new Date().getTime();
    console.log("측정시간",endTime - startTime);

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
export async function insertBuyerExample() {
  const data = {
    stationId: uuidv4(),
    isOn: false,
    lastUpdated: String(new Date()),
    status: "APPROVE",
    storeName: uuidv4(),
    storeMainAddress: uuidv4(),
    storeRestAddress: uuidv4(),
    storeOwnerPhoneNumber: uuidv4(),
    storePhoneNumber: uuidv4(),
    storeOwner: "jl55359@hanmail.net",
    storePortion: 0,
    salesManager: "jl55359@hanmail.net",
    salesPortion: 0,
    buyerStatus: "",
    buyer: "jl55359@hanmail.net",
    buyerPortion: 0,
    registerDate: String(new Date()),
    installDate: String(new Date()),
    resultData: String(new Date())
  };

  await db.collection("Stations").doc(uuidv4()).set(data);
}

export async function insertStationExample() {
  const data = {
    stationId: uuidv4(),
    isOn: false,
    method: "ownSales",
    bReserved: false,
    lastUpdated: String(new Date()),
    status: "APPROVE",
    storeName: uuidv4(),
    storeMainAddress: uuidv4(),
    storeRestAddress: uuidv4(),
    storeOwnerPhoneNumber: uuidv4(),
    storePhoneNumber: uuidv4(),
    storeOwner: "jl55359@hanmail.net",
    storePortion: 0,
    preSalesManagers: [
      { id: "a1111", portion: 30, key: "asd" },
      { id: "a1112", portion: 30, key: "assd" }
    ],
    preSales: ["a1111", "a1112"],
    salesManager: "",
    salesPortion: 0,
    buyerStatus: "",
    buyer: "jl55359@hanmail.net",
    buyerPortion: 0,
    registerDate: String(new Date()),
    installDate: String(new Date()),
    resultData: String(new Date())
  };

  await db.collection("Stations").doc(uuidv4()).set(data);
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
