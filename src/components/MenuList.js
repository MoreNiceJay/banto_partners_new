import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

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
  menuListText: { fontSize: "26px", fontWeight: "medium", color: "#000A12" },
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
  }
}));

export const MenuList = (props) => {
  const classes = useStyles(props);
  const dataExample = [
    {
      titleBold: "투자",
      titleRegular: "하기",
      link: "/sales/regist/contact"
    },
    {
      titleBold: "수익",
      titleRegular: "확인",
      link: "/sales/regist/contact"
    },

    {
      titleBold: "스테이션",
      titleRegular: " 정보",
      link: "/sales/regist/contact"
    }
  ];
  return (
    <>
      <section className={classes.roleMenu} {...props}>
        {props.menuList.map((value) => {
          return (
            <Link to={value.link}>
              <p className={classes.menuListText}>
                {value.titleBold}
                <span className={classes.menuListTextRegular}>
                  {value.titleRegular}
                </span>
                <img
                  className={classes.goButtonImg}
                  src={require("../assets/img/go.png")}
                  alt="logo"
                />
              </p>
            </Link>
          );
        })}
      </section>
    </>
  );
};
