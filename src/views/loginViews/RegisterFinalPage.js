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
import SmallButton from "../../components/SmallButton";
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
              <div>
                <p
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "500"
                  }}
                >
                  수익 정산을 받기 위해서 부가정보가 필요 합니다
                </p>
                <p
                  style={{
                    marginTop: "15px",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "500"
                  }}
                >
                  지금 작성하시겠습니까?
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
                  <SmallButton
                    color={"white"}
                    title="다음에 하기"
                    padding={"22px 44px"}
                    width="calc(50% - 40px)"
                    height="52px"
                    onClick={() => {
                      props.history.push("/main");
                    }}
                  />
                  <SmallButton
                    color={"black"}
                    title="지금 작성하기"
                    padding={"22px 44px"}
                    width="calc(50% - 40px)"
                    height="52px"
                    onClick={() => {
                      props.history.push("/login/register/fifth");
                    }}
                  />
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
