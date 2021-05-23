import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import { MenuList } from "../../components/MenuList.js";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
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
  const auth = useAuth();

  const roleMenu = [
    {
      titleBold: "가맹점 등록하기",
      titleRegular: "",
      link: "/sales/regist/address"
    }
,
{
  titleBold: "신청서 상태",
  titleRegular: "",
  link: "/table/application?role=salesManager"
},
    {
      titleBold: "설치된 반토 스테이션",
      titleRegular: "",
      link: "/table/station?role=salesManager"
    },
   
    ,
    {
      titleBold: "내 수익",
      titleRegular: "",
      link: "/table/earning?role=salesManager"
    },
  ];
  return (
    <>
      {!auth.userExtraInfo && (
        <>
          <Alert
            type="info"
            title="체험하기"
            description="현재 체험히기를 이용중입니다"
            actionDescription="로그인"
            link="/login/login"
            onClick={() => {
              props.history.push("/login/login");
            }}
          ></Alert>
        </>
      )}
      <header>
        <NavBar title="" backLink="battery-service-roll" />
        <HeaderInfo
          title="영업"
          description="가맹점을 찾아 등록하면 매달 자동으로 수익이 창출 됩니다"
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
