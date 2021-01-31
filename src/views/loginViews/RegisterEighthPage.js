import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
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
  },
  select: {
    "&:before": {
      border: "none"
    },
    "&:after": {
      border: "none"
    },
    "&:hover:not(.Mui-disabled):before": {
      border: "none"
    },
    "&:hover::before": {
      border: "none"
    }
  }
}));

function LoginPage(props) {
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  });
  const context = useGlobal();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

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
            <NavBar title="추가정보 입력" backLink="/login/register/seventh" />
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
                  2/8
                </p>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  정책 동의
                </p>
              </div>

              <FormControl
                component="fieldset"
                style={{ margin: "80px 0 0 24px" }}
              >
                {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        style={{
                          color: "black",

                          "&$checked": {
                            color: "black"
                          },

                          checked: {}
                        }}
                        checked={gilad}
                        onChange={handleChange}
                        name="gilad"
                      />
                    }
                    label="모든 약관에 동의"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        style={{
                          color: "black",
                          "&$checked": {
                            color: "black"
                          },

                          checked: {}
                        }}
                        checked={jason}
                        onChange={handleChange}
                        name="jason"
                      />
                    }
                    label="[필수] 서비스 이용약관 동의"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        style={{
                          color: "black",
                          "&$checked": {
                            color: "black"
                          },

                          checked: {}
                        }}
                        checked={antoine}
                        onChange={handleChange}
                        name="antoine"
                      />
                    }
                    label="[필수] 개인정보 수집 및 이용동의"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        style={{
                          color: "black",
                          "&$checked": {
                            color: "black"
                          },

                          checked: {}
                        }}
                        checked={antoine}
                        onChange={handleChange}
                        name="antoine"
                      />
                    }
                    label="[필수] 문자 알림 수신 동의"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        style={{
                          color: "black",
                          "&$checked": {
                            color: "black"
                          },

                          checked: {}
                        }}
                        checked={antoine}
                        onChange={handleChange}
                        name="antoine"
                      />
                    }
                    label="[필수] 문자 알림 수신 동의"
                  />
                </FormGroup>
                <FormHelperText>
                  쿠폰 및 포인트 발행에 있어 적합한 이벤트를 제공 하기 위한
                  서비스에 활용됩니다.
                </FormHelperText>
              </FormControl>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    props.history.push("/login/register/nineth");
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
