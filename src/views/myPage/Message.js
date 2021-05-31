import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import { useAuth } from "../../AuthContext";
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
import * as common from "../../../src/common";
import * as constant from "../../Const";
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
  const todayTimestamp = common.getTimeStamp();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });
  const [apiData, setData] = React.useState(null);
  const [earning, setEarning] = React.useState(0);
  const [calender, setCalender] = React.useState(null);
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

  React.useEffect(() => {
    (async () => {
      const result = await common.fetchMessages(auth.user.email);
      if (result.code !== 200) {
        alert(result.message);
        return;
      }
      setData(result.data);
    })();
  }, []);

  // 여기부터

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
          <NavBar title="알림" backLink="/main" />
        </header>
        <div style={{ padding: "8px 16px" }}>
          최근 30일 동안의 알림만 보관되며, 이후 자동 삭제 됩니다
        </div>

        {/* </div> */}
        <InfiniteScroll
          dataLength={apiData && apiData.length}
          hasMore={false}
          loader={<h5 style={{ fontSize: "20px", zIndex: "2" }}>Loading...</h5>}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {apiData &&
                  // apiData.data.userId &&
                  apiData.map((i, index) => {
                    return (
                      <TableRow key={index} style={{ height: "90px" }}>
                        <TableCell
                          style={{ height: "60px", verticalAlign: "top" }}
                          align="left"
                        >
                          <div
                            style={{ display: "flex", flexDirection: "rows" }}
                          >
                            <p
                              style={{
                                fontSize: "13px",
                                color: "#263238"
                              }}
                            >
                              {common.getMonthDayForm(i.receivedDate)}
                            </p>
                            {i.isRead ? (
                              <div
                                style={{
                                  backgroundColor: "red",
                                  width: "5px",
                                  height: "5px"
                                }}
                              ></div>
                            ) : (
                              ""
                            )}
                          </div>
                          <p
                            style={{
                              fontStyle: "normal",
                              fontWeight: "500",
                              fontSize: "18px",
                              marginTop: "8px"
                            }}
                          >
                            {i.content}
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#263238"
                            }}
                          >
                            {common.timeForToday(i.receivedDate)}
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
