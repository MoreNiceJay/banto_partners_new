import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  headerInfo: { padding: "25px 0 0 30px" },
  headerTitle: { fontSize: "30px", fontWeight: "700", color: "black" },
  headerDescription: { paddingTop: "5px", fontSize: "14px", color: "#6f6f6f" },
  roleMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "45px 0 0 40px",
    "& p": { padding: "0 0 40px 0" }
  },
  menuListText: { fontSize: "25px", fontWeight: "600", color: "black" }
}));

export const MenuList = (props) => {
  const classes = useStyles(props);
  const dataExample = [
    { title: "등록하기", link: "#", badge: false },
    { title: "수익확인", link: "#", badge: false },
    { title: "스테이션 정보", link: "#", badge: false },
    { title: "알림함", link: "#", badge: true }
  ];
  return (
    <>
      <section className={classes.roleMenu}>
        {props.menuList.map((value) => {
          if (value.badge) {
            return (
              <Link to={value.link}>
                <Badge badgeContent={" "} color="error">
                  <p className={classes.menuListText}>{value.title}</p>
                </Badge>
              </Link>
            );
          }
          return (
            <Link to={value.link}>
              <p className={classes.menuListText}>{value.title}</p>
            </Link>
          );
        })}
      </section>
    </>
  );
};
