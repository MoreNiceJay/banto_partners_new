import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { autoPlay } from "react-swipeable-views-utils";

const useStyles = makeStyles((theme) => ({}));
function MainPage(props) {
  const classes = useStyles(props);

  return (
    <>
      <header>
        <span>내정보</span>
      </header>
      <main>
        <section>
          <span>이벤트</span>
        </section>
        <section>
          <span>아이템 선택</span>
          <h1>보조배터리 대여서비스</h1>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default MainPage;
