import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import Slide from "@material-ui/core/Slide";
import DaumPostcode from "react-daum-postcode";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import ProgressText from "../../components/ProgressText.js";
import InputTitle from "../../components/InputTitle.js";
import PTextField from "../../components/PTextField.js";
import Modal from "@material-ui/core/Modal";
import * as constant from "../../Const";

import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";
import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";
import MTextField from "@material-ui/core/TextField";

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
  },
  addressTextField: { width: "calc(100% - 48px)", marginTop: "10px", marginBottom: "8px" }

}));

function RegistContact(props) {
  const classes = useStyles(props);
  const [error1, setError1] = React.useState(null);
  const [error2, setError2] = React.useState(null);
  const [error3, setError3] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);

  const [daumOpen, setDaumOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const context = useGlobal();
  const auth = useAuth();

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
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      console.log(fullAddress);
      context.setStore_storeMainAddress(fullAddress);
      setDaumOpen(false);
    }
  };
  const handleOpen = () => {
    props.history.push("/store/apply/contact");
  };

  const handleDaumClose = () => {
    setDaumOpen(false);
  };

  function mySubmitHandler() {
    // if (storeOwnerContact.length < 11) {
    //   window.alert("가맹점주님의 연락처는 필수 입니다");
    //   return;
    // }

    props.history.push("/store/apply/addinvestor");
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <DaumPostcode onComplete={handleComplete} {...props} />
      <Button
        style={{ position: "absolute", marginTop: "5px", right: "5px" }}
        variant="contained"
        onClick={() => {
          setDaumOpen(false);
        }}
      >
        취소
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
            <NavBar title="등록하기" backLink="/storemenu" />
          </header>
          <main>
            <section>
              <ProgressText text="1/5" />
              <SubTitle title="가맹점 정보 등록" />
              <DescriptionText title={"설치할 매장명과 매장주소를 입력합니다"} />
              <EmptySpace />
              <EmptySpace />

              <InputTitle text="매장명" placeholder="예)반토카페 일산점" />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MTextField
                  className={classes.addressTextField}

                  placeholder="필수"
                  id="outlined-basic"
                  variant="outlined"
                  value={context.getStoreInfo.storeName}
                  error={!!error1}
                  onChange={(e) => {
                    if (e.target.value.length < 1) {
                      setError1("올바른 상호명을 입력해 주세요");
                    } else {
                      setError1(null);
                    }

                    context.setStore_storeName(e.target.value);
                  }}
                  helperText={error1}
                />
              </div>
              <EmptySpace />

              <InputTitle text="매장 주소" />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MTextField
                  className={classes.addressTextField}
                  id="outlined-basic"
                  variant="outlined"
                  disabled
                  placeholder="매장주소"

                  placeholder="주소"
                  type="Contact"
                  value={context.getStoreInfo.storeMainAddress}
                  onClick={() => {
                    setDaumOpen(true);
                  }}
                // autoFocus
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                <MTextField
                  placeholder="상세주소"
                  className={classes.addressTextField}

                  id="outlined-basic"
                  variant="outlined"

                  type="Contact"
                  // value={storeOwnerContact}
                  value={context.getStoreInfo.storeRestAddress}
                  // autoFocus
                  onChange={(e) => {
                    context.setStore_storeRestAddress(e.target.value);
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <SquareButton
                  onClick={handleOpen}
                  disabled={
                    !(
                      !!context.getStoreInfo.storeRestAddress &&
                      !!context.getStoreInfo.storeMainAddress &&
                      !!context.getStoreInfo.storeName
                    )
                  }
                  text="다음"
                />
              </div>
            </section>
          </main>
          <footer></footer>
          <Modal
            open={daumOpen}
            onClose={handleDaumClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      </Slide>
    </>
  );
}

export default RegistContact;
