import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

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
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "44px" },
  myInfoLink: {
    fontSize: "14px",
    color: "#6f6f6f",
    padding: "10px",
    marginRight: "15px"
  },
  section: { margin: "40px 0" },
  descriptionSpan: {
    fontSize: "14px",
    color: "#6f6f6f"
  },
  titleLink: { fontSize: "25px", fontWeight: "700", marginTop: "20px" },
  root: {
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
    height: 255,
    display: "block",
    // maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  }
}));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60"
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
  }
];

function MainPage(props) {
  const classes = useStyles(props);
  const theme = useTheme();
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
  return (
    <>
      <header>
        <div className={classes.emptySpace}></div>
      </header>
      <main>
        <div style={{ display: "block", textAlign: "right" }}>
          <Link to="#">
            <span className={classes.myInfoLink}>내 정보</span>
          </Link>
        </div>
        <section className={classes.section}>
          <p
            className={classes.descriptionSpan}
            style={{ marginLeft: "30px", marginBottom: "10px" }}
          >
            이벤트
          </p>
          <div>
            <div className={classes.root}>
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
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                style={{
                  position: "relative",
                  bottom: "48px",
                  background: "none",
                  width: "100%",
                  padding: "0px"
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
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    {/* Back */}
                  </Button>
                }
              />
            </div>
          </div>
        </section>
        <section className={classes.section}>
          <span
            className={classes.descriptionSpan}
            style={{ marginLeft: "30px" }}
          >
            아이템 선택
          </span>
          <Link to="/battery-service-roll" style={{ color: "black" }}>
            <h1 className={classes.titleLink} style={{ marginLeft: "30px" }}>
              보조배터리 대여서비스
            </h1>
          </Link>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default MainPage;
