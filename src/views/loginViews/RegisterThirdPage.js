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
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as common from "../../common";
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
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedF: false,
    checkedG: false
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
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

              <div style={{ marginTop: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "rows",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <FormControlLabel
                    style={{ marginLeft: "12px" }}
                    control={
                      <BlackCheckbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleChecked />}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "14px",
                          lineHeight: "21px"
                        }}
                      >
                        2020년 하반기 정책사항에 동의 합니다
                      </span>
                    }
                  />
                  <p style={{}}>
                    <Link
                      style={{
                        marginRight: "32px",
                        textDecoration: "underline"
                      }}
                    >
                      {" "}
                      약관확인
                    </Link>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "rows",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <FormControlLabel
                    style={{ marginLeft: "12px" }}
                    control={
                      <BlackCheckbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleChecked />}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "14px",
                          lineHeight: "21px"
                        }}
                      >
                        2020년 하반기 정책사항에 동의 합니다
                      </span>
                    }
                  />
                  <p style={{}}>
                    <Link
                      style={{
                        marginRight: "32px",
                        textDecoration: "underline"
                      }}
                    >
                      {" "}
                      약관확인
                    </Link>
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={async () => {
                    if (confirmPassword !== password) {
                      alert("비밀번호와 확인비밀번호가 같지 않습니다");
                      return;
                    }

                    await context.setRegister_id(common.shuffle(8));

                    try {
                      await auth.singUpWithEmail(
                        context.getRegisterInfo.email,
                        confirmPassword
                      );
                      const result = await auth.updateExtraProfiles(
                        context.getRegisterInfo
                      );

                      if (result.code !== 200) {
                        alert(result.msg);
                      }
                    } catch (error) {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      window.alert(errorMessage);
                      return;
                    }
                    props.history.push("/login/register/fourth");
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
