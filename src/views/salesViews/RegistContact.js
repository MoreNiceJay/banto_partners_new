import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
const useStyles = makeStyles((theme) => ({
  contact: { padding: "55px 0 0 25px" },
  contactPerson: { display: "flex", flexDirection: "column" },
  contactTexts: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "baseline"
  },
  contactPersonTitle: { fontSize: "25px", fontWeight: "700" },
  contactPersonDescription: {
    fontSize: "14px",
    color: "#6f6f6f",
    paddingLeft: "10px"
  },
  contactPersonTextField: { marginTop: "10px", width: "calc(100% - 25px)" },
  nextButton: {
    fontSize: "25px",
    fontWeight: "700",
    borderRadius: "0",
    border: "none",
    marginTop: "40px",
    position: "absolute",
    padding: "0 25px",
    right: "0px",
    display: "block",
    margin: "0 auto"
  }
}));

function RegistContact(props) {
  const classes = useStyles(props);
  const [storeOwnerContact, setStoreOwnerContact] = React.useState("");
  const [storeContact, setStoreContact] = React.useState("");
  const context = useGlobal();
  const auth = useAuth();

  function mySubmitHandler() {
    if (storeOwnerContact.length < 11) {
      window.alert("가맹점주님의 연락처는 필수 입니다");
      return;
    }
    context.setSales_storeOwnerPhoneNumber(storeOwnerContact);
    context.setSales_storePhoneNumber(storeOwnerContact);

    props.history.push("/sales/regist/add-investor");
  }
  function onChangeStoreOwnerPhoneNumber(e) {
    setStoreOwnerContact(e.target.value);
    console.log(e.target.value);
  }
  function onChangeStorePhoneNumber(e) {
    setStoreContact(e.target.value);
  }

  React.useEffect(() => {
    // console.log(context.salesInfo.storeOwnerPhoneNumber);
    setStoreOwnerContact(context.salesInfo.storeOwnerPhoneNumber);
    setStoreContact(context.salesInfo.storePhoneNumber);
  }, []);
  return (
    <>
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
        <NavBar title="" backLink="/sales/regist/address" />
        <HeaderInfo
          title={"등록" + "\u00A0" + "\u00A0" + "\u00A0" + "2/3"}
          description="가맹점을 등록합니다"
        />
      </header>
      <main>
        <section>
          <div className={classes.contact}>
            <div className={classes.contactPerson}>
              <div className={classes.contactTexts}>
                <span className={classes.contactPersonTitle}>
                  가맹점주님 연락처
                </span>
                <span className={classes.contactPersonDescription}>
                  예) 0104567890
                </span>
              </div>
              <TextField
                className={classes.contactPersonTextField}
                id="outlined-basic"
                inputProps={{ inputMode: "numeric", maxLength: 11 }}
                label="*필수"
                variant="outlined"
                value={storeOwnerContact}
                // autoFocus
                onChange={onChangeStoreOwnerPhoneNumber}
              />
            </div>
            <div
              className={classes.contactPerson}
              style={{ marginTop: "40px" }}
            >
              <div className={classes.contactTexts}>
                <span className={classes.contactPersonTitle}>매장 연락처</span>
                <span className={classes.contactPersonDescription}>
                  예) 0104567890
                </span>
              </div>
              <TextField
                className={classes.contactPersonTextField}
                id="outlined-basic"
                inputProps={{ inputMode: "numeric", maxLength: 11 }}
                variant="outlined"
                value={storeContact}
                onChange={onChangeStorePhoneNumber}
              />
            </div>
          </div>
          <Button
            className={classes.nextButton}
            size="large"
            variant="outlined"
            onClick={mySubmitHandler}
          >
            다음
          </Button>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default RegistContact;
