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
      titleBold: "등록",
      titleRegular: "하기",
      link: "/sales/regist/address"
    },
    {
      titleBold: "수익",
      titleRegular: "확인",
      link: "/table/earning?role=salesManager"
    },

    {
      titleBold: "스테이션",
      titleRegular: " 정보",
      link: "/table/station?role=salesManager"
    },
    {
      titleBold: "신청서",
      titleRegular: "상태",
      link: "/table/application?role=salesManager"
    }
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
