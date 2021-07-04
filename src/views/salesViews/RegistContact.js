import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import Slide from "@material-ui/core/Slide";
import InputTitle from "../../components/InputTitle.js";
import EmptySpace from "../../components/EmptySpace";

import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";

const useStyles = makeStyles((theme) => ({
  contact: { padding: "55px 0 0 25px" },
  contactPerson: { display: "flex", flexDirection: "column" },
  contactTexts: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "baseline"
  },
  contactPersonTitle: { fontSize: "24px", fontWeight: "700", marginBottom: "8px" },
  contactPersonDescription: {
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    marginTop: "16px",
    marginLeft: "12px",
    marginRight: "24px",
    color: "black",
    lineHeight: "150%",
    marginBottom: "8px"
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
  },
  addressTextField: { width: "calc(100% - 48px)", marginTop: "10px", marginBottom: "8px" }

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
    context.setFranchise_storeOwnerPhoneNumber(storeOwnerContact);
    context.setFranchise_storePhoneNumber(storeOwnerContact);

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
    // console.log(context.getFranchiseObj.storeOwnerPhoneNumber);
    setStoreOwnerContact(context.getFranchiseObj.storeOwnerPhoneNumber);
    setStoreContact(context.getFranchiseObj.storePhoneNumber);
  }, []);
  return (
    <>
      <Slide
        direction="left"
        in={true}
        timeout={{ enter: 0.15, exit: 5 }}
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
            <NavBar title="" backLink="/sales/regist/address" />
            {/* <HeaderInfo
          title={"등록" + "\u00A0" + "\u00A0" + "\u00A0" + "2/3"}
          description="가맹점을 등록합니다"
        /> */}
            <ProgressBreadcum title="2/4" />
            <SubTitle title="가맹점 정보 등록" />
            <DescriptionText title={"가맹점주님의 연락처는 스테이션 설치 확인시 필요합니다"} />
          </header>
          <main>
            <section>
              <EmptySpace />
              <EmptySpace />


              <InputTitle text="가맹점주님 연락처" placeholder={"예)0104567890"} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px", }}>

                <TextField

                  className={classes.addressTextField}
                  id="outlined-basic"
                  inputProps={{ inputMode: "numeric", maxLength: 11 }}
                  placeholder="필수"
                  variant="outlined"
                  value={storeOwnerContact}
                  // autoFocus
                  onChange={onChangeStoreOwnerPhoneNumber}
                />
              </div>
              <EmptySpace />

              <InputTitle text="매장 연락처" />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px", }}>


                <TextField
                  className={classes.addressTextField}
                  id="outlined-basic"
                  inputProps={{ inputMode: "numeric", maxLength: 11 }}
                  placeholder="매장 연락처"

                  variant="outlined"
                  value={storeContact}
                  onChange={onChangeStorePhoneNumber}
                />
              </div>

              <SquareButton

                onClick={mySubmitHandler}
                text="다음"
              >
              </SquareButton>
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default RegistContact;
