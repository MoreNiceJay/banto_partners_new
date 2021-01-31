import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontFamily: "Noto Sans CJK KR",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    margin: "0 24px",
    paddingTop: "16px"
    // textAlign: "left"
  }
}));
export default function InputTitle(props) {
  const classes = useStyles(props);

  return (
    <>
      <p className={classes.inputTitle}>{props.text}</p>
    </>
  );
}
