import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
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
import SubTitle from "../../components/SubTitle";

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
      // border: "none"
    }
  },
  select: {
    "&:before": {
      // border: "none"
    },
    "&:after": {
      // border: "none"
    },
    "&:hover:not(.Mui-disabled):before": {
      // border: "none"
    },
    "&:hover::before": {
      // border: "none"
    }
  }
}));

function LoginPage(props) {
  const classes = useStyles(props);
  const [value, setValue] = React.useState("banto");
  const [bank, setBank] = React.useState("");
  const [invitations, setInvitatations] = React.useState([
    { key: "1111", id: "", portion: 0 }
  ]);
  let percentage = _.range(0, 26);
  const maxPortion = 70;
  const context = useGlobal();
  const auth = useAuth();
  const handleChange = (event) => {
    setValue(event.target.value);

    context.setInvest_salesMethod(event.target.value);

    console.log(context.getInvestInfo);
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
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px",
          paddingTop: "24px"
        }}
      >
        세일즈 파트너에게 분배할 수익률을 선택하세요
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
            variant="outlined"
            style={{
              fontSize: "26px",
              fontFamily: "Montserrat",
              fontWeight: "bold"
              // boxSizing: "border-box"
            }}
            onChange={handleSlectChange}
            inputProps={{
              style: {
                fontSize: "26px",
                fontFamily: "Montserrat",
                fontWeight: "bold"
                // boxSizing: "border-box"
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
            margin: "16px 38px 24px 24px",
            textAlign: "right"
          }}
        >
          내 수익 계산기 :{" "}
          {myPortionCalculater(maxPortion, context.getInvestInfo.salesPortion)}%
        </p>
      </div>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "200",
          fontSize: "16px",
          margin: "16px 0 0 28px"
        }}
      >
        <>
          - 세일즈 파트너는 설정한 이익률을 통해 설치할 기기를 선택할 수
          있습니다
        </>
      </p>
      <p
        style={{
          fontStyle: "normal",
          fontWeight: "200",
          fontSize: "16px",
          margin: "16px 0 0 24px"
        }}
      >
        - 세일즈 파트너는 가맹점에게 설치 요청을 할때 설정된 수익률 안에서
        가맹점의 수익을 보장합니다
      </p>
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
          fontWeight: "500",
          fontSize: "16px",
          margin: "16px 0 0 24px",
          paddingTop: "36px"
        }}
      >
        세일즈 파트너 아이디를 추가해주세요
      </p>
      {invitations.map((value) => (
        <>
          {" "}
          <TextField
            variant="outlined"
            id="standard-full-width"
            // label="Phone Number"
            className={classes.textField}
            placeholder="추가할 세일즈 파트너 ID"
            // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
            value={value.id}
            onChange={(e) => {
              const invis = [...invitations];
              const varaibleToUpdate = invis.find(
                (variable) => variable.key === value.key
              );
              console.log(varaibleToUpdate);
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
                // paddingLeft: "0px",
                fontSize: "26px",
                // fontFamily: "Montserrat",
                fontWeight: "bold"

                // boxSizing: "border-box"
                // marginTop: "10px"
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
            <p
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "16px"
              }}
            >
              세일즈 파트너의 수익률
            </p>
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
              variant="outlined"
              value={value.portion}
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

                varaibleToUpdate.portion = e.target.value;
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
            style={{ paddingLeft: "24px" }}
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
              portion: 0
            }
          ]);
        }}
      >
        더하기
      </Button>
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
            <NavBar title="추가정보 입력" backLink="/investor/depositor" />
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
                  3/4
                </p>
                <SubTitle title="영업 방법" />

                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "16px 0 0 24px",
                    paddingTop: "12px"
                  }}
                >
                  반토 파트너스 영업망을 통해 영업을 설치하시겠습니까
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
                      value={constant.salesMethod.banto}
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
                      value={constant.salesMethod.ownSales}
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
                      value={constant.salesMethod.yet}
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

              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "300",
                  fontSize: "16px",
                  margin: "16px 0 0 24px",
                  color: "blue"
                }}
              >
                {value === constant.salesMethod.banto
                  ? "*파트너스에 가입한 영업자, 가맹점에 의해 자동으로 설치됩니다"
                  : value === constant.salesMethod.ownSales
                  ? "*지정한 영업자(본인포함)만 해당 스테이션을 설치할 수 있습니다"
                  : "*설정 후에 설치할 수 있습니다"}
              </p>
              {value === constant.salesMethod.banto
                ? bantoBody
                : value === constant.salesMethod.ownSales
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
                    if (value === constant.salesMethod.banto) {
                      context.setInvest_salesMethod(constant.salesMethod.banto);
                      context.setInvest_preSalesIds([]);
                      context.setInvest_preSalesManagers([]);
                    } else if (value === constant.salesMethod.ownSales) {
                      context.setInvest_salesMethod(
                        constant.salesMethod.ownSales
                      );
                      context.setInvest_salesPortion(0);
                      const managersId = invitations.map((value) => value.id);
                      context.setInvest_preSalesIds(managersId);
                      context.setInvest_preSalesManagers(invitations);
                    }
                    // 설정안함
                    else {
                      context.setInvest_salesMethod(constant.salesMethod.yet);
                      context.setInvest_salesPortion(0);
                    }
                    console.log(context.getInvestInfo);
                    if (auth.userExtraInfo) {
                      context.setInvest_buyer(auth.userExtraInfo.id);
                      context.setInvest_buyerPortion(70);
                    } else {
                      context.setInvest_buyer("example114");
                      context.setInvest_buyerPortion(70);
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