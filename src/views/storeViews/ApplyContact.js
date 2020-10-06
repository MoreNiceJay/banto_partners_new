import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import Slide from "@material-ui/core/Slide";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import ProgressText from "../../components/ProgressText.js";
import InputTitle from "../../components/InputTitle.js";
import PTextField from "../../components/PTextField.js";
import SquareButton from "../../components/SquareButton.js";

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

  function mySubmitHandler() {
    // if (storeOwnerContact.length < 11) {
    //   window.alert("가맹점주님의 연락처는 필수 입니다");
    //   return;
    // }
    context.setSales_StoreOwnerPhonenumber(storeOwnerContact);
    context.setSales_StorePhoneNumber(storeOwnerContact);

    props.history.push("/store/apply/address");
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
      <Slide
        direction="left"
        in={true}
        timeout={{ enter: "0.15s", exit: "5s" }}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <header>
            <NavBar title="등록하기" backLink="/storemenu" />
          </header>
          <main>
            <section>
              <div className={classes.contact}>
                <div className={classes.contactPerson}>
                  <ProgressText text="1/5" />

                  <InputTitle text="연락처 (가맹점주님 연락처)" />
                  <PTextField
                    placeholder="Email"
                    type="Contact"
                    // value={storeOwnerContact}

                    // autoFocus
                    onChange={() => {}}
                  />
                </div>
                <div style={{ marginTop: "44px" }}>
                  <InputTitle text="매장 연락처" />
                  <PTextField
                    placeholder="Store Contact"
                    type="Contact"
                    // value={storeOwnerContact}

                    // autoFocus
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <SquareButton
                  onClick={mySubmitHandler}
                  disabled={false}
                  text="다음"
                />
              </div>
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default RegistContact;
