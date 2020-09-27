import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import { MenuList } from "../../components/MenuList.js";
import BottomNavigation from "../../components/BottomNavigation.js";

import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "180px" }
}));
function InvestorMenu(props) {
  const classes = useStyles(props);

  const roleMenu = [
    {
      titleBold: "투자",
      titleRegular: "하기",
      link: "/investor/invest"
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
      <Slide
        direction="left"
        in={true}
        timeout={{ enter: "0.15s", exit: "5s" }}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <header>
            <NavBar title="" backLink="battery-service-roll" />
            <HeaderInfo
              title="투자자"
              description="반토 스테이션에 투자하여 수익을 창출할 수 있습니다"
            />
          </header>
          <main>
            <MenuList menuList={roleMenu} />
          </main>
          <div className={classes.emptySpace} />

          <footer></footer>
          <BottomNavigation />
        </div>
      </Slide>
    </>
  );
}

export default InvestorMenu;
