import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../components/HeaderInfo.js";
import { NavBar } from "../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../globalContext";
import { useAuth } from "../AuthContext";
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
      title: "가게명",
      contentText: context.getStoreInfo.storeName,
      link: "/store/apply/address",
      bUsing: true
    },
    {
      title: "스테이션 ID",
      contentText: context.getStoreInfo.storeOwnerPhoneNumber,
      link: "/store/apply/contact",
      bUsing: true
    },
    {
      title: "상태",
      contentText: context.getStoreInfo.storePhoneNumber,
      link: "/store/apply/contact",
      bUsing: true
    },
    {
      title: "등록 날짜",
      contentText:
        context.getStoreInfo.storeMainAddress +
        " " +
        context.getStoreInfo.storeRestAddress,
      link: "/store/apply/address",
      bUsing: true
    },
    {
      title: "전화번호",
      contentText:
        `수익률: ${context.getStoreInfo.salesPortion}% ` +
        `연락처: ${context.getStoreInfo.salesContact}`,
      link: "/store/apply/portion",
      bUsing: context.getStoreInfo.bSales ? true : false
    },
    {
      title: "주소",
      contentText:
        `수익률: ${context.getStoreInfo.investorPortion}% ` +
        `연락처: ${context.getStoreInfo.investorContact}`,
      link: "/store/apply/addinvestor",
      bUsing: context.getStoreInfo.bInvestor ? true : false
    },

    {
      title: "영업시간",
      contentText: context.getStoreInfo.bBuying ? "Yes" : "No",
      link: "/store/apply/Address",
      bUsing: true
    },
    {
      title: "할당된 수익",
      contentText: "10%",
      link: "/store/apply/Address",
      bUsing: true
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
            <NavBar title="스테이션 정보" backLink="/table/station" />
          </header>

          <main>
            <section className={classes.section}>
              {data.map((value) => {
                return (
                  value.bUsing && (
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

                        {/* <Link
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
                        </Link> */}
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
                  )
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
                        2020년 하반기 정책사항에 동의 합니다
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
                  onClick={() => {
                    auth.createStoreApplication();
                    props.history.push("/store/apply/done");
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