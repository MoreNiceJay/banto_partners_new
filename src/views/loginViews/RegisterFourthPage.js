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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  }
}));

function LoginPage(props) {
  const classes = useStyles(props);
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
            <NavBar title="정책동의 " backLink="/login/register/third" />
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
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "16px",
                    opacity: "0.8",
                    margin: "16px 0 0 24px"
                  }}
                >
                  정책 동의
                </p>

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
                    onClick={() => {
                      props.history.push("/login/register/final");
                    }}
                    disabled={
                      !state.checkedA && !state.checkedB && !state.checkC
                    }
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
