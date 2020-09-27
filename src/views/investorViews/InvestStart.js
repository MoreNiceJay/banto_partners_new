import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { useGlobal } from "../../globalContext";

const useStyles = makeStyles((theme) => ({
  amount: {
    // textAlign: "center"
  },
  amountDescriptionP: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "22px",
    margin: "0 32px",
    marginTop: "27px"
    // textAlign: "left"
  },
  card: {
    height: "138px",
    margin: "0 17px",
    marginTop: "12px",
    borderRadius: "15px",
    backgroundColor: "#000A12"
  }
}));
function InvestStart(props) {
  const classes = useStyles(props);
  const context = useGlobal();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
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
          <header>
            <NavBar title="투자하기" backLink="/investormenu" />
          </header>

          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                <p className={classes.amountDescriptionP}>투자수량</p>
                <TextField
                  id="standard-full-width"
                  // label="Label"
                  // placeholder="0"
                  type="number"
                  helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
                  value={context.getInvestInfo.investAmount.toString()}
                  style={{
                    margin: "0 32px",
                    marginTop: "12px",
                    width: "calc(100% - 64px)"
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
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
                      marginTop: "12px",
                      fontSize: "14px"
                    }
                  }}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setTotalPrice(value * 329000);
                    if (value > 0) {
                      setButtonDisabled(false);
                    } else if (value === 0) {
                      setButtonDisabled(true);
                    }
                    context.setInvest_investAmount(value);
                  }}
                />
              </div>
              <div className={classes.root}>
                <Paper variant="outlined" square className={classes.card}>
                  <div style={{ margin: "32px 24px" }}>
                    <p
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: "16px"
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
                        textAlign: "right",
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
                    props.history.push("/investor/final");
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
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "12px"
                  }}
                >
                  next
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
