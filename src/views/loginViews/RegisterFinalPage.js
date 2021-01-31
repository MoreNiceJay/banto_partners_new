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
  const context = useGlobal();
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
          <header></header>

          <main>
            <section className={classes.section}>
              <div
                style={{
                  marginTop: "20%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Link style={{ textAlign: "center" }}>
                  <img
                    style={{
                      width: "50%",
                      height: "auto"
                    }}
                    className={classes.backButtonImg}
                    src={require("../../assets/img/success_check.png")}
                    alt="logo"
                  />
                </Link>
                <p
                  style={{
                    fontFamily: "Noto Sans CJK KR",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "24px",
                    marginTop: "41px"
                  }}
                >
                  {" "}
                  가입이 완료되었습니다!
                </p>
              </div>
              <div style={{ position: "fixed", bottom: "0px", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center"
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      props.history.push("/main");
                    }}
                    style={{
                      margin: "24px 32px",
                      borderRadius: "15px",
                      border: "2px solid #000A12",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "12px",
                      alignText: "right"
                    }}
                  >
                    다음에 하기
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      props.history.push("/login/register/fifth");
                    }}
                    style={{
                      margin: "24px 32px",
                      borderRadius: "15px",
                      border: "2px solid #000A12",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "12px",
                      alignText: "right"
                    }}
                  >
                    지금 작성하기
                  </Button>
                </div>
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
