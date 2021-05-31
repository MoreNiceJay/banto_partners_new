import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  progressText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    opacity: "0.8",
    letterSpacing: "5px",
    margin: "16px 0 0 24px"
  }
}));
export default function ProgressText(props) {
  const classes = useStyles(props);

  return (
    <>
      <p className={classes.progressText}>{props.text}</p>
    </>
  );
}
