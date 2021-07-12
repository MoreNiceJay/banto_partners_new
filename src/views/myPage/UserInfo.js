import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import { useAuth } from "../../AuthContext";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { BlackBackgroundLgButton } from "../../components/BlackBackgroundLgButton.js";
import { MultipleForms } from "../../components/MultipleForms.js";
import axios from "axios"
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Alert from "../../components/Alert.js";
import Divider from "../../components/Divider.js";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%"
    }
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
  },
  infoTextField: { marginTop: "10px", width: "calc(100% - 25px)" }
}));

function LoginPage(props) {
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });

  const [bankField, setBankField] = React.useState(null)
  const [accountField, setAccountField] = React.useState(null)
  const [holderField, setHolderField] = React.useState(null)


  React.useEffect(() => {
    setBankField(auth.userExtraInfo && auth.userExtraInfo.bank)
    setAccountField(auth.userExtraInfo && auth.userExtraInfo.accountNumber)
    setHolderField(auth.userExtraInfo && auth.userExtraInfo.accountHolder)
    console.log("은행", auth.userExtraInfo.bank)
  }, [])

  const context = useGlobal();
  const auth = useAuth();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
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
  const handleSlectChange = (event) => {
    console.log(event.target.value);
    setBankField(event.target.value);
  };
  const data = [
    {
      title: "이메일",
      contentText: auth.user && auth.user.email,
      link: "/store/apply/address",
      bUsing: true,
      disabled: true,
      bButton: false
    },
    {
      title: "전화번호",
      contentText: auth.user && auth.userExtraInfo.phoneNumber,
      link: "/mypage/userinfo/phoneauth",
      bUsing: true,
      value: auth.user && auth.user.phoneNumber,
      bButton: true,
      disabled: true,
      buttonText: "수정",

      onclick: function () {
        if (!auth.userExtraInfo.bProfitable) {
          props.history.push("/mypage/userinfo/phoneauth");
          return;
        }
        props.history.push("/mypage/userinfo/phoneauth");
        return;
      }
    }
  ];

  const extraData = [

    {
      title: "계좌번호",
      contentText: accountField,
      link: "/store/apply/address",
      bUsing: true,
      bButton: true,
      disabled: false,
      buttonText: "수정",
      onchange: (e) => {
        console.log(e.target.value)
        setAccountField(e.target.value)
      },
      onclick: async function () {
        if (accountField === auth.userExtraInfo.accountNumber) {
          alert("변경사항이 없습니다")
          return
        }
        const result = await auth.setAccountNumber(auth.user.email, accountField)
        if (result.code !== 200) {
          alert(result.msg)
          return
        }
        alert("완료")
        window.location.reload();

      }
    },
    {
      title: "예금주",
      contentText: holderField,
      link: "/store/apply/address",
      bUsing: true,
      bButton: true,
      disabled: false,
      buttonText: "수정",
      onchange: (e) => {
        console.log(e.target.value)
        setHolderField(e.target.value)
      },
      onclick: async function () {
        if (holderField === auth.userExtraInfo.accountHolder) {
          alert("변경사항이 없습니다")
          return
        }
        const result = await auth.setAccountHolder(auth.user.email, holderField)
        if (result.code !== 200) {
          alert(result.msg)
          return
        }
        alert("완료")
        window.location.reload();
      }
    }
  ];


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
          {!auth.userExtraInfo.bProfitable && (
            <Alert
              type="error"
              title="입금정보"
              description="입금정보가 작성되지 않으면 수익을 정산받지 못합니다"
              actionDescription="정보작성"
              link="/mypage/userinfo/edit"
              onClick={() => {
                props.history.push("/login/register/fifth");
              }}
            ></Alert>
          )}
          <header>
            <NavBar title="내정보" backLink="/mypage" />
          </header>

          <main>
            <Divider />

            <section
              style={{
                marginTop: "32px"
              }}
              className={classes.section}
            >
              <div
                style={{
                  fontSize: "22px",
                  marginLeft: "22px",
                  marginTop: "24px",
                  marginBottom: "54px"
                }}
              >
                <span>기본회원정보</span>
              </div>
              <MultipleForms data={data} />
            </section>
            <div></div>
            <Divider />

            <section
              style={{
                marginTop: "32px"
              }}
              className={classes.section}
            >
              <div
                style={{
                  fontSize: "22px",
                  marginLeft: "22px",
                  marginTop: "24px",
                  marginBottom: "54px"
                }}
              >
                <span>입금정보</span>
              </div>

              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  margin: "16px 0 0 24px",
                  color: "#000a12",
                  opacity: "0.6"
                }}
              >
                은행
              </p>

              <div
                style={{
                  marginBottom: "38px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row"

                }}>
                <FormControl
                  style={{
                    margin: "0 0 0 20px",
                    marginTop: "4px",

                    width: "100%"

                  }}
                >
                  <InputLabel
                    shrink={false}
                    style={{
                      paddingLeft: "0px",
                      fontSize: "24px",

                      color: "black",
                      opacity: "0.4",
                      boxSizing: "border-box"
                    }}
                    id="demo-simple-select-label"
                  ></InputLabel>

                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bankField}
                    placeholder="Bank"
                    variant="outlined"
                    style={{
                      fontSize: "24px",

                      boxSizing: "border-box",
                      marginTop: "10px"
                    }}
                    onChange={handleSlectChange}
                    // native={true}
                    inputProps={{
                      style: {
                        fontSize: "24px",

                        boxSizing: "border-box",
                        marginTop: "10px"
                      }
                    }}
                  >
                    <MenuItem value={"경남은행"}>경남은행</MenuItem>
                    <MenuItem value={"광주은행"}>광주은행</MenuItem>
                    <MenuItem value={"국민은행"}>국민은행</MenuItem>
                    <MenuItem value={"기업은행"}>기업은행</MenuItem>
                    <MenuItem value={"농협"}>농협</MenuItem>
                    <MenuItem value={"지역농협"}>지역농협</MenuItem>
                    <MenuItem value={"대구은행"}>대구은행</MenuItem>
                    <MenuItem value={"부산은행"}>부산은행</MenuItem>
                    <MenuItem value={"도이치은행"}>도이치은행</MenuItem>
                    <MenuItem value={"산업은행"}>산업은행</MenuItem>
                    <MenuItem value={"상호저축은행"}>상호저축은행</MenuItem>
                    <MenuItem value={"새마을금고"}>새마을금고</MenuItem>
                    <MenuItem value={"수협"}>수협</MenuItem>
                    <MenuItem value={"신한은행"}>신한은행</MenuItem>
                    <MenuItem value={"신협"}>신협</MenuItem>
                    <MenuItem value={"씨티은행"}>씨티은행</MenuItem>
                    <MenuItem value={"외한은행"}>외한은행</MenuItem>
                    <MenuItem value={"우리은행"}>우리은행</MenuItem>
                    <MenuItem value={"우체국"}>우체국</MenuItem>
                    <MenuItem value={"전북은행"}>전북은행</MenuItem>
                    <MenuItem value={"제주은행"}>제주은행</MenuItem>
                    <MenuItem value={"카카오뱅크"}>카카오뱅크</MenuItem>
                    <MenuItem value={"하나은행"}>하나은행</MenuItem>
                    <MenuItem value={"케이뱅크"}>케이뱅크</MenuItem>
                    <MenuItem value={"SC은행"}>SC은행</MenuItem>
                    <MenuItem value={"HSBC은행"}>HSBC은행</MenuItem>
                    <MenuItem value={"교보증권"}>교보증권</MenuItem>
                    <MenuItem value={"대신증권"}>대신증권</MenuItem>
                    <MenuItem value={"대우증권"}>대우증권</MenuItem>
                    <MenuItem value={"동부증권"}>동부증권</MenuItem>
                    <MenuItem value={"메리츠종합금융증권"}>메리츠종합금융증권</MenuItem>
                    <MenuItem value={"미래에셋증권"}>미래에셋증권</MenuItem>
                    <MenuItem value={"부국증권"}>부국증권</MenuItem>
                    <MenuItem value={"삼성증권"}>삼성증권</MenuItem>
                    <MenuItem value={"신영증권"}>신영증권</MenuItem>
                    <MenuItem value={"신한금융투자"}>신한금융투자</MenuItem>
                    <MenuItem value={"아이엠투자증권"}>아이엠투자증권</MenuItem>
                    <MenuItem value={"우리투자증권"}>우리투자증권</MenuItem>
                    <MenuItem value={"유안타증권"}>유안타증권</MenuItem>
                    <MenuItem value={"유진투자증권"}>유진투자증권</MenuItem>
                    <MenuItem value={"이트레이드증권"}>이트레이드증권</MenuItem>
                    <MenuItem value={"키움증권"}>키움증권</MenuItem>
                    <MenuItem value={"하나대투증권"}>하나대투증권</MenuItem>
                    <MenuItem value={"하이투자증권"}>하이투자증권</MenuItem>
                    <MenuItem value={"한국투자증권"}>한국투자증권</MenuItem>
                    <MenuItem value={"한화투자증권"}>한화투자증권</MenuItem>
                    <MenuItem value={"현대증권"}>현대증권</MenuItem>
                    <MenuItem value={"HMC투자증권"}>HMC투자증권</MenuItem>
                    <MenuItem value={"LIG투자증권"}>LIG투자증권</MenuItem>
                    <MenuItem value={"NH농협증권"}>NH농협증권</MenuItem>
                    <MenuItem value={"SK증권"}>SK증권</MenuItem>
                    <MenuItem value={"산림조합"}>산림조합</MenuItem>
                  </Select>

                </FormControl>
                <Button
                  style={{ color: "#0055b8" }}
                  onClick={async () => {
                    if (bankField === auth.userExtraInfo.bank) {
                      alert("변경사항이 없습니다")
                      return
                    }
                    const result = await auth.setBank(auth.user.email, bankField)
                    if (result.code !== 200) {
                      alert(result.msg)
                      return
                    }
                    alert("완료")
                    window.location.reload();

                  }}
                >
                  수정
                </Button>
              </div>

              <MultipleForms data={extraData} />
            </section>

            <BlackBackgroundLgButton title={"확인"} />
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
