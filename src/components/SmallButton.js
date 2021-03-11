import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = (props) =>
  makeStyles((theme) => ({
    smallButton: {}
  }));
function SmallButton(props) {
  const classes = useStyles(props);

  return (
    <>
      <Button
        className={classes.smallButton}
        style={{
          margin: "24px 32px",
          padding: props.padding,
          height: props.height,
          width: props.width,
          borderRadius: "15px",
          whiteSpace: "nowrap",
          border: "2px solid #000A12",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "14px",
          alignText: "right",

          backgroundColor: props.color === "black" ? "#000A12" : "#EEEEEE",
          color: props.color === "black" ? "#EEEEEE" : "#000A12"
        }}
        variant="outlined"
        {...props}
      >
        {props.title}
      </Button>
    </>
  );
}
export default SmallButton;
