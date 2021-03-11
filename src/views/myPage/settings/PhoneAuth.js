import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../../globalContext";
import { useAuth } from "../../../AuthContext";

import * as constant from "../../../Const";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../../firebaseConfig.js";
import SquareButton from "../../../components/SquareButton.js";
import Countdown from "react-countdown";
import Axios from "axios";
import { common } from "@material-ui/core/colors";

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
  const auth = useAuth();

  const [certNum, setCertNum] = React.useState(null);
  const [tempUuid, setTempUuid] = React.useState(null);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [bSent, setBSent] = React.useState(false);
  const [bPause, setBPause] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  let eObjects;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const phoneInit = async () => {
    // 서버로 전화번호 보내는 부분
    const result = await Axios.post(
      constant.urls.domain + "/users/initPhoneAuth",
      {
        phoneNumber: context.getRegisterInfo.phoneNumber
      }
    );
    console.log(result);
    if (result.data.code !== 200) {
      alert(result.data.msg);
      return;
    }
    setBSent(true);
    setTempUuid(result.data.data);
    //{전화번호 보내기}
    // {인증번호 받기}
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      setBSent(false);
      return null;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  let e;

  return (
    <>
      <Slide
        direction="left"
        in={true}
        timeout={{ enter: "0.15s", exit: "5s" }}
        mountOnEnter
        unmountOnExit
      >
        <div style={{ backgroundColor: "#EEEEEE", height: "100vh" }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              인증문자가 발송되었습니다 잠시만 기다려주세요
            </Alert>
          </Snackbar>
          <header>
            <NavBar title="휴대전화 번호 인증" backLink="/login/login" />
          </header>

          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                    opacity: "0.8",
                    letterSpacing: "5px",
                    margin: "16px 0 0 24px"
                  }}
                ></p>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  전화번호
                </p>

                <TextField
                  variant="outlined"
                  id="standard-full-width"
                  // label="Phone Number"
                  className={classes.textField}
                  placeholder="Phone Number"
                  // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
                  value={context.getRegisterInfo.phoneNumber}
                  onChange={(e) => {
                    context.setRegister_phoneNumber(e.target.value);
                  }}
                  style={{
                    margin: "0 24px",
                    marginTop: "12px",
                    width: "calc(100% - 64px)"
                  }}
                  InputLabelProps={{
                    style: {}
                  }}
                  inputProps={{
                    style: {
                      paddingLeft: "0px",
                      fontSize: "26px",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",

                      boxSizing: "border-box",
                      marginTop: "10px"
                    }
                  }}
                  // FormHelperTextProps={{
                  //   style: {
                  //     marginTop: "12px",
                  //     fontSize: "14px"
                  //   }
                  // }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "rows",
                    alignItems: "center"
                  }}
                >
                  {bSent && (
                    <Countdown
                      date={Date.now() + 180000}
                      renderer={renderer}
                      zeroPadTime={2}
                    />
                  )}
                  <Button
                    variant="outlined"
                    onClick={async () => {
                      console.log("눌림");
                      if (!!!context.getRegisterInfo.phoneNumber) {
                        window.alert("전화번호를 입력해주세요");
                        return;
                      }
                      await phoneInit();
                      setOpen(true);
                      setBPause(true);
                      setTimeout(() => {
                        setBPause(false);
                      }, 3000);
                    }}
                    style={{
                      height: "32px",
                      margin: "24px 32px 24px 14px",
                      borderRadius: "8px",
                      border: bPause ? "2px solid silver" : "2px solid #000A12",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      background: bPause ? "silver" : "#000A12",
                      color: "white"
                    }}
                    disabled={bPause}
                  >
                    {bSent ? "재전송" : "인증번호 전송"}
                    {/* 이거 버튼 프리즈 되게 막기 */}
                  </Button>
                </div>
              </div>

              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  margin: "16px 0 0 24px"
                }}
              >
                인증번호
              </p>

              <TextField
                variant="outlined"
                id="standard-full-width"
                // label="Phone Number"
                disabled={bSent ? "" : "disabled"}
                className={classes.textField}
                placeholder="Certification Number"
                // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
                value={certNum}
                onChange={(e) => {
                  setCertNum(e.target.value);
                }}
                style={{
                  margin: "0 24px",
                  marginTop: "12px",
                  width: "calc(100% - 64px)"
                }}
                InputLabelProps={{
                  style: {}
                }}
                inputProps={{
                  style: {
                    paddingLeft: "0px",
                    fontSize: "26px",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",

                    boxSizing: "border-box",
                    marginTop: "10px"
                  }
                }}
                // FormHelperTextProps={{
                //   style: {
                //     marginTop: "12px",
                //     fontSize: "14px"
                //   }
                // }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <div id="recaptcha-container"></div>

                <SquareButton
                  disabled={
                    !(!!certNum && !!context.getRegisterInfo.phoneNumber)
                  }
                  onClick={async () => {
                    // todo
                    //  유저가 {아이디와 인증번호}보내면 디비에서 {유효기간 인증번호, 아이디 확인후} 유저에게 {true, false }보내줌
                    const result = await Axios.post(
                      constant.urls.domain + "/users/confirmCert",
                      { uuid: tempUuid, certNum: certNum }
                    );
                    //true일 경우
                    console.log(result);
                    if (result.data.code !== 200) {
                      alert(result.msg);
                      return;
                    }
                    if (!result.data.data) {
                      alert(result.msg);
                      return;
                    }
                    const result2 = await auth.updateUserPhoneNumber(
                      auth.user.email,
                      context.getRegisterInfo.phoneNumber
                    );
                    if (result2.code !== 200) {
                      alert(result2.msg);
                      return;
                    }
                    alert("휴대폰 번호가 변경되었습니다");

                    //확인 알럴트
                    //유저 컨텍스트 바꾸고
                    // 그거 업데이트 유저 폰넘버 하기
                    //다음칸

                    //false일 경우
                    //틀린 번호라고 말해주기

                    //에러일 경우
                    //다시 시도하라고 말해주기
                  }}
                  text="완료"
                />
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
