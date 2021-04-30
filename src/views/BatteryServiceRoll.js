import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import NavBar from "../components/NavBar.js";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";

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
            <section className={classes.section}>
              <p
                style={{
                  marginBottom: "44px",
                  fontSize: "28px",
                  fontWeight: "bold"
                }}
              >
                역할
              </p>
              <Link to="/investormenu" style={{ color: "black" }}>
                <span className={classes.rollSpan}>구매자로 시작</span>
                <p className={classes.rollDescription}>
                  반토 스테이션을 구입해 수익을 창출 합니다
                </p>
              </Link>
            </section>
            <section className={classes.section}>
              <Link to="/salesmenu" style={{ color: "black" }}>
                <span className={classes.rollSpan}>세일즈로 시작</span>
              </Link>
              <p className={classes.rollDescription}>
                반토 스테이션을 소개해 수익을 창출 합니다
              </p>
            </section>
            <section className={classes.section}>
              <Link to="/storemenu" style={{ color: "black" }}>
                <span className={classes.rollSpan}>가맹점으로 시작</span>
              </Link>
              <p className={classes.rollDescription}>
                매장에 반토 스테이션을 무료로 설치 할 수 있습니다
              </p>
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default BatteryServiceRoll;
