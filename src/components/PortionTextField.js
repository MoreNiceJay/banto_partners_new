import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none"
    },
    margin: "0 24px",
    marginTop: "12px",
    width: "calc(100% - 64px)"
  },
  inputStyle: {
    paddingLeft: "0px",
    fontSize: "26px",
    fontWeight: "bold",

    boxSizing: "border-box",
    marginTop: "10px"
  },
  PortionTextField: {
    margin: "0 24px",
    marginTop: "12px",
    width: "calc(100% - 64px)"
  }
}));
const PPortionTextField = withStyles({
  // root: {
  //   color: "black",
  //   "&$checked": {
  //     color: "black"
  //   }
  // },
  // checked: {
  //   color: "black"
  // }
})((props) => (
  <TextField
    // className={classes.textLabelInput}
    id="standard-full-width"
    {...props}
    // label="0"
    // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
    InputLabelProps={{}}
    FormHelperTextProps={{
      style: {
        // marginTop: "212px",
        color: "#000A12",
        opacity: "0.7",
        fontSize: "14px"
      }
    }}
  />
));
export default function PortionTextField(props) {
  const classes = useStyles(props);

  return (
    <>
      <PPortionTextField
        // label="Phone Number"
        // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
        {...props}
        className={classes.PortionTextField}
        inputProps={{
          classes: { input: classes.textLabelInput },
          inputMode: "numeric",
          maxLength: 4,

          style: {
            textAlign: "right",
            fontSize: "50px",
            fontWeight: "800",
            borderBottom: `5px solid black`,
            paddingRight: "10px",
            boxSizing: "border-box"
          }
        }}
      // FormHelperTextProps={{
      //   style: {
      //     marginTop: "12px",
      //     fontSize: "14px"
      //   }
      // }}
      />
    </>
  );
}
