import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
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
      title: "스테이션 설치/등록",
      link: "/sales/regist/contact",
      badge: false
    },
    { title: "수익확인", link: "#", badge: false },

    { title: "스테이션 정보", link: "#", badge: false },
    { title: "알림함", link: "#", badge: true }
  ];
  return (
    <>
      <header>
        <NavBar title="" backLink="battery-service-roll" />
        <HeaderInfo
          title="영업"
          description="가맹점을 모집해 수익을 창출 할 수 있습니다"
        />
      </header>
      <main>
        <MenuList menuList={roleMenu} />
      </main>
      <footer></footer>
    </>
  );
}

export default SalesMenu;
