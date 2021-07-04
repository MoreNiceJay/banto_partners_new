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
import qs from "qs";
import queryString from "query-string";
import Alert from "../components/Alert.js";
import * as constant from "../Const";
import * as common from "../common";

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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function LoginPage(props) {
  const classes = useStyles(props);
  const query = qs.parse(props.location.search, {
    ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });
  const role = query.role;
  console.log(role, "롤")
  const [data, setsData] = React.useState({
    data: [],
    pageNumber: 1,
    items: 2,
    hasMore: true
  });
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
    hasMore: true
  });
  const context = useGlobal();
  const auth = useAuth();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const infoBody = (role, stationObj) => {

    if (role === "buyer") {

      const buyerTable = (<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">신청날짜</TableCell>
              <TableCell align="center">스테이션#</TableCell>
              <TableCell align="right">상태&nbsp;</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {/* Todo api data 어플리케이션 아이디 넣기 넣기 */}
            {apiData.data &&
              // apiData.data.userId &&
              apiData.data.map((i, index) => (
                <TableRow
                  key={index}
                  style={{ height: "90px" }}
                  onClick={() => {
                    props.history.push(`/table/applicationdetail?applicationId=${i.id}&role=${query.role}`)
                  }}
                >
                  <TableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      verticalAlign: "center"
                    }}
                    component="th"
                    scope="row"
                  >
                    <p>{common.getMonthDayTimeMinute(i.data.createdBy)}</p>
                  </TableCell>

                  <TableCell
                    style={{ height: "60px", verticalAlign: "center" }}
                    align="left"

                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"
                      }}
                    >
                      {i.storeName}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"

                      }}
                    >
                      {i.data.amount}대
                    </p>
                  </TableCell>
                  <TableCell
                    style={{ height: "60px", verticalAlign: "center" }}
                    align="right"
                  >
                    <p
                      style={{

                        fontStyle: "normal",
                        fontWeight: "800",
                        fontSize: "18px",
                        color: i.data.status === "WAITING" ? "black" : "#71C848",

                      }}
                    >
                      {i.data.status === "WAITING" ? "입금 확인중" : "승인완료"}

                    </p>

                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>)

      return buyerTable

    } else if (role === "salesManager") {
      console.log("들어오니?????????????????")
      const salesTable = (<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">신청날짜</TableCell>
              <TableCell align="center">스테이션#</TableCell>
              <TableCell align="right">상태&nbsp;</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {apiData && console.log(apiData)}
            {apiData.data &&
              // apiData.data.userId &&
              apiData.data.map((i, index) => (
                <TableRow
                  key={index}
                  style={{ height: "90px" }}
                  onClick={() => {
                    props.history.push(`/table/applicationdetail?applicationId=${i.id}&role=${query.role}`)
                  }}
                >
                  <TableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      verticalAlign: "center"
                    }}
                    component="th"
                    scope="row"
                  >
                    <p>{common.getMonthDayTimeMinute(i.data.createdBy)}</p>
                  </TableCell>

                  <TableCell
                    style={{ height: "60px", verticalAlign: "center" }}
                    align="left"

                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"
                      }}
                    >
                      {i.franchise.storeName}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"

                      }}
                    >
                      ({i.data.stationId})
                    </p>
                  </TableCell>
                  <TableCell
                    style={{ height: "60px", verticalAlign: "center" }}
                    align="right"
                  >

                    <p
                      style={{

                        fontStyle: "normal",
                        fontWeight: "800",
                        fontSize: "18px",
                        color: i.data.status === "WAITING" ? "black" : "#71C848",


                      }}
                    >
                      {i.data.status === "WAITING" ? "승인 대기중" : "승인완료"}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>)



      return salesTable

    } else if (role === "storeOwner") {
      const storeTable = (<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">신청날짜</TableCell>
              <TableCell align="center">스테이션#</TableCell>
              <TableCell align="right">상태&nbsp;</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.data &&
              // apiData.data.userId &&
              apiData.data.map((i, index) => (
                <TableRow
                  key={index}
                  style={{ height: "90px" }}
                  onClick={() => {
                    props.history.push(`/table/applicationdetail?applicationId=${i.id}&role=${query.role}`)
                  }}
                >
                  <TableCell
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      verticalAlign: "center"
                    }}
                    component="th"
                    scope="row"
                  >
                    <p>{common.getMonthDayTimeMinute(i.data.createdBy)}</p>
                  </TableCell>

                  <TableCell
                    style={{ height: "60px", verticalAlign: "center" }}
                    align="left"

                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"
                      }}
                    >
                      {i.franchise.storeName}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center"

                      }}
                    >
                      ({i.data.stationId === "" ? "반토스테이션" : i.data.stationId})
                    </p>
                  </TableCell>
                  <TableCell
                    style={{ height: "60px", verticalAlign: "center" }}
                    align="right"
                  >

                    <p
                      style={{

                        fontStyle: "normal",
                        fontWeight: "800",
                        fontSize: "18px",
                        color: i.data.status === "WAITING" ? "black" : "#71C848",


                      }}
                    >
                      {i.data.status === "WAITING" ? "승인 대기중" : "승인완료"}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>)
      return storeTable
    }

    //오류
  }

  React.useEffect(() => {
    if (!query.role) {
      // alert("오류 : 메인으로 돌아갑니다");
      return;
    }
    const fetchApplicationDataAsync = async () => {
      const result = await context.fetchApplications(
        auth.userExtraInfo && auth.userExtraInfo.id
          ? auth.userExtraInfo.id
          : constant.exampleUserId,
        query.role
      );
      console.log("리저트", result)
      if (result.code !== 200) {
        alert(result.msg);
        return;
      }
      if (!result.data) {
        alert("No applications");
        return;
      }
      let dataAdded = result.data && result.data;

      setData({
        data: [...apiData.data, ...dataAdded],
        pageNumber: apiData.pageNumber + 1
      });
    };
    fetchApplicationDataAsync();
  }, [auth.userId]);
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

  const backLink = query.role === "buyer" ? "investormenu" : (query.role === "salesManager" ? "salesmenu" : "storemenu")
  const roleName = query.role === "buyer" ? "구매자" : (query.role === "salesManager" ? "세일즈" : "가맹점")






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
          <NavBar title={`${roleName} 신청서`} backLink={`/${backLink}`} />
        </header>

        {/* </div> */}
        <InfiniteScroll
          dataLength={apiData.data.length}
          next={null}
          hasMore={false}
          loader={<h5 style={{ fontSize: "20px", zIndex: "2" }}>Loading...</h5>}
        >
          {/* {query.role === "buyer" ? buyerTable : (query.role === "salesManager" ? salesTable : storeTable)} */}
          {console.log("롤", role, apiData)}
          {apiData && infoBody(role, apiData)}

        </InfiniteScroll>
      </div>
      <div></div>
    </>
  );
}

export default LoginPage;
