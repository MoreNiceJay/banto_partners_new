import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../components/HeaderInfo.js";
import { NavBar } from "../components/NavBar.js";
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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function LoginPage({ props, location }) {
  const classes = useStyles(props);
  const data = [];
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

  // const rows = [
  //   createData("스타벅스 강남점", "bti2123", true),
  //   createData("스타벅스 강남점", "bti2123", true),
  //   createData("스타벅스 강남점", "bti2123", true),
  //   createData("스타벅스 강남점", "bti2123", true),
  //   createData("스타벅스 강남점", "bti2123", true)
  // ];
  React.useEffect(() => {
    console.log("유저임", auth.user.email);
  }, []);
  const fetchData = () => {
    Axios(
      `https://jsonplaceholder.typicode.com/posts/${apiData.pageNumber}`
    ).then((a) => {
      console.log("에이", a);

      setData({
        data: [...apiData.data, a.data],
        pageNumber: apiData.pageNumber + 1
      });
    });
    console.log(apiData);
  };
  React.useEffect(() => {
    Axios(`https://jsonplaceholder.typicode.com/posts`).then((a) => {
      console.log(a);
      console.log("에이", a);
      let dataAdded = a.data.concat(apiData);
      setData({
        data: [...apiData.data, ...dataAdded],
        pageNumber: apiData.pageNumber + 1
      });
    });
    console.log("에이피아이", apiData);
  }, []);

  return (
    <>
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
          <NavBar title="수익 확인" backLink="/main" />
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
                margin: "40px 24px",
                boxShadow: "0px 6px 10px rgba(0, 10, 18, 0.2)"
              }}
            >
              <p
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#ECEFF1",
                  opacity: "0.6"
                }}
              >
                2020.10월 수익
              </p>
              <p
                style={{
                  color: "#E5E5E5",
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "800",
                  fontSize: "28px",
                  lineHeight: "34px",
                  textAlign: "left",
                  marginTop: "16px"
                }}
              >
                {numberWithCommas(122000) + " 원"}
              </p>
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
              window.alert("헬러");
            }}
            style={{ width: "28px", height: "28px" }}
            src={require("../assets/img/select - left.png")}
            alt="leftButton"
          />
          <span style={{ margin: "0 30px" }}>2020.01</span>
          <img
            style={{ width: "28px", height: "28px" }}
            src={require("../assets/img/select - right.png")}
            alt="leftButton"
          />
        </div>

        {/* </div> */}
        <InfiniteScroll
          dataLength={apiData.data.length}
          next={fetchData}
          hasMore={true}
          loader={<h5 style={{ fontSize: "20px", zIndex: "2" }}>Loading...</h5>}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {apiData.data &&
                  // apiData.data.userId &&
                  apiData.data.map((i, index) => (
                    <TableRow key={index} style={{ height: "90px" }}>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          verticalAlign: "top"
                        }}
                        component="th"
                        scope="row"
                      >
                        <p>2020.01.23</p>
                      </TableCell>

                      <TableCell
                        style={{ height: "60px", verticalAlign: "top" }}
                        align="left"
                      >
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#00838F"
                          }}
                        >
                          스타벅스 강남점
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#00838F"
                          }}
                        >
                          (bti2123)
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
                          15시간
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#263238"
                          }}
                        >
                          (대여중)
                        </p>
                        <p
                          style={{
                            fontFamily: "Montserrat",
                            fontStyle: "normal",
                            fontWeight: "800",
                            fontSize: "26px",
                            marginTop: "8px"
                          }}
                        >
                          1,500
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
