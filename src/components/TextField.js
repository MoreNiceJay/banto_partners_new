import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MTextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((props) => ({
  contact: { padding: "55px 0 0 25px" },
  contactPerson: { display: "flex", flexDirection: "column" },
  contactTexts: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "baseline"
  },
  contactPersonTitle: { fontSize: "25px", fontWeight: "700" },
  contactPersonDescription: {
    fontSize: "14px",
    color: "#6f6f6f",
    paddingLeft: "10px"
  },
  contactPersonTextField: { marginTop: "10px", width: "calc(100% - 25px)" },
  nextButton: {
    fontSize: "25px",
    fontWeight: "700",
    borderRadius: "0",
    border: "none",
    marginTop: "40px",
    position: "absolute",
    padding: "0 25px",
    right: "0px",
    display: "block",
    margin: "0 auto"
  }
}));
export function TextField(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>{props.title}</span>
            <span className={classes.contactPersonDescription}>
              {props.description}
            </span>
          </div>
          <MTextField
            className={classes.contactPersonTextField}
            id="outlined-basic"
            inputProps={props.inputProps}
            label="*필수"
            variant="outlined"
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      </div>
    </>
  );
}
