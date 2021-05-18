import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";

const useStyles = makeStyles((theme) => ({
  amount: {
    // textAlign: "center"
  },
  amountDescriptionP: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    margin: "0 24px",
    marginTop: "27px"
    // textAlign: "left"
  },
  card: {
    height: "138px",
    margin: "0 17px",
    marginTop: "12px",
    borderRadius: "15px",
    backgroundColor: "#000A12"
  },
  textLabelInput: {
    "&::placeholder": {
      color: "blue"
    },
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "blue"
        },

        color: "white"
      }
    }
  }
}));
function InvestStart(props) {
  const classes = useStyles(props);
  const context = useGlobal();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const auth = useAuth();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
          {!auth.userExtraInfo && (
            <>
              <Alert
                type="info"
                title="체험하기"
                description="현재 체험히기를 이용중입니다"
                actionDescription="로그인"
                link="/login/login"
                onClick={() => {
                  props.history.push("/login/login");
                }}
              ></Alert>
            </>
          )}
          <header>
            <NavBar title="투자하기" backLink="/investormenu" />
          </header>

          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                    opacity: "0.8",
                    letterSpacing: "5px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  1/2
                </p>
                <p className={classes.amountDescriptionP}>투자 수량</p>
                <TextField
                  className={classes.textLabelInput}
                  id="standard-full-width"
                  // label="0"
                  placeholder="0"
                  helperText="투자하신 기기 수량만큼 수익(70%)이 창출됩니다"
                  value={
                    context.getInvestInfo.investAmount === 0
                      ? ""
                      : context.getInvestInfo.investAmount
                  }
                  style={{
                    margin: "0 24px",
                    marginTop: "12px",
                    width: "calc(100% - 64px)"
                  }}
                  InputLabelProps={{}}
                  inputProps={{
                    classes: { input: classes.textLabelInput },
                    inputMode: "numeric",
                    maxLength: 4,

                    style: {
                      textAlign: "right",
                      fontSize: "50px",
                      fontFamily: "Montserrat",
                      fontWeight: "800",
                      borderBottom: `5px solid black`,
                      paddingRight: "10px",
                      boxSizing: "border-box"
                    }
                  }}
                  FormHelperTextProps={{
                    style: {
                      // marginTop: "12px",
                      color: "#000A12",
                      opacity: "0.7",
                      fontSize: "14px"
                    }
                  }}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setTotalPrice(value * 329000);
                    console.log("토탈프라이스");
                    if (value > 0) {
                      setButtonDisabled(false);
                    } else if (value === 0) {
                      setButtonDisabled(true);
                    }
                    context.setInvest_amount(value);
                    context.setInvest_totalPrice(value * 329000);
                  }}
                />
              </div>
              <div className={classes.root}>
                <Paper
                  variant="outlined"
                  square
                  className={classes.card}
                  style={{
                    boxShadow: "0px 6px 10px rgba(0, 10, 18, 0.2)"
                  }}
                >
                  <div
                    style={{
                      margin: "40px 24px",
                      boxShadow: "0px 6px 10px rgba(0, 10, 18, 0.2)"
                    }}
                  >
                    <p
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#ECEFF1",
                        opacity: "0.6"
                      }}
                    >
                      총 금액
                    </p>
                    <p
                      style={{
                        color: "#ECEFF1",
                        fontFamily: "Montserrat",
                        fontStyle: "normal",
                        fontWeight: "800",
                        fontSize: "28px",
                        lineHeight: "34px",
                        textAlign: "left",
                        marginTop: "16px"
                      }}
                    >
                      {numberWithCommas(totalPrice) + " 원"}
                    </p>
                  </div>
                </Paper>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (totalPrice === 0 || !!!totalPrice) {
                      window.alert("1대 이상 구매해 주세요");
                      return;
                    }

                    context.setInvest_totalPrice(totalPrice);
                    console.log(context.getInvestInfo);

                    props.history.push("/investor/depositor");
                  }}
                  disabled={buttonDisabled}
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "24px 32px",
                    borderRadius: "15px",
                    border: buttonDisabled
                      ? "2px solid #f1f1f1"
                      : "2px solid #000A12",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "12px"
                  }}
                >
                  다음
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

export default InvestStart;