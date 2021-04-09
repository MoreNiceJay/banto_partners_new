import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { autoPlay } from "react-swipeable-views-utils";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import { useAuth } from "../AuthContext";
const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "44px" },
  myInfoLink: {
    fontSize: "14px",
    color: "#6f6f6f",
    padding: "10px",
    marginRight: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  section: { margin: "40px 0" },
  descriptionSpan: {
    fontSize: "14px",
    color: "#6f6f6f"
  },
  titleLink: { fontSize: "26px", fontWeight: "medium", marginTop: "20px" },
  root: {
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: "black"
    },
    // maxWidth: 400,
    width: "100%",
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50
    // paddingLeft: theme.spacing(4),
    // backgroundColor: theme.palette.background.default
  },
  img: {
    // height: 255,
    display: "block",
    // maxWidth: 400,
    overflow: "hidden",
    width: "calc(100%-48px)",
    height: "auto",
    margin: "0 auto",
    borderRadius: "18px"
  }
}));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/banto-partners.appspot.com/o/Group%20720.png?alt=media&token=e7b92440-5a0a-4bbc-bed4-27d27769f872"
  },
  {
    label: "Bird",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/banto-partners.appspot.com/o/Group%20721.png?alt=media&token=f4cfadbb-dc6d-43ea-b751-1c17e91c67d8"
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/banto-partners.appspot.com/o/Group%20722.png?alt=media&token=82311124-cfd5-4cde-9cf2-4c759eafee6e"
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/banto-partners.appspot.com/o/Group%20723.png?alt=media&token=75b6c26b-222e-476a-9ecd-cb0d2fe645a7"
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/banto-partners.appspot.com/o/Group%20724.png?alt=media&token=07a518e9-3cef-48e3-8e56-ace383391248"
  }
];

function MainPage(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const auth = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const LogoHeader = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "rows",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <img
        src={require("../assets/img/splash.png")}
        style={{ width: "167px", height: "auto", marginLeft: "24px" }}
        alt="logo"
      />

      <Link to="#">
        <span className={classes.myInfoLink}>
          {!!auth.user ? (
            <Link
              to="/mypage"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#838383"
              }}
            >
              마이 페이지 <ChevronRightIcon />
            </Link>
          ) : (
            <Link
              to="/login/login"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#838383"
              }}
            >
              로그인
              <ChevronRightIcon />
            </Link>
          )}
        </span>
      </Link>
    </div>
  );

  return (
    <>
      {/* <Slide
        direction="left"
        in={true}
        timeout={{ enter: "1s", exit: "5s" }}
        mountOnEnter
        unmountOnExit
      >
        <div> */}
      <div style={{ height: "100vh", width: "100%", backgroundColor: "white" }}>
        <header>
          <div className={classes.emptySpace}></div>
        </header>
        <main>
          <LogoHeader />
          <section className={classes.section}>
            <p
              className={classes.descriptionSpan}
              style={{ marginLeft: "30px", marginBottom: "10px" }}
            >
              {/* 이벤트 */}
            </p>

            {/* <div className={classes.root}> */}
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {tutorialSteps.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img
                      className={classes.img}
                      src={step.imgPath}
                      alt={step.label}
                      style={{ width: "90%" }}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <div
              id="hello"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignText: "center"
              }}
            >
              <MobileStepper
                style={{
                  background: "none",
                  width: "100%",
                  padding: "0px",
                  margin: "0 auto",
                  marginTop: "10px"
                }}
                variant="dots"
                steps={6}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === 5}
                  >
                    {/* Next */}
                    {/* {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )} */}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {/* {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )} */}
                    {/* Back */}
                  </Button>
                }
              />
              {/* </div> */}
            </div>
          </section>
          <section className={classes.section}>
            <div
              style={{
                border: "1px solid white",
                borderRadius: "16px",
                marginLeft: "16px",
                marginRight: "18px",
                height: "84px",
                backgroundColor: "white"
                // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                // backgroundColor: "#eeeeee",
              }}
            >
              <Link
                to="/battery-service-roll"
                style={{
                  color: "black",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <h1
                    className={classes.titleLink}
                    style={{ marginLeft: "24px" }}
                  >
                    보조배터리 대여서비스
                  </h1>
                  <p
                    style={{
                      marginLeft: "24px",
                      paddingTop: "12px",
                      color: "#c4c4c4"
                    }}
                  >
                    반토스테이션을 설치해 수익창출
                  </p>
                </div>
                <div>
                  <img
                    src={require("../assets/img/go.png")}
                    style={{
                      width: "32px",
                      height: "32px",
                      marginLeft: "auto",
                      marginRight: "24px"
                    }}
                    alt="goButton"
                  />
                </div>
              </Link>
            </div>
            {/* {auth.user && (
            <Link
              onClick={() => {
                auth.signOut();
                console.log("싸인아웃");
              }}
            >
              로그아웃
            </Link>
          )} */}
          </section>
        </main>
        <footer></footer>
        {/* </div>
      </Slide> */}
      </div>
    </>
  );
}

export default MainPage;
