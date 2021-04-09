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
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setLoding] = React.useState(false);
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
          {" "}
          <header>
            <NavBar title="추가정보 입력" backLink="/login/login" />
            <span />
          </header>
          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                {/* <p
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
                  1/8
                </p> */}
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  이메일
                </p>

                <TextField
                  variant="outlined"
                  id="standard-full-width"
                  // label="Phone Number"
                  className={classes.textField}
                  placeholder="Email"
                  type="email"
                  // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
            </section>
            <section>
              {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  to=""
                  style={{
                    textDecoration: "underline",
                    fontFamily: "Noto Sans CJK KR",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "12px",
                    marginRight: "24px"
                  }}
                >
                 아이디가 생각나지 않으세요?
                </Link>
              </div> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    auth
                      .sendPasswordResetEmail(email)
                      .then(() => {
                        window.alert("이메일로 링크가 전송됐습니다");
                        props.history.push("/login/login");
                      })
                      .catch((error) => {
                        window.alert(error.message);
                      });
                  }}
                  style={{
                    width: "calc(100% - 64px)",
                    height: "64px",
                    margin: "24px 32px 0 32px",
                    borderRadius: "15px",
                    border: "2px solid #000A12",
                    fontFamily: "Noto Sans CJK KR",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    backgroundColor: "white"
                  }}
                >
                  이메일로 링크 전송
                </Button>
                {/* <Button
                  variant="outlined"
                  onClick={() => {
                    setLoding(true);

                    auth
                      .singInWithEmail(email, password)
                      .then((user) => {
                        console.log("로그인");

                        console.log("유저오니", user);
                        setLoding(false);
                        props.history.push("/main");
                      })
                      .catch((error) => {
                        setLoding(false);

                        window.alert(error.message);
                      });
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
                  로그인
                </Button> */}

                {auth.isLogin ?? (
                  <Link
                    onClick={() => {
                      auth.signOut();
                      console.log("싸인아웃");
                    }}
                  >
                    로그아웃
                  </Link>
                )}
              </div>
            </section>
          </main>
          <footer></footer>
          {isLoading && (
            <CircularProgress
              style={{
                position: "fixed",
                transitionDelay: { isLoading } ? "800ms" : "0ms",
                left: "calc(50% - 15px)",
                top: "49%"
              }}
            />
          )}
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
