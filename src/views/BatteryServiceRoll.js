import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { NavBar } from "../components/NavBar.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  section: { padding: "55px 0 0 25px" },
  rollSpan: { fontSize: "30px", fontWeight: "700" },
  rollRestSpan: { fontSize: "22px", fontWeight: "500" },
  rollDescription: { fontSize: "14px", color: "#6f6f6f", padding: "5px" }
}));
function BatteryServiceRoll(props) {
  const classes = useStyles(props);

  return (
    <>
      <header>
        <NavBar title="보조배터리 대여서비스" backLink="/main" />
      </header>
      <main>
        <section className={classes.section}>
          <span className={classes.rollSpan}>투자자</span>{" "}
          <span className={classes.rollRestSpan}>이신가요?</span>
          <p className={classes.rollDescription}>
            반토 스테이션에 투자해 수익을 창출할 수 있습니다
          </p>
        </section>
        <section className={classes.section}>
          <Link to="/salesmenu" style={{ color: "black" }}>
            <span className={classes.rollSpan}>영업</span>{" "}
            <span className={classes.rollRestSpan}>이신가요?</span>
          </Link>
          <p className={classes.rollDescription}>
            가맹점을 모집해 수익을 창출 할 수 있습니다
          </p>
        </section>
        <section className={classes.section}>
          <span className={classes.rollSpan}>가맹점</span>{" "}
          <span className={classes.rollRestSpan}>이신가요?</span>
          <p className={classes.rollDescription}>
            매장에 반토 스테이션을 무료로 설치 할 수 있습니다
          </p>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default BatteryServiceRoll;
