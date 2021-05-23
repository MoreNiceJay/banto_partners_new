import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import { MenuList } from "../../components/MenuList.js";
import BottomNavigation from "../../components/BottomNavigation.js";
import EmtySpace from "../../components/EmptySpace"
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "180px" }
}));
function InvestorMenu(props) {
  const classes = useStyles(props);

  const roleMenu = [
    {
      titleBold: "구매하기",
      titleRegular: "",
      link: "/investor/invest"
    },
    {
      titleBold: "신청서 상태",
      titleRegular: "",
      link: "/table/application?role=buyer"
    },
   

    {
      titleBold: "설치된 반토 스테이션",
      titleRegular: "",
      link: "/table/station?role=buyer"
    },
    {
      titleBold: "내 수익",
      titleRegular: "",
      link: "/table/earning?role=buyer"
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
              title="구매자"
              description="반토 스테이션을 구매하면 자동으로 수익을 창출할 수 있습니다"
            />
          </header>
          <main>
            <MenuList menuList={roleMenu} />
          </main>
          {/* 여기에 브로셔 넣기 */}
          <div className={classes.emptySpace} />

          <footer></footer>
          {/* <BottomNavigation /> */}
        </div>
      </Slide>
    </>
  );
}

export default InvestorMenu;
