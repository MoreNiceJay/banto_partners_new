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
import Modal from "@material-ui/core/Modal";

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
  },
  modalTitle: {
    fontFamily: "Noto Sans CJK KR",
    fontStyle: "normal",
    padding: "24px 0px 10px 20px",
    fontSize: "28px",
    fontWeight: "700"
  },
  modalDescription: {
    padding: "24px 20px 0px 20px",
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "21px",
    color: "#000A12",
    opacity: "0.8"
  },
  modalButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "32px"
  },
  paper: {
    position: "absolute",
    width: "95%",
    height: "332px",
    backgroundColor: "white",
    // border: "2px solid #000",
    borderRadius: "20px",
    textDecoration: "none",
    userSelect: "none",
    outline: "none"
  },
  modalNextTimeButton: {
    border: "2px solid #000A12",
    boxSizing: "border-box",
    borderRadius: "15px",
    width: "calc(100% - 40px)",
    height: "52px",
    fontSize: "14px",
    fontWeight: "500"
  },
  modalBuyButton: {
    border: "2px solid #000A12",
    boxSizing: "border-box",
    borderRadius: "15px",
    width: "calc(100% - 40px)",
    height: "52px",
    backgroundColor: "#000A12",
    marginTop: "16px",
    color: "white",
    fontSize: "14px"
  }
}));

function RegistContact(props) {
  const classes = useStyles(props);
  const [storeOwnerContact, setStoreOwnerContact] = React.useState("");
  const [storeContact, setStoreContact] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getModalStyle() {
    const top = 50;
    const left = 50;
    console.log(top);
    console.log(left);
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }
  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modalTitle}>
        기기 구매하기
      </h2>
      <p id="simple-modal-description" className={classes.modalDescription}>
        반토스테이션 구매 후 가맹점에 설치하면 수익이 70%까지 올라갑니다
      </p>
      <p
        style={{
          margin: "8px 20px 0px 20px",
          fontWeight: "bold",
          color: "#00838f"
        }}
      >
        *입금정보는 문자로 보내드립니다
      </p>
      <div className={classes.modalButtons}>
        <Button
          variant="outlined"
          size="large"
          className={classes.modalNextTimeButton}
          onClick={() => {
            // context.setSales_StorePortion(portion);
            props.history.push("/store/apply/portion");
          }}
        >
          다음에 하기
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.modalBuyButton}
          onClick={() => {
            // context.setSales_StorePortion(portion);

            props.history.push("/store/apply/portion");
          }}
        >
          구매하기
        </Button>
      </div>
    </div>
  );

  const context = useGlobal();

  function mySubmitHandler() {
    // if (storeOwnerContact.length < 11) {
    //   window.alert("가맹점주님의 연락처는 필수 입니다");
    //   return;
    // }
    context.setSales_StoreOwnerPhonenumber(storeOwnerContact);
    context.setSales_StorePhoneNumber(storeOwnerContact);

    // props.history.push("/store/apply/address");
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
                  <ProgressText text="2/5" />

                  <InputTitle text="매장명( 예. 반토카페 일산점)" />
                  <PTextField
                    placeholder="Email"
                    type="Contact"
                    // value={storeOwnerContact}

                    // autoFocus
                    onChange={() => {}}
                  />
                </div>
                <div style={{ marginTop: "44px" }}>
                  <InputTitle text="매장 주소" />
                  <PTextField
                    placeholder="Address"
                    type="Contact"
                    // value={storeOwnerContact}

                    // autoFocus
                    onChange={() => {}}
                  />
                  <PTextField
                    placeholder="상세주소"
                    type="Contact"
                    // value={storeOwnerContact}

                    // autoFocus
                    onChange={() => {}}
                  />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {modalBody}
                  </Modal>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <SquareButton
                  onClick={handleOpen}
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
