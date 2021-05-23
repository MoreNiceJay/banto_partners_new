import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../components/HeaderInfo.js";
import NavBar from "../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../globalContext";
import { useAuth } from "../AuthContext";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import queryString from "query-string";
import * as common from "../../src/common";
import Alert from "../components/Alert.js";
import * as constant from "../Const";
const firebase = require("firebase");
var db = firebase.firestore();
const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "44px" },
  headerSpace: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "60px"
  },
  headerTitle: { fontSize: "18px", fontWeight: "bold", margin: "auto" },
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  }
  // table: {
  //   minWidth: 650
  // }
}));
function numberWithCommas(x) {
  if (!x) {
    return;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function LoginPage({ props, location }) {
  const classes = useStyles(props);
  const data = [];
  const todayTimestamp = common.getTimeStamp();
  const userStatus = React.useState;
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });
  const [apiData, setData] = React.useState({
    data: [],
    pageNumber: 1,
    items: 2,
    hasMore: true,
    cursor: todayTimestamp
  });
  const [earning, setEarning] = React.useState(0);
  const [calender, setCalender] = React.useState(null);
  const context = useGlobal();
  const auth = useAuth();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const query = queryString.parse(location.search);

  const BlackCheckbox = withStyles({
    root: {
      color: "black",
      "&$checked": {
        color: "black"
      }
    },
    checked: {
      color: "black"
    }
  })((props) => <Checkbox color="default" {...props} />);
  //TODO date 구하기
  React.useEffect(() => {
    setCalender(common.getTodayDateForm());
  }, []);

  const handleCalender = (arg) => {
    let date = calender.split("-");
    let year = Number(date[0]);
    let month = Number(date[1]);
    let lastTimeStamp = common.getTimeStamp();

    if (arg === "add") {
      if (calender === common.getTodayDateForm()) {
        return;
      }
      if (month === 12) {
        year = year + 1;
        month = 1;
        month = common.leadingZeros(month, 2);
        year = String(year);
        setCalender(year + "-" + month);
        setData({ data: [], cursor: lastTimeStamp });
        return;
      }
      month = month + 1;
      month = common.leadingZeros(month, 2);
      year = String(year);
      setCalender(year + "-" + month);
    }
    if (arg === "dec") {
      //TODO increase callender by 1
      if (month === 1) {
        year = year - 1;
        month = 12;
        month = common.leadingZeros(month, 2);

        year = String(year);
        setData({ data: [], cursor: lastTimeStamp });
        setCalender(year + "-" + month);
        return;
      }
      month = month - 1;
      month = common.leadingZeros(month, 2);
      year = String(year);
    }

    setData({ data: [], cursor: lastTimeStamp });
    setCalender(year + "-" + month);
    return;
  };
  const fetchData = async () => {
    Axios.post(constant.urls.domain + "/users/earningData", {
      userId:
        auth.userExtraInfo && auth.userExtraInfo.id
          ? auth.userExtraInfo.id
          : constant.exampleUserId,
      role: query.role,
      yearMonth: calender,
      cursor: apiData.cursor
    }).then((a) => {
      console.log("a", a.data);
      if (a.data.code !== 200 && a.data.code !== 220) {
        alert(a.data.msg);
        return;
      }
      let dataAdded = a.data.data.earningData;
      setData({
        data: [...apiData.data, ...dataAdded],
        pageNumber: apiData.pageNumber + 1,
        cursor: a.data.data.cursor,
        yearMonth: calender,
        hasMore: a.data.data.hasMore
      });
    });
  };

  const fetchRevenue = async () => {
    Axios.post(constant.urls.domain + "/users/monthlyRevenue", {
      userId:
        auth.userExtraInfo && auth.userExtraInfo.id
          ? auth.userExtraInfo.id
          : "a1111",
      role: query.role,
      yearMonth: calender
    }).then((a) => {
      console.log(a.data.data.earnings, "data");
      let dataAdded = a.data.data.earning;
      setEarning(dataAdded);
    });
  };
  React.useEffect(() => {
    (async () => {
      await fetchData();
      await fetchRevenue();
    })();
  }, [calender]);
  console.log(query.role)
  const backLink =  query.role === "buyer" ? "investormenu" : (query.role === "salesManager" ? "salesmenu" : "storemenu")
  const roleName =  query.role === "buyer" ? "구매자" : (query.role === "salesManager" ? "세일즈" : "가맹점")

  return (
    <>
      {!auth.userExtraInfo && (
        <>
          <Alert
            type="info"
            title="체험하기"
            description="현재 체험히기를 이용중입니다"
            actionDescription="로그인"
            link="/login/login"
            onClick={() => {
              props.history.push("/login/login");
            }}
          ></Alert>
        </>
      )}
      <div style={{ height: "100%" }}>
        <header
          style={{
            backgroundColor: "#E5E5E5",
            top: "0px",
            position: "sticky",
            position: "-webkit-sticky",
            zIndex: "99999"
          }}
        >
          <NavBar title={`${roleName} 수익`} backLink={`/${backLink}`} />
        </header>

        <div
          style={{
            backgroundColor: "#E5E5E5"
          }}
        >
          <Paper
            variant="outlined"
            square
            className={classes.card}
            style={{
              boxShadow: "0px 6px 10px rgba(0, 10, 18, 0.2)",
              height: "138px",
              margin: "0 17px",
              paddingTop: "12px",
              borderRadius: "15px",
              backgroundColor: "#000A12"
            }}
          >
            <div
              style={{
                margin: "20px 24px",
                boxShadow: "0px 6px 10px rgba(0, 10, 18, 0.2)"
              }}
            >
              <p
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#ECEFF1",
                  opacity: "0.6",
                  textAlign:"center"
                }}
              >
                {calender && calender.replace("-", ".")} 수익
              </p>
              <p
                style={{
                  color: "#E5E5E5",
                  fontStyle: "normal",
                  fontWeight: "800",
                  fontSize: "28px",
                  lineHeight: "34px",
                  textAlign: "left",
                  marginTop: "16px",
                  textAlign:"center"

                }}
              >
                {(!!!earning ? "0" : numberWithCommas(earning)) + " 원"}
              </p>
              <div
                style={{
                  marginTop:"18px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  flexDirection:"column",
                  justifyContent: "flex-end"
                }}
              >
                <div style={{height:"1px", width:"100%", backgroundColor:"grey"}}></div>
                <Button
                  style={{
                    color: "white",
                    textAlign: "right",
                    alignSelf: "center"
                  }}
                  onClick={async () => {
                    if (!auth.userExtraInfo) {
                      alert(`"체험하기"에서는 사용할 수 없습니다`);
                      return;
                    }
                    const result = await common.mailEarningData(
                      auth.userExtraInfo.email,
                      auth.userExtraInfo.id,
                      query.role,
                      calender
                    );
                    if (result.code !== 200) {
                      alert(result.msg);
                      return;
                    }
                    alert(
                      `${auth.userExtraInfo.email}로 수익정보 데이터(${calender})를 보냈습니다`
                    );
                    return;
                  }}
                >
                  정산내역 Excel 내보내기
                </Button>
              </div>
            </div>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "rows",
            justifyContent: "center",
            top: "104px",
            zIndex: "99999",
            position: "sticky",
            position: "-webkit-sticky",
            height: "76px",
            backgroundColor: "#E5E5E5"
          }}
        >
          <img
            onClick={() => {
              handleCalender("add");
            }}
            style={{ width: "28px", height: "28px" }}
            src={require("../assets/img/select - left.png")}
            alt="leftButton"
          />
          <span style={{ margin: "0 30px" }}>
            {calender && calender.replace("-", ".")}
          </span>
          <img
            style={{ width: "28px", height: "28px" }}
            src={require("../assets/img/select - right.png")}
            alt="leftButton"
            onClick={() => {
              handleCalender("dec");
            }}
          />
        </div>

        {/* </div> */}
        <InfiniteScroll
          dataLength={apiData.data.length}
          next={fetchData}
          hasMore={apiData.hasMore}
          loader={<h5 style={{ fontSize: "20px", zIndex: "2" }}>Loading...</h5>}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {!apiData.data.length && (
                  <div
                    style={{
                      width: "100%",
                      height: "100px",
                      textAlign: "center",
                      alignSelf: "center",
                      display: "flex"
                    }}
                  >
                    <span
                      style={{
                        width: "100%",
                        textAlign: "center",
                        alignSelf: "center"
                      }}
                    >
                      데이터가 없습니다
                    </span>
                  </div>
                )}
                {apiData.data &&
                  // apiData.data.userId &&
                  apiData.data.map((i, index) => {
                    return (
                      <TableRow key={index} style={{ height: "90px" }}>
                        <TableCell
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            verticalAlign: "top"
                          }}
                          component="th"
                          scope="row"
                        >
                          <p>{common.getMonthDayTimeMinute(i.rentalTimeStamp)}</p>
                        </TableCell>

                        <TableCell
                          style={{ height: "60px", verticalAlign: "top" }}
                          align="left"
                        >
                          <p
                            style={{
                              fontWeight: "400",
                              fontSize: "16px",
                              textAlign:"center"
                              // color: "#00838F"
                            }}
                          >
                            {i.storeName}
                          </p>
                          <p
                            style={{
                              fontWeight: "400",
                              fontSize: "12px",
                              textAlign:"center"

                              // color: "#00838F"
                            }}
                          >
                            ({i.rentalStationId})
                          </p>
                        </TableCell>
                        <TableCell
                          style={{ height: "60px", verticalAlign: "top" }}
                          align="right"
                        >
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#263238"
                            }}
                          >
                            {common.diffTime(
                              i.rentalTimeStamp,
                              i.returnTimeStamp
                            )}
                          </p>
                          {/* <p
                            style={{
                              fontSize: "13px",
                              color: "#263238"
                            }}
                          >
                            {i.status}
                          </p> */}
                          <p
                            style={{
                              fontStyle: "normal",
                              fontWeight: "800",
                              fontSize: "26px",
                              
                            }}
                          >
                            {numberWithCommas(i.price) + "원"}
                          </p>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
      </div>
      <div></div>
    </>
  );
}

export default LoginPage;
