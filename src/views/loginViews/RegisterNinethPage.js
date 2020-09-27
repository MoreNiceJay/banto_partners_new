import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

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
}));

function LoginPage(props) {
  const classes = useStyles(props);
  const data = [
    {
      contact: "01094552438",
      email: "morenicejay@gmail.com",
      name: "이장협",
      socialNumber: "890327",
      bank: "하나은행",
      accountNumber: "4119188707",
      accountHolder: "이장협",
      businessAccount: true
    }
  ];

  return (
    <>
      <Slide
        direction="left"
        in={true}
        timeout={{ enter: "0.15s", exit: "5s" }}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <header>
            <NavBar title="추가정보 확인" backLink="/investor/invest" />
          </header>

          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px",
                    color: "#000A12",
                    opacity: "0.4"
                  }}
                >
                  전화번호
                </p>

                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "24px",
                    margin: "16px 0 0 24px",
                    color: "#000A12"
                  }}
                >
                  01094552438
                </p>
              </div>
            </section>
            <section>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  style={{
                    textDecoration: "underline",
                    fontFamily: "Noto Sans CJK KR",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "12px",
                    marginRight: "24px"
                  }}
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    props.history.push("/investor/final");
                  }}
                  style={{
                    width: "calc(100% - 64px)",
                    height: "64px",
                    margin: "24px 32px",
                    borderRadius: "15px",
                    backgroundColor: "#000A12",
                    border: "2px solid #000A12",
                    fontFamily: "Noto Sans CJK KR",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "white"
                  }}
                >
                  가입완료
                </Button>
              </div>
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
