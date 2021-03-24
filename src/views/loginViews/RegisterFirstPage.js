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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../firebaseConfig.js";
import SquareButton from "../../components/SquareButton.js";
import Countdown from "react-countdown";

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
  const [eObject, setEObject] = React.useState("");
  const [certNum, setCertNum] = React.useState("");
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [bSent, setBSent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  let eObjects;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const phoneInit = () => {
    let number = context.getRegisterInfo.phoneNumber.replace("0", "");
    number = "+82" + number;
    console.log(number);

    firebase
      .auth()
      .signInWithPhoneNumber(number, window.recaptchaVerifier)
      .then(function (e) {
        setOpen(true);

        window.confirmationResult = e;
        // e.confirm(code)
        //   .then(function (result) {
        //     console.log("유우져", result.user, "user");

        //     return Promise.resolve();
        //   })
        //   .then(function () {
        //     var user = firebase.auth().currentUser;

        //     user.delete().then(function () {
        //       console.log("확인되었습니다");
        //     });
        //   })
        //   .catch((error) => {
        //     console.log(error.message);
        //     console.log(error.code);
        //     window.alert(error.message);
        //   });
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
        window.alert(error.message);
      });
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
  React.useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {},
        "expired-callback": () => {}
      }
    );
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }, []);

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
            <NavBar title="회원가입" backLink="/login/login" />
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
                >
                  1/3
                </p>
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
                    onClick={() => {
                      if (!!!context.getRegisterInfo.phoneNumber) {
                        window.alert("전화번호를 입력해주세요");
                        return;
                      }
                      setBSent(true);
                      phoneInit();
                    }}
                    style={{
                      height: "32px",
                      margin: "24px 32px 24px 14px",
                      borderRadius: "8px",
                      border: "2px solid #000A12",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      background: "#000A12",
                      color: "white"
                    }}
                  >
                    {bSent ? "재전송" : "인증번호 전송"}
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
                    try {
                      console.log(
                        "1",
                        await window.confirmationResult.confirm(certNum)
                      );

                      console.log(
                        "2",
                        await firebase.auth().currentUser.delete()
                      );
                      await firebase.auth().signOut();
                      props.history.push("/login/register/second");
                    } catch (e) {
                      console.log(e);
                      alert(e);
                    }
                  }}
                  text="NEXT"
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
