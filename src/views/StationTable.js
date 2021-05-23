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
import * as common from "../common";
import qs from "qs";
import queryString from "query-string";
import Alert from "../components/Alert.js";
import * as constant from "../Const";

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

function LoginPage(props) {
  const classes = useStyles(props);
  const query = queryString.parse(props.location.search);

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
  console.log("어스", auth.user);

  React.useEffect(() => {
    const fetchStationDataAsync = async () => {
      const result = await common.fetchStations(
        auth.userExtraInfo && auth.userExtraInfo.id
          ? auth.userExtraInfo.id
          : constant.exampleUserId,
        query.role
      );

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
    fetchStationDataAsync();
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

  // const fetchData = () => {
  //   Axios(
  //     `https://jsonplaceholder.typicode.com/posts/${apiData.pageNumber}`
  //   ).then((a) => {
  //     setData({
  //       data: [...apiData.data, a.data],
  //       pageNumber: apiData.pageNumber + 1
  //     });
  //   });
  //   // console.log(apiData);
  // };
  // React.useEffect(() => {
  //   Axios(`https://jsonplaceholder.typicode.com/posts`).then((a) => {
  //     let dataAdded = a.data.concat(apiData);
  //     setData({
  //       data: [...apiData.data, ...dataAdded],
  //       pageNumber: apiData.pageNumber + 1
  //     });
  //   });
  // }, []);

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
          <NavBar title=  {`${roleName} 스테이션 `}
 backLink = {`/${backLink}`} />
        </header>

        {/* </div> */}
        <InfiniteScroll
          dataLength={apiData.data.length}
          next={null}
          hasMore={false}
          loader={<h5 style={{ fontSize: "20px", zIndex: "2" }}>Loading...</h5>}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
          <TableRow>
            <TableCell align="center">가맹점</TableCell>
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
                        window.location.href = `/table/stationdetail?stationId=${i.stationId}&role=${query.role}`;
                      }}
                    >
                      <TableCell
                        style={{ height: "60px", verticalAlign: "center" }}
                        align="center"
                      >
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            
                          }}
                        >
                          {i.storeName ? i.storeName : "(영업 대기중)" }
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          ({i.stationId})
                        </p>
                      </TableCell>
                      <TableCell
                        style={{ height: "60px", verticalAlign: "top" }}
                        align="right"
                      >
                        <p
                          style={{
                            fontStyle: "normal",
                            fontWeight: "800",
                            fontSize: "26px",
                            marginTop: "8px"
                          }}
                        >
                          {i.isOn ? "On" : "Off"}
                        </p>
                        <p
                          style={{
                            fontStyle: "normal",
                            fontWeight: "800",
                            fontSize: "26px",
                            marginTop: "8px"
                          }}
                        >
                          {console.log("라스트 업데이트", i)}
                          ({common.timeForToday(i.lastUpdated)})
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
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
