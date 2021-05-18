import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import NavBar from "../components/NavBar.js";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SubTitle from "../components/SubTitle";
const useStyles = makeStyles((theme) => ({
  section: { padding: "55px 0 0 25px" },
  rollSpan: { fontSize: "24px" },
  rollRestSpan: { fontSize: "24px", fontWeight: "300" },
  rollDescription: {
    fontWeight: "300",
    fontSize: "14px",
    color: "#6f6f6f",
    padding: "8px 8px 8px 0px"
  }
}));
function BatteryServiceRoll(props) {
  const classes = useStyles(props);
  const SectionMenu = ({ link, title, description }) => {
    return (
      <section className={classes.section}>
        <Link to={link} style={{ color: "black" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center"
            }}
          >
            <div>
              <span className={classes.rollSpan}>{title} </span>
              <p className={classes.rollDescription}>{description}</p>
            </div>
            <ChevronRightIcon style={{ paddingRight: "25px" }} />
          </div>
        </Link>
      </section>
    );
  };

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
            <NavBar title="보조배터리 대여서비스" backLink="/main" />
          </header>

          <main>
            <SubTitle title="역할 선택" />

            <SectionMenu
              link="/investormenu"
              title="구매자로 시작"
              description="반토 스테이션을 구입해 수익을 창출 합니다"
            />
            <SectionMenu
              link="/salesmenu"
              title="세일즈로 시작"
              description="반토 스테이션을 소개해 수익을 창출 합니다"
            />
            <SectionMenu
              link="/storemenu"
              title="가맹점으로 시작"
              description="매장에 반토 스테이션을 무료로 설치 할 수 있습니다"
            />
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default BatteryServiceRoll;
