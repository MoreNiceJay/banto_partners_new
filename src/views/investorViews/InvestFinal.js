import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";

import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import { useGlobal } from "../../globalContext";

const useStyles = makeStyles((theme) => ({
  card: { backgroundColor: "black", margin: "12px 16px", borderRadius: "15px" },
  description: {
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px"
  },
  card2: {
    backgroundColor: "white",
    margin: "12px 16px",
    borderRadius: "15px",
    border: "2px solid #000A12",
    marginTop: "32px"
  },
  bankInfo: {
    display: "flex",
    flexDirection: "column",
    "& li": { marginTop: "32px" },
    textAlign: "center"
  },
  bankInfoDescription: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "21px"
  },
  bankInfoInfo: {
    fontWeight: "900",
    fontSize: "24px",
    lineHeight: "36px",
    marginTop: "8px"
  }
}));
function InvestFinal(props) {
  const classes = useStyles(props);
  const context = useGlobal();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const GreenCheckbox = withStyles({
    root: {
      color: "black",
      "&$checked": {
        color: "black"
      }
    },
    checked: {
      color: "black"
    }
  })((props) => <Checkbox color="default" {...props} />);

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
            <NavBar title="투자하기" backLink="/investor/invest" />
          </header>

          <main>
            <section>
              <Paper variant="outlined" square className={classes.card}>
                <div style={{ margin: "52px 24px" }}>
                  <p
                    style={{
                      color: "#5DDEF4",
                      fontWeight: "500",
                      fontSize: "16px",
                      textAlign: "center"
                    }}
                  >
                    총 금액
                  </p>
                  <p
                    style={{
                      color: "#5DDEF4",
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "32px",
                      lineHeight: "34px",
                      textAlign: "right",
                      marginTop: "16px",
                      textAlign: "center"
                    }}
                  >
                    {numberWithCommas(context.getInvestInfo.totalPrice) + " 원"}
                  </p>
                </div>
              </Paper>
              <p className={classes.description}>
                아래 계좌로 이체하시면 투자가 완료됩니다!
              </p>
            </section>
            <section className={classes.section}>
              <div className={classes.amount}>
                <Paper variant="outlined" square className={classes.card2}>
                  <div style={{ marginBottom: "32px" }}>
                    <ul className={classes.bankInfo}>
                      <li>
                        <p className={classes.bankInfoDescription}>은행</p>
                        <p className={classes.bankInfoInfo}>기업은행</p>
                      </li>
                      <li>
                        <p className={classes.bankInfoDescription}>계좌번호</p>
                        <p className={classes.bankInfoInfo}>010112149493</p>
                      </li>
                      <li>
                        <p className={classes.bankInfoDescription}>계좌명</p>
                        <p className={classes.bankInfoInfo}>반토주식회사</p>
                      </li>
                    </ul>
                  </div>
                </Paper>
                <div>
                  <FormControlLabel
                    style={{ marginLeft: "24px" }}
                    control={
                      <GreenCheckbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleChecked />}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "14px",
                          lineHeight: "21px"
                        }}
                      >
                        2020년 하반기 정책사항에 동의 합니다
                      </span>
                    }
                  />
                  <p style={{ textAlign: "right" }}>
                    <Link
                      style={{
                        marginRight: "32px",
                        textDecoration: "underline"
                      }}
                    >
                      {" "}
                      약관확인
                    </Link>
                  </p>
                </div>
              </div>
              <div className={classes.root}></div>
              <div style={{}}>
                <Button
                  variant="contained"
                  style={{
                    width: "calc(100% - 32px)",
                    height: "64px",
                    margin: "40px 16px",
                    borderRadius: "15px",
                    border: "2px solid #000A12",
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#ECEFF1",
                    backgroundColor: "black"
                  }}
                >
                  완료
                </Button>
              </div>
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default InvestFinal;
