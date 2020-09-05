import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { NavBar } from "../components/NavBar.js";
const useStyles = makeStyles((theme) => ({}));
function BatteryServiceRoll(props) {
  const classes = useStyles(props);

  return (
    <>
      <header>
        <NavBar title="" backLink="/main" />
      </header>
      <main>
        <section>
          <span>투자자</span> <span>이신가요?</span>
          <p>반토 스테이션에 투자해 수익을 창출할 수 있습니다</p>
        </section>
        <section>
          <span>영업</span> <span>이신가요?</span>
          <p>가맹점을 모집해 수익을 창출 할 수 있습니다</p>
        </section>
        <section>
          <span>가맹점</span> <span>이신가요?</span>
          <p>매장에 반토 스테이션을 무료로 설치 할 수 있습니다</p>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default BatteryServiceRoll;
