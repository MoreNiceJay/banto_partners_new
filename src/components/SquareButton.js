import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  squareButton: {
    width: "64px",
    height: "64px",
    margin: "24px 24px",
    borderRadius: "15px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    border: "2px solid #000A12",
    backgroundColor: "white"

    // "& .Mui-disabled": {
    //   border: "2px solid red"
    // }
  }
}));
export default function PTextField(props) {
  const classes = useStyles(props);
  const SquareButton = withStyles({
    // root: {
    // disabledButton: {
    //   border: "2px solid red"
    // }
    // }
    //   color: "black",
    //   "&$checked": {
    //     color: "black"
    //   }
    // },
    // checked: {
    //   color: "black"
    // }
  })((props) => (
    <Button variant="outlined" className={classes.squareButton} {...props}>
      {props.text}
    </Button>
  ));
  return (

    <div
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <SquareButton {...props} />
    </div>

  );
}
