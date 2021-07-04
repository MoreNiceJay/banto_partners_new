import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import DaumPostcode from "react-daum-postcode";
import Button from "@material-ui/core/Button";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import { TextField } from "../../components/TextField.js";
import MTextField from "@material-ui/core/TextField";
import { FormButton } from "../../components/FormButton.js";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import Modal from "@material-ui/core/Modal";
import Slide from "@material-ui/core/Slide";

import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";
import InputTitle from "../../components/InputTitle.js";

import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";

import moment from "moment";
const useStyles = makeStyles((theme) => ({
  addressContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "55px 0 0 25px"
  },
  contactPersonTitle: { fontSize: "24px", fontWeight: "700", marginBottom: "8px" },
  firstAddressWithButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  contactPersonTextField: { marginTop: "10px", width: "calc(100% - 25px)" },

  addressTextField: { width: "calc(100% - 48px)", marginTop: "10px", marginBottom: "8px" }
}));
function RegistAddress(props) {
  const context = useGlobal();
  const auth = useAuth();

  const classes = useStyles(props);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [storeName, setStoreName] = React.useState("");
  const [mainAddress, setMainAddress] = React.useState(null);
  const [restAddress, setRestAddress] = React.useState(null);

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
    }
    setMainAddress(fullAddress);
    setOpen(false);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };
  React.useEffect(() => {
    // console.log(context.salesInfo.storeOwnerPhoneNumber);
    setStoreName(context.getFranchiseObj.storeName);
    setMainAddress(context.getFranchiseObj.mainAddress);
    setRestAddress(context.getFranchiseObj.restAddress);
  }, []);
  function getModalStyle() {
    return {
      top: `0px`,
      left: `0px`
    };
  }

  const onChangeStoreName = (e) => {
    setStoreName(e.target.value);
  };
  const onChangeRestAddress = (e) => {
    console.log(e.target.value);
    setRestAddress(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function mySubmitHandler() { }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <DaumPostcode onComplete={handleComplete} {...props} />
      <Button
        style={{ position: "absolute", marginTop: "5px", right: "5px" }}
        variant="contained"
        onClick={handleClose}
      >
        취소
      </Button>
    </div>
  );

  return (
    <><Slide
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
          <NavBar title="" backLink="/salesmenu" />
          {/* <HeaderInfo
          title={"등록" + "\u00A0" + "\u00A0" + "\u00A0" + "1/3"}
          description="가맹점을 등록합니다"
        /> */}
        </header>
        <main>
          <ProgressBreadcum title="1/4" />
          <SubTitle title="가맹점 정보 등록" />
          <DescriptionText title={"설치할 매장명과 매장주소를 입력합니다"} />
          <section>
            <EmptySpace />
            <EmptySpace />
            <InputTitle text="매장명" placeholder="예)반토카페 일산점" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

              <MTextField
                className={classes.addressTextField}
                style={{ marginTop: "10px" }}
                placeholder="필수"
                id="outlined-basic"
                variant="outlined"
                // label="필수"
                placeholder={"필수"}
                value={storeName}
                onChange={onChangeStoreName}
              />
            </div>
            <EmptySpace />
            <EmptySpace />
            <InputTitle text="매장 주소" />
            {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}> */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>


              <MTextField
                className={classes.addressTextField}
                style={{}}

                disabled
                id="outlined-basic"
                inputProps={{ inputMode: "numeric" }}
                variant="outlined"
                value={mainAddress}
                placeholder={"주소"}

                onClick={handleOpen}
                style={{ marginBottom: "8px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

              <MTextField
                className={classes.addressTextField}
                id="outlined-basic2"
                style={{ marginTop: "10px" }}

                variant="outlined"
                // label="*필수 나머지 주소"
                placeholder={"상세 주소"}

                value={restAddress}
                onChange={onChangeRestAddress}
              />
            </div>

            <SquareButton
              onClick={() => {
                console.log(storeName, mainAddress, restAddress);
                if (!storeName || !mainAddress || !restAddress) {
                  alert("정보를 기입해주세요");
                  return;
                }

                context.setFranchise_storeName(storeName);
                context.setFranchise_storeMainAddress(mainAddress);
                context.setFranchise_storeRestAddress(restAddress);
                props.history.push("/sales/regist/contact");
              }}
              text="다음"
            />

          </section>
        </main>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <footer></footer>

      </div>
    </Slide>

    </>
  );
}

export default RegistAddress;
