import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SubTitle from "../../components/SubTitle";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "44px" },
  headerSpace: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "60px"
  },
  headerTitle: { fontSize: "18px", fontWeight: "bold", margin: "auto" },
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      // border: "none"
    }
  },
  select: {
    "&:before": {
      // border: "none"
    },
    "&:after": {
      // border: "none"
    },
    "&:hover:not(.Mui-disabled):before": {
      // border: "none"
    },
    "&:hover::before": {
      // border: "none"
    }
  }
}));

function LoginPage(props) {
  const classes = useStyles(props);
  const [value, setValue] = React.useState("yes");
  const [bank, setBank] = React.useState("");
  const context = useGlobal();
  const auth = useAuth();
  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "yes") {
      console.log(auth.userExtraInfo);
      if (auth.userExtraInfo) {
        context.setInvest_bank(auth.userExtraInfo.bank);
        context.setInvest_bankAccount(auth.userExtraInfo.accountNumber);
        context.setInvest_depositor(auth.userExtraInfo.depositor);
      }
    }
  };
  const handleSlectChange = (event) => {
    console.log(event.target.value);
    console.log(context.getInvestInfo);
    context.setInvest_bank(event.target.value);
  };
  React.useEffect(() => {
    if (auth.userExtraInfo) {
      context.setInvest_bank(auth.userExtraInfo.bank);
      context.setInvest_bankAccount(auth.userExtraInfo.accountNumber);
      context.setInvest_depositor(auth.userExtraInfo.depositor);
    }
  }, []);
  const textFieldsBody = (
    <>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        입금자명
      </p>

      <TextField
        variant="outlined"
        id="standard-full-width"
        // label="Phone Number"
        className={classes.textField}
        placeholder="Name"
        // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
        value={context.getInvestInfo.depositor}
        onChange={(e) => {
          context.setInvest_depositor(e.target.value);
        }}
        style={{
          margin: "0 24px",
          marginTop: "12px",
          width: "calc(100% - 64px)"
        }}
        InputLabelProps={{
          style: {}
        }}
        inputProps={{
          style: {
            // paddingLeft: "0px",
            fontSize: "26px",
            fontFamily: "Montserrat",
            fontWeight: "bold"

            // boxSizing: "border-box",
            // marginTop: "10px"
          }
        }}
      />
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        은행
      </p>

      <div>
        <FormControl
          style={{
            margin: "0 0 0 24px",
            marginTop: "4px",
            width: "calc(100% - 64px)"
          }}
        >
          <InputLabel
            shrink={false}
            style={{
              paddingLeft: "0px",
              fontSize: "26px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              color: "black",
              opacity: "0.4",
              boxSizing: "border-box"
            }}
            id="demo-simple-select-label"
          ></InputLabel>

          <Select
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={context.getInvestInfo.bank}
            placeholder="Bank"
            variant="outlined"
            style={{
              fontSize: "26px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              boxSizing: "border-box",
              marginTop: "10px"
            }}
            onChange={handleSlectChange}
            // native={true}
            inputProps={{
              style: {
                fontSize: "26px",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                boxSizing: "border-box",
                marginTop: "10px"
              }
            }}
          >
            <MenuItem value={"경남은행"}>경남은행</MenuItem>
            <MenuItem value={"광주은행"}>광주은행</MenuItem>
            <MenuItem value={"국민은행"}>국민은행</MenuItem>
            <MenuItem value={"기업은행"}>기업은행</MenuItem>
            <MenuItem value={"농협"}>농협</MenuItem>
            <MenuItem value={"지역농협"}>지역농협</MenuItem>
            <MenuItem value={"대구은행"}>대구은행</MenuItem>
            <MenuItem value={"부산은행"}>부산은행</MenuItem>
            <MenuItem value={"도이치은행"}>도이치은행</MenuItem>
            <MenuItem value={"산업은행"}>산업은행</MenuItem>
            <MenuItem value={"상호저축은행"}>상호저축은행</MenuItem>
            <MenuItem value={"새마을금고"}>새마을금고</MenuItem>
            <MenuItem value={"수협"}>수협</MenuItem>
            <MenuItem value={"신한은행"}>신한은행</MenuItem>
            <MenuItem value={"신협"}>신협</MenuItem>
            <MenuItem value={"씨티은행"}>씨티은행</MenuItem>
            <MenuItem value={"외한은행"}>외한은행</MenuItem>
            <MenuItem value={"우리은행"}>우리은행</MenuItem>
            <MenuItem value={"우체국"}>우체국</MenuItem>
            <MenuItem value={"전북은행"}>전북은행</MenuItem>
            <MenuItem value={"제주은행"}>제주은행</MenuItem>
            <MenuItem value={"카카오뱅크"}>카카오뱅크</MenuItem>
            <MenuItem value={"하나은행"}>하나은행</MenuItem>
            <MenuItem value={"케이뱅크"}>케이뱅크</MenuItem>
            <MenuItem value={"SC은행"}>SC은행</MenuItem>
            <MenuItem value={"HSBC은행"}>HSBC은행</MenuItem>
            <MenuItem value={"교보증권"}>교보증권</MenuItem>
            <MenuItem value={"대신증권"}>대신증권</MenuItem>
            <MenuItem value={"대우증권"}>대우증권</MenuItem>
            <MenuItem value={"동부증권"}>동부증권</MenuItem>
            <MenuItem value={"메리츠종합금융증권"}>메리츠종합금융증권</MenuItem>
            <MenuItem value={"미래에셋증권"}>미래에셋증권</MenuItem>
            <MenuItem value={"부국증권"}>부국증권</MenuItem>
            <MenuItem value={"삼성증권"}>삼성증권</MenuItem>
            <MenuItem value={"신영증권"}>신영증권</MenuItem>
            <MenuItem value={"신한금융투자"}>신한금융투자</MenuItem>
            <MenuItem value={"아이엠투자증권"}>아이엠투자증권</MenuItem>
            <MenuItem value={"우리투자증권"}>우리투자증권</MenuItem>
            <MenuItem value={"유안타증권"}>유안타증권</MenuItem>
            <MenuItem value={"유진투자증권"}>유진투자증권</MenuItem>
            <MenuItem value={"이트레이드증권"}>이트레이드증권</MenuItem>
            <MenuItem value={"키움증권"}>키움증권</MenuItem>
            <MenuItem value={"하나대투증권"}>하나대투증권</MenuItem>
            <MenuItem value={"하이투자증권"}>하이투자증권</MenuItem>
            <MenuItem value={"한국투자증권"}>한국투자증권</MenuItem>
            <MenuItem value={"한화투자증권"}>한화투자증권</MenuItem>
            <MenuItem value={"현대증권"}>현대증권</MenuItem>
            <MenuItem value={"HMC투자증권"}>HMC투자증권</MenuItem>
            <MenuItem value={"LIG투자증권"}>LIG투자증권</MenuItem>
            <MenuItem value={"NH농협증권"}>NH농협증권</MenuItem>
            <MenuItem value={"SK증권"}>SK증권</MenuItem>
            <MenuItem value={"산림조합"}>산림조합</MenuItem>
          </Select>
        </FormControl>
      </div>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        계좌번호
      </p>

      <TextField
        variant="outlined"
        id="standard-full-width"
        // label="Phone Number"
        className={classes.textField}
        placeholder="Bank Account"
        // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
        value={context.getInvestInfo.bankAccount}
        onChange={(e) => {
          context.setInvest_bankAccount(e.target.value);
        }}
        style={{
          margin: "0 24px",
          marginTop: "12px",
          width: "calc(100% - 64px)"
        }}
        InputLabelProps={{
          style: {}
        }}
        inputProps={{
          style: {
            // paddingLeft: "0px",
            fontSize: "26px",
            fontFamily: "Montserrat",
            fontWeight: "bold"

            // boxSizing: "border-box",
            // marginTop: "10px"
          }
        }}
      />
    </>
  );

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
            <NavBar title="추가정보 입력" backLink="/investor/invest" />
          </header>

          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                    opacity: "0.8",
                    letterSpacing: "5px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  2/4
                </p>
                <SubTitle title="계좌정보" />
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    paddingTop: "12px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  입금자명이{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      fontSize: "18px"
                    }}
                  >
                    {auth.userExtraInfo ? auth.userExtraInfo.name : "홍길동"}
                  </span>
                  입니다
                </p>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  입금 은행은{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      fontSize: "18px"
                    }}
                  >
                    {auth.userExtraInfo ? auth.userExtraInfo.bank : "반토은행"}
                  </span>
                  입니다
                </p>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  계좌번호는{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      fontSize: "18px"
                    }}
                  >
                    {auth.userExtraInfo
                      ? auth.userExtraInfo.accountNumber
                      : "12312312345"}
                  </span>
                  입니다
                </p>
              </div>
              <div style={{ marginLeft: "8px" }}>
                <FormControl
                  component="fieldset"
                  style={{ margin: "28px 0 0 24px" }}
                >
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={
                        <Radio
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          style={{
                            color: "black",
                            "&$checked": {
                              color: "black"
                            },

                            checked: {}
                          }}
                        />
                      }
                      label="네. 일치합니다"
                    />
                    <FormControlLabel
                      value="no"
                      control={
                        <Radio
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          style={{
                            color: "black",
                            "&$checked": {
                              color: "black"
                            },

                            checked: {}
                          }}
                        />
                      }
                      label="아니오"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {value === "no" && textFieldsBody}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (value === "yes") {
                      if (!auth.userExtraInfo) {
                        context.setInvest_bank("반토은행");
                        context.setInvest_bankAccount("12312312345");
                        context.setInvest_depositor("홍길동");
                        props.history.push("/investor/method");

                        return;
                      }
                      context.setInvest_bank(auth.userExtraInfo.bank);
                      context.setInvest_bankAccount(
                        auth.userExtraInfo.accountNumber
                      );
                      context.setInvest_depositor(auth.userExtraInfo.name);
                    }

                    props.history.push("/investor/method");
                  }}
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "24px 32px",
                    borderRadius: "15px",
                    border: "2px solid #000A12",
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "12px",
                    alignText: "right"
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

export default LoginPage;