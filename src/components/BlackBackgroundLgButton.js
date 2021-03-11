import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
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
export function BlackBackgroundLgButton(props) {
  const classes = useStyles(props);

  return (
    <>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "rows",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          ></div>

          <Button
            variant="outlined"
            onClick={props.onClick}
            style={{
              width: "calc(100% - 64px)",
              height: "64px",
              margin: "24px 32px",
              borderRadius: "15px",
              backgroundColor: "#000A12",
              border: "2px solid #000A12",
              fontFamily: "Noto Sans CJK KR",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "18px",
              color: "white"
            }}
          >
            {props.title}
          </Button>
        </div>
      </section>
    </>
  );
}
