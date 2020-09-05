import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import { MenuList } from "../../components/MenuList.js";

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

function SalesMenu(props) {
  const classes = useStyles(props);
  const roleMenu = [
    { title: "투자하기", link: "#", badge: false },
    { title: "수익확인", link: "#", badge: false },

    { title: "스테이션 정보", link: "#", badge: false },
    { title: "알림함", link: "#", badge: true }
  ];
  return (
    <>
      <header>
        <NavBar title="" backLink="/main" />
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
