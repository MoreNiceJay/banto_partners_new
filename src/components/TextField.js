import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import MTextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
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
export function TextField({ title, description }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>{title}</span>
            <span className={classes.contactPersonDescription}>
              {description}
            </span>
          </div>
          <MTextField
            className={classes.contactPersonTextField}
            id="outlined-basic"
            inputProps={{ inputMode: "numeric" }}
            label="*필수"
            variant="outlined"
          />
        </div>
      </div>
    </>
  );
}
