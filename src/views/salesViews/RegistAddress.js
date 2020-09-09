import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import DaumPostcode from "react-daum-postcode";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import { TextField } from "../../components/TextField.js";
import MTextField from "@material-ui/core/TextField";
import { FormButton } from "../../components/FormButton.js";

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
  const classes = useStyles(props);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("*필수");
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
    setAddress(fullAddress);
    setOpen(false);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };
  function getModalStyle() {
    return {
      top: `0px`,
      left: `0px`
    };
  }

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
      <header>
        <NavBar title="" backLink="/sales/regist/contact" />
        <HeaderInfo
          title={"등록" + "\u00A0" + "\u00A0" + "\u00A0" + "2/3"}
          description="가맹점을 등록합니다"
        />
      </header>
      <main>
        <section>
          <TextField title="매장명" description="예) 스타벅스 구로점" />
          <div className={classes.addressContainer}>
            <span className={classes.contactPersonTitle}>매장 주소</span>

            <MTextField
              className={classes.addressTextField}
              disabled
              id="outlined-basic"
              inputProps={{ inputMode: "numeric" }}
              variant="outlined"
              onClick={handleOpen}
              value={address}
            />
            <MTextField
              className={classes.addressTextField}
              id="outlined-basic2"
              inputProps={{ inputMode: "numeric" }}
              variant="outlined"
              label="나머지 주소"
            />
          </div>
          <FormButton
            onClick={() => {
              props.history.push("/sales/regist/portion");
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
