import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import { useAuth } from "../../AuthContext";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import * as common from "../../common"

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
      border: "none"
    }
  }
}));

function LoginPage(props) {
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });
  const context = useGlobal();
  const auth = useAuth();
  const name = context.getRegisterInfo.name;
  const birthdate = context.getRegisterInfo.birthdate;
  const bank = context.getRegisterInfo.bank;
  const accountNumber = context.getRegisterInfo.accountNumber;
  const accountHolder = context.getRegisterInfo.accountHolder;
  const bBusinessLicense = context.getRegisterInfo.bBusinessLicense;
  const businessLicenseImg = context.getRegisterInfo.businessLicenseImg;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const BlackCheckbox = withStyles({
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
  const data = [
    {
      title: "성명",
      contentText: context.getRegisterInfo.name,
      link: "/login/register/fifth",
      bUsing: true
    },
    {
      title: "생년월일",
      contentText: context.getRegisterInfo.birthdate,
      link: "/login/register/fifth",
      bUsing: true
    },
    {
      title: "은행",
      contentText: context.getRegisterInfo.bank,
      link: "/login/register/sixth",
      bUsing: true
    },
    {
      title: "계좌번호",
      contentText: context.getRegisterInfo.accountNumber,

      link: "/login/register/sixth",
      bUsing: true
    },
    {
      title: "계좌주",
      contentText: context.getRegisterInfo.accountHolder,
      link: "/login/register/sixth",
      bUsing: true
    },
    {
      title: "사업자 유무",
      contentText: context.getRegisterInfo.bBusinessLicense ? "Yes" : "No",
      link: "/login/register/seventh",
      bUsing: context.getRegisterInfo.bSales ? true : false
    },
    {
      title: "사업등록증",
      contentText: context.getRegisterInfo.businessLicenseImg,

      link: "/login/register/seventh",
      bUsing: context.getRegisterInfo.bInvestor ? true : false
    }
  ];

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
            <NavBar title="추가정보 확인" backLink="/login/register/eighth" />
          </header>

          <main>
            <section className={classes.section}>
              {data.map((value) => {
                return (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirextion: "rows",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "16px 0 0 24px"
                      }}
                    >
                      <p
                        style={{
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#000A12",
                          opacity: "0.4"
                        }}
                      >
                        {value.title}
                      </p>

                      <Link
                        to={value.link}
                        style={{
                          textDecoration: "underline",
                          fontFamily: "Noto Sans CJK KR",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "12px",
                          marginRight: "24px"
                        }}
                      >
                        수정
                      </Link>
                    </div>
                    <p
                      style={{
                        fontFamily: "Montserrat",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "24px",
                        margin: "16px 0 60px 24px",
                        color: "#000A12"
                      }}
                    >
                      {value.contentText}
                    </p>
                  </div>
                );
              })}
            </section>
            <section>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "rows",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <FormControlLabel
                    style={{ marginLeft: "14px" }}
                    control={
                      <BlackCheckbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
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
                        {common.getTodayYear()}년 정책사항에 동의 합니다

                      </span>
                    }
                  />
                  <p style={{ textAlign: "right" }}>
                    <Link
                      style={{
                        marginRight: "24px",
                        textDecoration: "underline"
                      }}
                    >
                      약관확인
                    </Link>
                  </p>
                </div>

                <Button
                  variant="outlined"
                  onClick={async () => {
                    try {
                      //여기 인자 오브젝트로
                      const data = {
                        name,
                        birthdate,
                        bank,
                        accountNumber,
                        accountHolder,
                        bBusinessLicense,
                        businessLicenseImg,
                        bProfitable: true
                      };
                      const result = await auth.updateExtraProfiles(
                        name,
                        birthdate,
                        bank,
                        accountNumber,
                        accountHolder,
                        bBusinessLicense,
                        businessLicenseImg,
                        true
                      );

                      console.log(result);
                      if (result.code === 200) {
                        props.history.push("/login/register/tenth");
                      }
                    } catch (e) {
                      alert(e.message);
                    }
                  }}
                  style={{
                    width: "calc(100% - 64px)",
                    height: "64px",
                    margin: "24px 32px",
                    borderRadius: "15px",
                    backgroundColor: "#000A12",
                    border: "2px solid #000A12",
                    fontFamily: "Noto Sans CJK KR",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "white"
                  }}
                >
                  가입완료
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
