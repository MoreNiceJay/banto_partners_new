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
import { MenuList } from "../../components/MenuList.js";
import { BlackBackgroundLgButton } from "../../components/BlackBackgroundLgButton.js";

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
    height: "30%",
    borderBottom: "1px solid black",
    display: "flex",
    alignItems: "center"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "50%"
  },
  emailContainer: {
    width: "100%",
    alignContent: "center",
    textAlign: "center"
  },
  emailSpan: { textAlign: "center", width: "100%", alignSelf: "center" },
  useInfoEditButton: {
    alignSelf: "center",
    backgroundColor: "#E0E0E0",
    width: "108px"
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
      titleBold: "정산 계좌정보",
      titleRegular: "",
      link: "/mypage/deposit"
    },
    {
      titleBold: "알림",
      titleRegular: "",
      link: "/mypage/message"
    },
    {
      titleBold: "설정",
      titleRegular: "",
      link: "/mypage/settings"
    }
  ];
  if (!auth.user) {
    props.history.push("/main");
    return;
  }
  const MyPageHeader = () => (
    <div className={classes.headerContainer}>
      <div className={classes.emailContainer}>
        <span className={classes.emailSpan}>
          {auth.user.email && auth.user.email}
        </span>
      </div>
      <Button
        className={classes.useInfoEditButton}
        onClick={() => {
          props.history.push("/mypage/userinfo");
        }}
      >
        회원 정보 수정
      </Button>
    </div>
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
          <header className={classes.header}>
            <MyPageHeader></MyPageHeader>
          </header>

          <main>
            <section className={classes.section}>
              <MenuList style={{ paddingTop: "140px" }} menuList={data} />
            </section>
            <BlackBackgroundLgButton
              title="로그아웃"
              onClick={async () => {
                if (window.confirm("로그아웃 하시겠습니까")) {
                  const result = await auth.signOut();
                  if (result.code !== 200) {
                    alert(result.msg);
                    return;
                  }
                  props.history.push("/main");
                }
              }}
            ></BlackBackgroundLgButton>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
