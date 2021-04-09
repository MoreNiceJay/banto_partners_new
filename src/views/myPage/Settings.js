import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import { MenuList } from "../../components/MenuList.js";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
const useStyles = makeStyles((theme) => ({}));

function SalesMenu(props) {
  const classes = useStyles(props);

  const roleMenu = [
    {
      titleBold: "알람세팅",
      titleRegular: "",
      link: "/mypage/settings/alarmsetting"
    },
    {
      titleBold: "고객센터",
      titleRegular: "",
      link: "/mypage/settings/customercenter"
    },

    {
      titleBold: "공지",
      titleRegular: " ",
      link: "/mypage/settings/notice"
    },
    {
      titleBold: "정책",
      titleRegular: " ",
      link: "/mypage/settings/policies"
    }
  ];
  return (
    <>
      <header>
        <NavBar title="" backLink="battery-service-roll" />
        <HeaderInfo title="Settings" description="" />
      </header>
      <main>
        <MenuList menuList={roleMenu} />
      </main>
      <footer></footer>
    </>
  );
}

export default SalesMenu;
