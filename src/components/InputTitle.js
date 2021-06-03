import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    margin: "0 24px",
    paddingTop: "16px"
    // textAlign: "left"
  },
  inputPlaceholder: {
    fontWeight: "normal",
    fontSize: "14px",

  }
}));
export default function InputTitle(props) {
  const classes = useStyles(props);

  return (
    <>
      <p className={classes.inputTitle}>{props.text} {" "}<span className={classes.inputPlaceholder}>{props.placeholder}</span></p>
    </>
  );
}
