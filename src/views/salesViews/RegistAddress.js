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
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  addressContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "55px 0 0 25px"
  },
  contactPersonTitle: { fontSize: "25px", fontWeight: "700" },
  firstAddressWithButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  addressTextField: { width: "calc(100% - 25px)", marginTop: "10px" }
}));
function RegistAddress(props) {
  const context = useGlobal();
  const auth = useAuth();

  const classes = useStyles(props);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [storeName, setStoreName] = React.useState("");
  const [mainAddress, setMainAddress] = React.useState("*필수");
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
    setStoreName(context.salesInfo.storeName);
    setMainAddress(context.salesInfo.mainAddress);
    setRestAddress(context.salesInfo.restAddress);
    // setStoreContact(context.salesInfo.storePhoneNumber);
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
  function mySubmitHandler() {}

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
        <NavBar title="" backLink="/salesmenu" />
        <HeaderInfo
          title={"등록" + "\u00A0" + "\u00A0" + "\u00A0" + "1/3"}
          description="가맹점을 등록합니다"
        />
      </header>
      <main>
        <section>
          <TextField
            title="매장명"
            description="예) 스타벅스 구로점"
            value={storeName}
            onChange={onChangeStoreName}
          />
          <div className={classes.addressContainer}>
            <span className={classes.contactPersonTitle}>매장 주소</span>

            <MTextField
              className={classes.addressTextField}
              disabled
              id="outlined-basic"
              inputProps={{ inputMode: "numeric" }}
              variant="outlined"
              value={mainAddress}
              onClick={handleOpen}
            />
            <MTextField
              className={classes.addressTextField}
              id="outlined-basic2"
              variant="outlined"
              label="*필수 나머지 주소"
              value={restAddress}
              onChange={onChangeRestAddress}
            />
          </div>
          <FormButton
            onClick={() => {
              console.log(storeName, mainAddress, restAddress);
              if (!storeName || !mainAddress || !restAddress) {
                alert("정보를 기입해주세요");
                return;
              }

              context.setSales_storeName(storeName);
              context.setSales_storeMainAddress(mainAddress);
              context.setSales_storeRestAddress(restAddress);
              props.history.push("/sales/regist/contact");
            }}
            title="다음"
          />
        </section>
      </main>
      <footer></footer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default RegistAddress;
