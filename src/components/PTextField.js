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
    fontFamily: "Montserrat",
    fontWeight: "bold",

    boxSizing: "border-box",
    marginTop: "10px"
  }
}));
const PtextField = withStyles({
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
    {...props}
    variant="outlined"
    id="standard-full-width"
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
  />
));
export default function PTextField(props) {
  const classes = useStyles(props);

  return (
    <>
      <PtextField
        // label="Phone Number"
        // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
        {...props}
        className={classes.textField}

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
