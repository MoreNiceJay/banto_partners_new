import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import { useAuth } from "../../AuthContext";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import * as constant from "../../Const";
import * as common from "../../common";
var _ = require("lodash");

const useStyles = makeStyles((theme) => ({
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
  select: {
    "&:before": {
      border: "none"
    },
    "&:after": {
      border: "none"
    },
    "&:hover:not(.Mui-disabled):before": {
      border: "none"
    },
    "&:hover::before": {
      border: "none"
    }
  }
}));

function LoginPage(props) {
  const classes = useStyles(props);
  const [value, setValue] = React.useState("banto");
  const [bank, setBank] = React.useState("");
  const [invitations, setInvitatations] = React.useState([
    { key: "323", id: "jaylee", percent: 30 },
    { key: "3234", id: "naun", percent: 30 }
  ]);
  let percentage = _.range(0, 26);
  const maxPortion = 70;
  const context = useGlobal();
  const auth = useAuth();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSlectChange = (event) => {
    console.log(event.target.value);
    context.setInvest_salesPortion(event.target.value);
  };

  const bantoBody = (
    <>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "200",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        <>
          기기를 설치할 세일즈 파트너는 아래 설정하시는 이익률을 확인하여 설치할
          기기를 선택할 수 있습니다{" "}
        </>
        <br />
        {"(이익률은 설치전까지 투자 -> 스테이션 에서 수정할 수 있습니다)"}
      </p>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "200",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        영업이 가맹점에게 설치 요청을 할때 분배되는 수익률 안에서 가맹점의
        수익을 보장해야합니다
      </p>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        영업분에게 분배할 수익률
      </p>

      <div>
        <FormControl
          style={{
            margin: "0 24px",
            marginTop: "12px",
            width: "calc(100% - 64px)"
          }}
        >
          <InputLabel
            shrink={false}
            style={{
              paddingLeft: "0px",
              fontSize: "26px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
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
            value={context.getInvestInfo.salesPortion}
            placeholder="Bank"
            style={{
              fontSize: "26px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              boxSizing: "border-box",
              marginTop: "10px"
            }}
            onChange={handleSlectChange}
            inputProps={{
              style: {
                fontSize: "26px",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                boxSizing: "border-box",
                marginTop: "10px"
              }
            }}
          >
            {common.percentArray(0, maxPortion).map((value) => {
              return <MenuItem value={value}>{value} % </MenuItem>;
            })}
          </Select>
        </FormControl>

        <p
          style={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "16px",
            margin: "16px 0 0 24px"
          }}
        >
          내 수익 계산기 :{" "}
          {myPortionCalculater(maxPortion, context.getInvestInfo.salesPortion)}%
        </p>
      </div>
    </>
  );
  function myPortionCalculater(maxPortion, salesPortion) {
    return maxPortion - salesPortion;
  }
  const ownSalesBody = (
    <>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "200",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        <>초대할 영업자 및 가맹점 아이디</>
        <br />
        {"아이디는 내정보 -> 내 아이디에서 확인 할 수 있습니다"}
      </p>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        영업자 아이디
      </p>
      {invitations.map((value) => (
        <>
          {" "}
          <TextField
            variant="outlined"
            id="standard-full-width"
            // label="Phone Number"
            className={classes.textField}
            placeholder="추가할 세일즈님 & 가맹 점주님 ID"
            // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
            value={value.id}
            onChange={(e) => {
              const invis = [...invitations];
              const varaibleToUpdate = invis.find(
                (variable) => variable.key === value.key
              );
              console.log(varaibleToUpdate);
              console.log(varaibleToUpdate[value]);
              varaibleToUpdate.id = e.target.value;
              setInvitatations(invis);
            }}
            style={{
              margin: "0 24px",
              marginTop: "12px",
              width: "calc(100% - 64px)"
            }}
            InputLabelProps={{
              style: {}
            }}
            inputProps={{
              style: {
                paddingLeft: "0px",
                fontSize: "26px",
                fontFamily: "Montserrat",
                fontWeight: "bold",

                boxSizing: "border-box",
                marginTop: "10px"
              }
            }}
          />{" "}
          <FormControl
            style={{
              margin: "0 24px",
              marginTop: "12px",
              width: "calc(100% - 64px)"
            }}
          >
            <InputLabel
              shrink={false}
              style={{
                paddingLeft: "0px",
                fontSize: "26px",
                fontFamily: "Montserrat",
                fontWeight: "bold",
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
              value={value.percent}
              placeholder="Bank"
              style={{
                fontSize: "26px",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                boxSizing: "border-box",
                marginTop: "10px"
              }}
              onChange={(e) => {
                const invis = [...invitations];
                const varaibleToUpdate = invis.find(
                  (variable) => variable.key === value.key
                );

                varaibleToUpdate.percent = e.target.value;
                setInvitatations(invis);
              }}
              inputProps={{
                style: {
                  fontSize: "26px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  boxSizing: "border-box",
                  marginTop: "10px"
                }
              }}
            >
              {common.percentArray(0, maxPortion).map((value) => {
                return <MenuItem value={value}>{value} % </MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              const invis = [...invitations].filter(
                (variable) => variable.key !== value.key
              );
              setInvitatations(invis);
            }}
          >
            지우기
          </Button>
        </>
      ))}
      <Button
        onClick={() => {
          setInvitatations([
            ...invitations,
            {
              key: common.uuidv4(),
              id: "",
              percent: 0
            }
          ]);
        }}
      >
        더하기
      </Button>
    </>
  );

  const yetSalesBody = (
    <>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "200",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        <>세일즈 방법 설정은 구매후</>
        <br />
        {"(이익률은 설치전까지 투자 -> 스테이션 에서 수정할 수 있습니다)"}
      </p>
    </>
  );

  const textFieldsBody = (
    <>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        입금자명
      </p>

      <TextField
        variant="outlined"
        id="standard-full-width"
        // label="Phone Number"
        className={classes.textField}
        placeholder="Name"
        // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
        value={context.getInvestInfo.depositor}
        onChange={(e) => {
          context.setInvest_depositor(e.target.value);
        }}
        style={{
          margin: "0 24px",
          marginTop: "12px",
          width: "calc(100% - 64px)"
        }}
        InputLabelProps={{
          style: {}
        }}
        inputProps={{
          style: {
            paddingLeft: "0px",
            fontSize: "26px",
            fontFamily: "Montserrat",
            fontWeight: "bold",

            boxSizing: "border-box",
            marginTop: "10px"
          }
        }}
      />
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        은행
      </p>

      <div>
        <FormControl
          style={{
            margin: "0 24px",
            marginTop: "12px",
            width: "calc(100% - 64px)"
          }}
        >
          <InputLabel
            shrink={false}
            style={{
              paddingLeft: "0px",
              fontSize: "26px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
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
            value={context.getInvestInfo.bank}
            placeholder="Bank"
            style={{
              fontSize: "26px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              boxSizing: "border-box",
              marginTop: "10px"
            }}
            onChange={handleSlectChange}
            inputProps={{
              style: {
                fontSize: "26px",
                fontFamily: "Montserrat",
                fontWeight: "bold",
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
      </div>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        계좌번호
      </p>

      <TextField
        variant="outlined"
        id="standard-full-width"
        // label="Phone Number"
        className={classes.textField}
        placeholder="추가할 세일즈 & 가맹점 ID"
        // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
        value={context.getInvestInfo.accountNumber}
        onChange={(e) => {
          context.setInvest_accountNumber(e.target.value);
        }}
        style={{
          margin: "0 24px",
          marginTop: "12px",
          width: "calc(100% - 64px)"
        }}
        InputLabelProps={{
          style: {}
        }}
        inputProps={{
          style: {
            paddingLeft: "0px",
            fontSize: "26px",
            fontFamily: "Montserrat",
            fontWeight: "bold",

            boxSizing: "border-box",
            marginTop: "10px"
          }
        }}
      />
    </>
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
          <header>
            <NavBar title="추가정보 입력" backLink="/investor/invest" />
          </header>

          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                    opacity: "0.8",
                    letterSpacing: "5px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  2/2
                </p>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  반토 파트너스 영업망을 통해 영업을 설치하시겠습니까
                </p>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "300",
                    fontSize: "16px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  *파트너스에 가입한 영업자, 가맹점에 의해 자동으로 설치됩니다
                </p>
              </div>
              <div style={{ marginLeft: "8px" }}>
                <FormControl
                  component="fieldset"
                  style={{ margin: "28px 0 0 24px" }}
                >
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={constant.salesDecision.banto}
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
                      label="네. 반토 파트너스를 통해 설치하겠습니다"
                    />
                    <FormControlLabel
                      value={constant.salesDecision.ownSales}
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
                      label="아니오. 자체영업(본인포함)을 통해 설치하겠습니다"
                    />
                    <FormControlLabel
                      value={constant.salesDecision.yet}
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
                      label="나중에 설정하겠습니다"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {value === constant.salesDecision.banto
                ? bantoBody
                : value === constant.salesDecision.ownSales
                ? ownSalesBody
                : yetSalesBody}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (value === constant.salesDecision.banto) {
                      context.setInvest_method(constant.salesDecision.banto);
                    } else if (value === constant.salesDecision.ownSales) {
                      context.setInvest_method(constant.salesDecision.ownSales);
                      context.setInvest_salesPortion(0);
                      context.setInvest_ownSalesMangers(invitations);
                    }
                    // 설정안함
                    else {
                      context.setInvest_method(constant.salesDecision.yet);
                      context.setInvest_salesPortion(0);
                    }

                    props.history.push("/investor/final");
                  }}
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "24px 32px",
                    borderRadius: "15px",
                    border: "2px solid #000A12",
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "12px",
                    alignText: "right"
                  }}
                >
                  다음
                </Button>
              </div>
            </section>
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
