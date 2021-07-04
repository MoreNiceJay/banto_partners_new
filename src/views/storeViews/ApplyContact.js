import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import Slide from "@material-ui/core/Slide";
import Modal from "@material-ui/core/Modal";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ProgressText from "../../components/ProgressText.js";
import InputTitle from "../../components/InputTitle.js";
import PTextField from "../../components/PTextField.js";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import * as Yup from "yup";
import * as constant from "../../Const";

import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";
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
    height: "270px",
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

  const context = useGlobal();
  const auth = useAuth();
  const [error1, setError1] = React.useState(null);
  const [error2, setError2] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  function mySubmitHandler() {
    if (context.getFranchiseObj.storeOwnerPhoneNumber < 11) {
      window.alert("가맹점주님의 연락처는 필수 입니다");
      return;
    }
    setOpen(true);

    // props.history.push("/store/apply/portion");
  }
  const [modalStyle] = React.useState(getModalStyle);

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
      {/* <p
        style={{
          margin: "8px 20px 0px 20px",
          fontWeight: "bold",
          color: "#00838f"
        }}
      >
        *입금정보는 문자로 보내드립니다
      </p> */}

      <div className={classes.modalButtons}>
        {/* <Button
          variant="outlined"
          size="large"
          className={classes.modalNextTimeButton}
          onClick={() => {
            context.setFranchise_bBuying(false);
            props.history.push("/store/apply/portion");
          }}
        >
          다음에 하기
        </Button> */}
        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.modalBuyButton}
          onClick={() => {
            // context.setFranchise_bBuying(false);
            props.history.push("/store/apply/addinvestor");
          }}
        >
          네 이해했습니다
        </Button>
      </div>
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
            <NavBar title="등록하기" backLink="/store/apply/address" />
          </header>
          <main>
            <section>

              <ProgressText text="2/5" />
              <SubTitle title="가맹점 정보 등록" />
              <DescriptionText title={"가맹점주님의 연락처는 스테이션 설치 확인시 필요합니다"} />
              <EmptySpace />
              <EmptySpace />


              <InputTitle text="가맹점주님 연락처" placeholder={"예)0104567890"} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                <TextField
                  className={classes.addressTextField}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="필수"
                  type="text"
                  value={context.getFranchiseObj.storeOwnerPhoneNumber}

                  // autoFocus
                  error={!!error1}
                  onChange={(e) => {
                    if (!e.target.value.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)) {
                      setError1("올바른 전화번호를 입력해 주세요");
                    } else {
                      setError1(null);
                    }

                    context.setFranchise_storeOwnerPhoneNumber(e.target.value);
                  }}
                  helperText={error1}
                />
              </div>
              <InputTitle text="매장 연락처" />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TextField
                  className={classes.addressTextField}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="매장 연락처"
                  type="text"
                  value={context.getFranchiseObj.storePhoneNumber}
                  // autoFocus
                  error={!!error2}
                  onChange={(e) => {
                    if (!e.target.value.match(/^[0-9]{8,12}$/)) {
                      setError2("올바른 전화번호를 입력해 주세요");
                    } else {
                      setError2(null);
                    }

                    context.setFranchise_storePhoneNumber(e.target.value);
                  }}
                  helperText={error2}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <SquareButton
                  onClick={mySubmitHandler}
                  disabled={!!error1 || !!error2}
                  text="다음"
                />
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {modalBody}
              </Modal>
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default RegistContact;
