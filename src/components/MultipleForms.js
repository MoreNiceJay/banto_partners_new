import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  roleMenu: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "161px 0 0 32px",
    boxSizing: "border-box",
    "& p": { padding: "0 0 60px 0", display: "flex", alignItems: "center" }
  },
  menuListText: { fontSize: "26px", fontWeight: "700", color: "#000A12" },
  menuListTextRegular: {
    fontSize: "26px",
    fontWeight: "300",
    color: "#000A12"
  },
  goButtonImg: {
    width: "32px",
    height: "32px",
    marginLeft: "auto",
    marginRight: "32px"
  },

  root: {
    "& > *": {
      width: "100%"
    }
  },
  emptySpace: { width: "100%", height: "44px" },
  headerSpace: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "60px"
  },
  headerTitle: { fontSize: "18px", fontWeight: "bold", margin: "auto" },
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  },
  infoTextField: { marginTop: "10px", width: "calc(100% - 25px)" }
}));

export const MultipleForms = (props) => {
  const classes = useStyles(props);
  const dataExample = [
    {
      title: "이메일",
      contentText: "auth.user.email && auth.user.email",
      link: "/store/apply/address",
      bUsing: true,
      disabled: true
    },
    {
      title: "전화번호",
      contentText: "context.getStoreInfo.storeOwnerPhoneNumber",
      link: "/store/apply/contact",
      bUsing: true,
      disabled: true
    }
  ];
  const data = props.data;
  console.log(data, "데이터");
  return (
    <>
      <section className={classes.section}>
        {data.map((value) => {
          return (
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "space-between",
                  margin: "16px 0 0 24px"
                }}
              >
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000A12",
                    opacity: "0.6",
                    width: "100%"
                  }}
                >
                  {value.title}
                </p>
                <form className={classes.root} noValidate autoComplete="off">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      className={classes.infoTextField}
                      id="standard-basic"
                      variant="outlined"
                      disabled={value.disabled}
                      value={value.contentText}
                    />
                    {value.bButton ? (
                      <Button style={{ color: "blue" }}>수정</Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </div>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "24px",
                  margin: "16px 0 60px 24px",
                  color: "#000A12"
                }}
              >
                {value.data}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
};
