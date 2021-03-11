import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
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
      title: "은행",
      contentText: context.getStoreInfo.storeName,
      link: "/store/apply/address",
      bUsing: true
    },
    {
      title: "계좌번호",
      contentText: context.getStoreInfo.storeOwnerPhoneNumber,
      link: "/store/apply/contact",
      bUsing: true
    },
    {
      title: "계좌주",
      contentText: context.getStoreInfo.storePhoneNumber,
      link: "/store/apply/contact",
      bUsing: true
    },
    {
      title: "사업자",
      contentText:
        context.getStoreInfo.storeMainAddress +
        " " +
        context.getStoreInfo.storeRestAddress,
      link: "/store/apply/address",
      bUsing: true
    },
    {
      title: "사업자번호",
      contentText:
        `수익률: ${context.getStoreInfo.salesPortion}% ` +
        `연락처: ${context.getStoreInfo.salesContact}`,
      link: "/store/apply/portion",
      bUsing: context.getStoreInfo.bSales ? true : false
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
            <NavBar title="추가정보 확인" backLink="/store/apply/addinvestor" />
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

                        <Link
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
                  )
                );
              })}
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
