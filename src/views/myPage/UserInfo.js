import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
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
import { BlackBackgroundLgButton } from "../../components/BlackBackgroundLgButton.js";
import { MultipleForms } from "../../components/MultipleForms.js";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%"
    }
  },
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
  infoTextField: { marginTop: "10px", width: "calc(100% - 25px)" }
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
      title: "이메일",
      contentText: auth.user.email && auth.user.email,
      link: "/store/apply/address",
      bUsing: true,
      disabled: true,
      bButton: false
    },
    {
      title: "전화번호",
      contentText: context.getStoreInfo.storeOwnerPhoneNumber,
      link: "/store/apply/contact",
      bUsing: true,
      value: auth.user.phoneNumber && auth.user.phoneNumber,
      bButton: true
    }
  ];
  console.log("나와", auth);

  ///////////////////////////////////
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
            <NavBar title="내정보" backLink="/store/apply/addinvestor" />
          </header>

          <main>
            <section className={classes.section}>
              <MultipleForms data={data} />
            </section>
            <BlackBackgroundLgButton title={"확인"} />
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
