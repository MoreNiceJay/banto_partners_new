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
import SettingMenuList from "../../components/SettingMenuList.js";
import { BlackBackgroundLgButton } from "../../components/BlackBackgroundLgButton.js";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "../../components/Divider.js";

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
  },
  container: { backgroundColor: "#E5E5E5", width: "100%", height: "100vh" },
  header: {
    backgroundColor: "#E5E5E5",
    width: "100%",

    display: "flex",
    alignItems: "center"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-around",
    width: "100%"
  },
  emailContainer: {
    width: "100%",
    alignContent: "center",
    textAlign: "center"
  },
  emailSpan: {
    textAlign: "center",
    width: "100%",
    alignSelf: "center",
    color: "#cbcbcb",
    marginTop: "8px"
  },
  useInfoEditButton: {
    alignSelf: "center",
    backgroundColor: "#E0E0E0",
    width: "108px"
  },
  myInfoLink: {
    fontSize: "14px",
    color: "#6f6f6f",
    padding: "10px",
    marginRight: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  console.log(auth.userExtraInfo, "아이디");
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
      titleBold: "내 메세지",
      titleRegular: "",
      link: "/mypage/message"
    },

    {
      titleBold: "알람세팅",
      titleRegular: "",
      link: "/mypage/settings/alarmsetting"
    },
    {
      titleBold: "고객센터",
      titleRegular: "",
      link: "/mypage/settings/customercenter"
    },

    {
      titleBold: "공지",
      titleRegular: " ",
      link: "/mypage/settings/notice"
    },
    {
      titleBold: "정책",
      titleRegular: " ",
      link: "/mypage/settings/policies"
    }
  ];
  if (!auth.user) {
    props.history.push("/main");
    return;
  }
  const LogoHeader = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "rows",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      <img
        src={require("../../assets/img/splash.png")}
        style={{ width: "167px", height: "auto", marginLeft: "24px" }}
        alt="logo"
      />

      <Link to="#">
        <span className={classes.myInfoLink}>
          {!!auth.user ? (
            <Link
              // to="/mypage"
              onClick={async () => {
                if (window.confirm("로그아웃 하시겠습니까")) {
                  await auth.signOut();
                }
                window.location.href = "/main";
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#838383"
              }}
            >
              로그아웃
              <ChevronRightIcon />
            </Link>
          ) : (
            <Link to="/login/login">
              로그인
              <ChevronRightIcon />
            </Link>
          )}
        </span>
      </Link>
    </div>
  );
  const MyPageHeader = () => (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "rows",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          backgroundColor: "white",
          height: "120px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            marginLeft: "24px"
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "26px",
              fontWeight: "bold",
              marginTop: "4px"
            }}
          >
            {" "}
            <span
              style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}
            >
              ID:
            </span>
            {auth.userExtraInfo ? auth.userExtraInfo.id : "로그인이 필요합니다"}
          </span>
          <span className={classes.emailSpan}>
            {auth.user ? auth.user.email : "로그인이 필요합니다"}
          </span>
        </div>
        <Link
          style={{
            fontSize: "14px",
            marginRight: "24px",
            color: "#838383",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "light"
          }}
          onClick={() => {
            props.history.push("/mypage/userinfo");
          }}
        >
          회원정보 수정 <ChevronRightIcon />
        </Link>
      </div>
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

        <div className={classes.container}>
          <NavBar title="마이페이지" backLink={`main`} />

          <LogoHeader />
          <Divider />

          <header className={classes.header}>
            <MyPageHeader></MyPageHeader>
          </header>
          <Divider />

          <main>
            <section className={classes.section}>
              <SettingMenuList
                style={{ backgroundColor: "white" }}
                menuList={data}
              />
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
