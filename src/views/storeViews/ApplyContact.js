import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import Slide from "@material-ui/core/Slide";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ProgressText from "../../components/ProgressText.js";
import InputTitle from "../../components/InputTitle.js";
import PTextField from "../../components/PTextField.js";
import SquareButton from "../../components/SquareButton.js";
import { useGlobal } from "../../globalContext";
import { useAuth } from "../../AuthContext";
import * as Yup from "yup";
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

  const context = useGlobal();
  const auth = useAuth();
  const [error1, setError1] = React.useState(null);
  const [error2, setError2] = React.useState(null);

  function mySubmitHandler() {
    props.history.push("/store/apply/address");
  }

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
                    placeholder="Contact"
                    type="text"
                    value={context.getStoreInfo.storeOwnerPhoneNumber}
                    // autoFocus
                    error={!!error1}
                    onChange={(e) => {
                      if (!e.target.value.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)) {
                        setError1("올바른 전화번호를 입력해 주세요");
                      } else {
                        setError1(null);
                      }

                      context.setStore_StoreOwnerPhonenumber(e.target.value);
                    }}
                    helperText={error1}
                  />
                </div>
                <div style={{ marginTop: "44px" }}>
                  <InputTitle text="매장 연락처" />
                  <PTextField
                    placeholder="Store Contact"
                    type="text"
                    value={context.getStoreInfo.storePhoneNumber}
                    // autoFocus
                    error={!!error2}
                    onChange={(e) => {
                      if (!e.target.value.match(/^[0-9]{8,12}$/)) {
                        setError2("올바른 전화번호를 입력해 주세요");
                      } else {
                        setError2(null);
                      }

                      context.setStore_StorePhoneNumber(e.target.value);
                    }}
                    helperText={error2}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <SquareButton
                  onClick={mySubmitHandler}
                  disabled={!!error1 || !!error2}
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
