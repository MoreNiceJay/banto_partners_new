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
import { useAuth } from "../../AuthContext";

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
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const auth = useAuth();
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
          <header>
            <NavBar title="회원가입" backLink="/login/register/second" />
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
                  3/3
                </p>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  비밀번호
                </p>

                <TextField
                  variant="outlined"
                  id="standard-full-width"
                  // label="Phone Number"
                  className={classes.textField}
                  placeholder="Password"
                  type="password"
                  // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
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
              </div>
              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  margin: "60px 0 0 24px"
                }}
              >
                비밀번호 확인
              </p>

              <TextField
                variant="outlined"
                id="standard-full-width"
                // label="Phone Number"
                className={classes.textField}
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
                // value={"01094552438"}
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (confirmPassword !== password) {
                      alert("비밀번호와 확인비밀번호가 같지 않습니다");
                      return;
                    }

                    auth
                      .singUpWithEmail(
                        context.getRegisterInfo.email,
                        confirmPassword
                      )
                      .then((doc) => {
                        console.log("닥", doc);
                        doc.set({
                          phoneNumber: context.getRegisterInfo.phoneNumber
                        });
                        return Promise.resolve();
                      })

                      .then(() => {
                        props.history.push("/login/register/fourth");
                      })
                      .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        window.alert(errorMessage);
                      });
                  }}
                  style={{
                    width: "64px",
                    height: "64px",
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
                  next
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
