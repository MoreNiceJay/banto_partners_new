import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";

import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";


import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";
import EmptySpace from "../../components/EmptySpace";
import { TextField } from "../../components/TextField.js";

import * as common from "../../common"
var _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  contact: { padding: "0px 0 0 24px" },
  contactPerson: { display: "flex", flexDirection: "column" },
  contactTexts: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "baseline"
  },
  contactPersonTitle: { fontSize: "24px", fontWeight: "700" },
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
  contact: { padding: "55px 0 0 24px" },

  contactPersonTextField: { marginTop: "10px", width: "calc(100% - 24px)" },
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
  portionSelect: { marginTop: "10px", width: "calc(100% - 24px)" },
  portionSelectInputLabel: { marginTop: "10px", width: "calc(100% - 25px)" },
  portionSelectDescription: {
    marginTop: "10px",
    marginRight: "25px",
    textAlign: "right",
    fontSize: "14px",
    color: "#6f6f6f"
  },
  paper: {
    position: "absolute",
    width: "90%",
    height: "220px",
    backgroundColor: "white",
    // border: "2px solid #000",
    borderRadius: "6px",
    textDecoration: "none",
    userSelect: "none",
    outline: "none"
  },
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
    margin: "0 auto",
    backgroundColor: "white"
  },
  modalTitle: {
    padding: "20px 0px 10px 20px",
    fontSize: "25px",
    fontWeight: "700"
  },
  modalDescription: {
    padding: "15px 0px 10px 20px",
    fontSize: "16px",
    fontWeight: "300",
    lineHeight: "23px"
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px"
  },
  modalNextTimeButton: {},
  modalBuyButton: {}
}));
function RegistPortion(props) {
  const context = useGlobal();
  const auth = useAuth();
  const classes = useStyles(props);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [portion, setPortion] = React.useState(0);


  const [buyerInviType, setBuyerInviType] = React.useState("id");



  const handleRadioChange = (event) => {
    setBuyerInviType(event.target.value);

  };


  const handleOpen = async () => {

    if (buyerInviType === "id") {
      if (context.salesInfo.storeOwner === "") {
        alert("가맹점주님의 ID를 입력해 주세요")
        return
      }

      const result = await common.checkUserIdExisted(context.salesInfo.storeOwner)
      if (result.code !== 200) {
        alert(result.msg)
        return
      }
      if (!result.result) {
        alert("가맹점주님의 계정이 없습니다. 전화번호로 초대링크를 보내세요")
        return
      }
      //TODO 
      // 내용 푸시및 알림으로 보내기


    } else {
      if (context.salesInfo.storeOwnerPhoneNumber === "") {
        alert("가맹점주님의 휴대폰 번호를 입력해 주세요")
        return
      }
      const result = await common.checkUserPhoneNumExisted(context.salesInfo.storeOwnerPhoneNumber)
      console.log(result)
      if (result.code !== 200) {
        alert(result.msg)
        return
      }
      if (result.result) {
        alert(`이미 가입된 계정입니다. 계정 아이디 ${result.email}`)
        return
      }
      //TODO 핸드폰이면 이미 가입됐는지 체크하고
      //없으면 디비에 가맹점 인비테이션 만들고 문자보내기
      //인비테이션
      // 컨텍스트 내용 그대로, 초대자 아이디, 인비테이션 아이디로 웹페이지 만들기 거기서 파트너스 가입시키기 

    }

    if (portion === 0) {
      context.setSales_storeBonusPortion(0);
      context.setSales_storePortion(0);
    } else if (0 < portion && portion <= 10) {
      context.setSales_storeBonusPortion(portion);
      context.setSales_storePortion(0);
    } else if (portion > 10) {
      context.setSales_storeBonusPortion(10);
      context.setSales_storePortion(portion - 10);
    }
    context.setSales_salesPortion(calcSalesPortion(portion));
    setOpen(true);
  };
  React.useEffect(() => {
    (async () => { })();
  }, []);

  const calcSalesPortion = (storePortion) => {
    const copySalesInfo = context.salesInfo.salesPortion;

    if (storePortion === 0) {
      // context.setSales_storeBonusPortion(0);
      return copySalesInfo;
    } else if (0 < storePortion && storePortion <= 10) {
      // context.setSales_storeBonusPortion(storePortion);
      return copySalesInfo;
    } else if (storePortion > 10) {
      // context.setSales_storeBonusPortion(10);
      console.log(storePortion);
      return copySalesInfo + bonus - storePortion;
    }
  };

  const idBody = (<>
    <DescriptionText title="*가맹점주님의 아이디는 가맹점주님이 로그인 후 메인페이지의 '내정보'에서 확인 할 수 있습니다" />
    <EmptySpace />
    <EmptySpace />
    <TextField
      title="가맹점주님 파트너스ID"
      description="예)vx39ad"
      // label="필수"
      placeholder={"필수"}
      value={context.salesInfo.storeOwner}
      onChange={(e) => {
        context.setSales_storeOwner(e.target.value)
      }}
    />

  </>)
  const phoneBody = (<><DescriptionText title="*아직 계정이 없는 가맹점주님을 초대 할 수 있습니다. 가맹점주님은 문자로 내용을 받게 됩니다" />
    <EmptySpace />
    <EmptySpace />
    <TextField
      title="가맹점주님 전화번호"
      description="예)01094552438"
      // label="필수"
      placeholder={"필수"}
      inputProps={{ inputMode: "numeric", maxLength: 11 }}
      value={context.salesInfo.storeOwnerPhoneNumber}
      onChange={(e) => {
        context.setSales_storeOwnerPhoneNumber(e.target.value)
      }}
    /></>)

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" className={classes.modalTitle}>
        수익률을 올리세요
      </h2>
      <p id="simple-modal-description" className={classes.modalDescription}>
        반토스테이션 구매 후 가맹점에 설치하면 수익이 70%까지 올라갑니다
      </p>
      <div className={classes.modalButtons}>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.modalBuyButton}
          onClick={() => {

            props.history.push("/sales/regist/agreement")
          }}
        >
          네 이해했습니다
        </Button>
      </div>
    </div >
  );

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


  const handleChange = (event) => {
    let storePortion = Number(event.target.value);
    console.log(storePortion);
    setPortion(storePortion);
    //TODO 세일즈 포션 계산 하고 세일즈 포션 컨텍스트
  };
  function mySubmitHandler() {
    handleOpen();
    return;
  }
  const copySalesPortion = context.salesInfo.salesPortion;
  const bonus = 10;
  let percentage = _.range(0, copySalesPortion + bonus + 1);

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
        <NavBar title="" backLink="/sales/regist/add-investor" />
        {/* <HeaderInfo
          title={"등록" + "\u00A0" + "\u00A0" + "\u00A0" + "3/3"}
          description="가맹점에게 수익을 나눌시, 가맹점 계약 체결시 본사에서 검수 후 반토 스테이션을 보내드립니다"
        /> */}
      </header>
      <main>
        <section>
          <ProgressBreadcum title="3/4" />
          <SubTitle title="가맹점 협의 사항" />
          <DescriptionText title={"가맹점과 협의한 사항을 기록합니다"} />
          <div className={classes.contact}>
            <div className={classes.contactPerson}>
              <div className={classes.contactTexts}>
                <span className={classes.contactPersonTitle}>가맹점 수익</span>
                <span className={classes.contactPersonDescription}>
                  가맹점에 분배될 수익
                </span>
              </div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  className={classes.portionSelectInputLabel}
                  htmlFor="outlined-age-native-simple"
                >
                  분배율
                </InputLabel>
                <Select
                  native
                  value={portion}
                  className={classes.portionSelect}
                  onChange={handleChange}
                  label="비율"
                  inputProps={{
                    id: "outlined-age-native-simple"
                  }}
                >
                  <option aria-label="None" value="" />
                  {percentage.map((value) => {
                    return <option value={value}>{value} %</option>;
                  })}
                </Select>
              </FormControl>
              <span className={classes.portionSelectDescription}>
                세일즈님의 수익은 {calcSalesPortion(portion)}%입니다
              </span>
            </div>
            <div className={classes.contactPerson}>
              <div className={classes.contactTexts}>
                <span className={classes.contactPersonTitle}>계약 기간</span>
                <span className={classes.contactPersonDescription}>
                  스테이션 설치 기간
                </span>
              </div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  className={classes.portionSelectInputLabel}
                  htmlFor="outlined-age-native-simple"
                >
                  기간
                </InputLabel>
                <Select
                  native
                  value={context.salesInfo.contractYear}
                  className={classes.portionSelect}
                  onChange={(e) => {
                    console.log(e.target.value)
                    context.setSales_contractYear(e.target.value)
                  }}
                  label="비율"
                  inputProps={{
                    id: "outlined-age-native-simple"
                  }}
                >
                  <option aria-label="None" value={0} >기간 없음</option>
                  <option value={1}>{"1"} 년</option>
                  <option value={2}>{"2"} 년</option>
                  <option value={3}>{"3"} 년</option>
                  <option value={4}>{"4"} 년</option>
                  <option value={5}>{"5"} 년</option>

                </Select>
              </FormControl>

            </div>
          </div>

          {/* <div className={classes.contact}>
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
                  value={context.salesInfo.storeOwner}
                  // autoFocus
                  onChange={(e) => {
                    context.setSales_storeOwner(e.target.value);
                  }}
                />
              </div>
            </div> */}
          <EmptySpace />
          <EmptySpace />
          <SubTitle title="가맹점주님 초대방법" />
          <DescriptionText title={"수익정산과 계약내용 공유를 위해 가맹점주님을 초대합니다"} />
          <div className={classes.radioButtonGroup}>
            <FormControl
              component="fieldset"

              className={classes.formControl}
            >

              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={buyerInviType}
                onChange={handleRadioChange}
                style={{ marginLeft: "24px", marginTop: "24px" }}
              >
                <FormControlLabel
                  value="id"
                  control={
                    <Radio
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleCheckedFilled />}
                      style={{
                        color: "black",
                        "&$checked": {
                          color: "black"
                        },

                        checked: {}
                      }}

                    />
                  }
                  label="가맹점주님이 이미 파트너스 계정이 있으십니다"
                  checked={buyerInviType === "id"}
                />
                <FormControlLabel
                  value="phone"
                  control={
                    <Radio
                      icon={<CircleUnchecked />}
                      checkedIcon={<CircleCheckedFilled />}
                      style={{
                        color: "black",
                        "&$checked": {
                          color: "black"
                        },

                        checked: {}
                      }} />
                  }
                  label="문자로 계약내용과 초대링크를 보냅니다"
                />

              </RadioGroup>
              {/* <FormHelperText>{helperText}</FormHelperText> */}
              {/* <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Check Answer
            </Button> */}
            </FormControl>
          </div>
          {buyerInviType === "id"
            ? idBody : phoneBody}




          <SquareButton
            // className={classes.nextButton}
            type="button"
            onClick={handleOpen}
            text="다음"
          />




          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default RegistPortion;
