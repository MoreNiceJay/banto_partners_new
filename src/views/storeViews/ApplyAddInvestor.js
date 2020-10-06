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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import ProgressText from "../../components/ProgressText.js";
import InputTitle from "../../components/InputTitle.js";
import PTextField from "../../components/PTextField.js";
import SquareButton from "../../components/SquareButton.js";
import PRadio from "../../components/PRadio.js";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import PortionTextField from "../../components/PortionTextField.js";
var _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "44px" },
  headerSpace: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "60px"
  },

  root: {
    width: 200,
    "& .MuiOutlinedInput-input": {
      color: "green",
      textAlign: "center",
      height: "100px"
    },
    "& .MuiInputLabel-root": {
      color: "green",
      textAlign: "center"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
      textAlign: "center"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "red",
      textAlign: "center"
    },
    "&:hover .MuiInputLabel-root": {
      color: "red",
      textAlign: "center"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
      textAlign: "center"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "purple",
      textAlign: "center"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "purple",
      textAlign: "center"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
      textAlign: "center"
    }
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
  },
  textLabelInput: {
    "&::placeholder": {
      color: "blue"
    },
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "blue"
        },
        inputCenter: {
          textAlign: "center",
          color: "red"
        },
        color: "white"
      }
    }
  }
}));
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    },
    textAlign: "right"
  },
  input: {
    // borderRadius: 4,
    // position: "relative",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    // fontSize: 16,
    padding: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

function LoginPage(props) {
  const classes = useStyles(props);
  const [value, setValue] = React.useState("female");
  const context = useGlobal();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  let percentage = _.range(0, 26);

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
            <NavBar title="추가정보 입력" backLink="/store/apply/portion" />
          </header>

          <main>
            <section className={classes.section}>
              <ProgressText text="5/5" />
              <InputTitle text="협의된 투자자가 있으신가요?(선택)" />
              <div style={{ marginLeft: "8px" }}>
                <FormControl
                  component="fieldset"
                  style={{ margin: "28px 0 0 24px" }}
                >
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          style={{
                            color: "black",
                            "&$checked": {
                              color: "black"
                            },

                            checked: {}
                          }}
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          style={{
                            color: "black",
                            "&$checked": {
                              color: "black"
                            },

                            checked: {}
                          }}
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {value === "male" && (
                <>
                  <div style={{ marginTop: "40px" }}>
                    <InputTitle text="투자자의 전화번호" />
                    <PTextField placeholder="Phone Number" />
                  </div>
                  <div style={{ marginTop: "60px" }}>
                    <InputTitle text="약속된 수익률" />

                    <PortionTextField
                      className={classes.textLabelInput}
                      id="standard-full-width"
                      // label="0"
                      placeholder="%"
                      // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
                      value={
                        context.getInvestInfo.investAmount === 0
                          ? ""
                          : context.getInvestInfo.investAmount
                      }
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        context.setInvest_investAmount(value);
                      }}
                    />
                  </div>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (context.getInvestInfo.depositor === "") {
                      context.setInvest_depositor("유저");
                    }
                    props.history.push("/store/apply/final");
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
