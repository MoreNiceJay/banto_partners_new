import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MTextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((props) => ({
  contact: { padding: "0px 0 0 24px" },
  contactPerson: { display: "flex", flexDirection: "column" },
  contactTexts: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "baseline"
  },
  contactPersonTitle: { fontSize: "24px", fontWeight: "700" },
  contactPersonDescription: {
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    marginTop: "16px",
    marginLeft: "12px",
    marginRight: "24px",
    color: "black",
    lineHeight: "150%",
    marginBottom: "8px"
  },
  contactPersonTextField: { marginTop: "10px", width: "calc(100% - 24px)" },
  nextButton: {
    fontSize: "25px",
    fontWeight: "700",
    borderRadius: "0",
    border: "none",
    marginTop: "40px",
    position: "absolute",
    padding: "0 24px",
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
            variant="outlined"
            value={props.value}

            onChange={props.onChange}
            {...props}
          />
        </div>
      </div>
    </>
  );
}
