import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  roleMenu: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0px 0 0 0px",
    boxSizing: "border-box",
    "& p": { padding: "10px 0 10px 26px", display: "flex", alignItems: "center" }
  },
  menuListText: { fontSize: "16px", fontWeight: "medium", color: "#000A12" },
  menuListTextRegular: {
    fontSize: "26px",
    fontWeight: "300",
    color: "#000A12"
  },
  goButtonImg: {
    width: "26px",
    height: "26px",
    marginLeft: "auto",
    marginRight: "24px"
  }
}));

const SettingMenuList = (props) => {
  const classes = useStyles(props);

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
                <ChevronRightIcon
                  className={classes.goButtonImg}

                  alt="logo"
                />
              </p>
              <Divider />

            </Link>
          );
        })}
      </section>
    </>
  );
};

export default SettingMenuList