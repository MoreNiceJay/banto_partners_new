import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { FormButton } from "../../components/FormButton.js";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import * as constant from "../../Const.js";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import * as common from "../../common"

import ProgressText from "../../components/ProgressText.js";
import PolicyModal from "../../components/PolicyModal"

import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";
import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";
const useStyles = makeStyles((theme) => ({
  section: { padding: "55px 0 0 24px" },
  infoTitle: { fontSize: "25px", fontWeight: "700" },
  dataUnlistOrder: { margin: "5px auto", "& li ": { padding: "5px 0 5px 0" } },
  dataTitleSpan: { fontSize: "14px", fontWeight: "600" },
  dataValueSpan: { fontSize: "14px", fontWeight: "300" },
  dataLink: {
    marginLeft: "10px",
    fontSize: "14px",
    textDecoration: "underline"
  },
  checkboxLabel: { marginTop: "20px", marginRight: "25px" },
  checkbox: {},
  policyLink: {
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    verticalAlign: "middle",
    position: "absolute",
    right: "25px",
    fontSize: "14px",
    textDecoration: "underline"
  },
  emptySpace: { width: "100%", height: "44px" },
  headerSpace: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "60px"
  },
  headerTitle: { fontSize: "18px", fontWeight: "bold", margin: "auto" },
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  }
}));
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

function RegistFinal(props) {
  const classes = useStyles(props);
  const context = useGlobal();
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [buyer, setBuyer] = React.useState({ email: "naver", portion: 0 });
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });
  React.useEffect(() => {
    (async () => {
      //TODO 여기에서 스테이션 주인 정보 받아오기 stationId로
      //TODO setBuyer
      console.log("컨텍스트", context.getContractObj, context.getFranchiseObj);
    })();
  }, []);
  function mySubmitHandler() { }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const data = [
    {
      title: "매장명",
      data: context.getFranchiseObj.storeName,
      link: "/sales/regist/address"
    },
    {
      title: "매장 주소",
      data: [
        context.getFranchiseObj.storeMainAddress,
        context.getFranchiseObj.storeRestAddress
      ].join(" "),
      link: "/sales/regist/address"
    },
    {
      title: "점주님 연락처",
      data: context.getFranchiseObj.storeOwnerPhoneNumber,
      link: "/sales/regist/contact"
    },

    {
      title: "매장 연락처",
      data: context.getFranchiseObj.storePhoneNumber,
      link: "/sales/regist/contact"
    },

    {
      title: "계약 기간",
      data: context.getContractObj.contractYear + "년",
      link: "/sales/regist/contact"
    },
    {
      title: "스테이션 조달 방법",
      data: context.getContractObj.stationMethod,
      link: "/sales/regist/portion"
    },
    {
      title: "가맹점 수익",
      data: context.getContractObj.storePortion + "%",
      link: "/sales/regist/portion"
    }


    // {
    //   title: "영업인 (수익률)",
    //   data: `${auth.user.email}(${context.getFranchiseObj.salesPortion}%)`,
    //   link: "/sales/regist/portion"
    // },
  ];
  const BlackCheckbox = withStyles({
    root: {
      color: "black",
      "&$checked": {
        color: "black"
      }
    },
    checked: {
      color: "black"
    }
  })((props) => <Checkbox color="default" {...props} />);
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
        <NavBar title="" backLink="/store/apply/addinvestor" />
        {/* <HeaderInfo
          title={"신청"}
          description="기입된 정보를 확인하고 신청 완료해주세요"
        /> */}
      </header>

      <main>
        <ProgressText text="5/5" />

        <SubTitle title="신청 등록" />
        <DescriptionText title={"기입된 정보를 확인하고 신청을 완료해주세요"} />
        <section className={classes.section}>
          {data.map((value) => {
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirextion: "rows",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "16px 0 0 0px"
                  }}
                >
                  <p
                    style={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "#000A12",
                      opacity: "0.4"
                    }}
                  >
                    {value.title}
                  </p>

                  <Link
                    to={value.link}
                    style={{
                      textDecoration: "underline",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "12px",
                      marginRight: "24px"
                    }}
                  >
                    수정
                  </Link>
                </div>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "24px",
                    margin: "16px 0 60px 0px",
                    color: "#000A12"
                  }}
                >
                  {value.data}
                </p>
              </div>
            );
          })}
        </section>
        <section>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "rows",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <FormControlLabel
                style={{ marginLeft: "14px" }}
                control={
                  <BlackCheckbox
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                  />
                }
                label={
                  <span
                    style={{
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "14px",
                      lineHeight: "21px"
                    }}
                  >
                    {common.getTodayYear()}년 정책사항을 이해하고 동의 합니다
                  </span>
                }
              />
              <p style={{ textAlign: "right" }}>
                <Link
                  style={{
                    marginRight: "24px",
                  }}
                  onClick={handleOpen}

                >
                  약관확인
                </Link>
              </p>
            </div>

            <Button
              variant="outlined"
              disabled={buttonDisabled}
              onClick={async () => {
                if (!auth.userExtraInfo) {
                  if (
                    window.confirm("로그인이 필요합니다. 지금 로그인 해보세요")
                  ) {
                    props.history.push("/login/login");
                    return;
                  }
                  return;
                }

                try {
                  if (!state.checkedA) {
                    alert("약관을 읽고 동의해주세요")
                    return
                  }




                  if (!!!context.getFranchiseObj.storeName || !!!context.getFranchiseObj.storeMainAddress || !!!context.getFranchiseObj.storeOwnerPhoneNumber ||
                    !!!context.getContractObj.contractYear) {
                    alert("빠진 정보가 있는지 확인 후 신청 완료해 주세요")
                    return
                  }
                  setButtonDisabled(true)

                  const result = await common.createStoreApplication(context.getContractObj,
                    context.getFranchiseObj
                  );

                  if (result.code === 200) {
                    alert("가맹점 신청이 완료되었습니다.");
                    window.location.href = "/main"
                  }

                } catch (e) {
                  alert(e.message);
                }
              }}
              style={{
                width: "calc(100% - 64px)",
                height: "64px",
                margin: "24px 32px",
                borderRadius: "15px",
                backgroundColor: "#000A12",
                border: "2px solid #000A12",
                fontFamily: "Noto Sans CJK KR",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "18px",
                color: "white"
              }}
            >
              신청완료
            </Button>
          </div>
        </section>
      </main>
      {open && (<PolicyModal url="https://bantoservice.xyz/policy" closeModal={() => { setOpen(false) }}></PolicyModal>)}

      <footer></footer>
    </>
  );
}

export default RegistFinal;
