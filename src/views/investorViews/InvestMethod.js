import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Slide from "@material-ui/core/Slide";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import * as constant from "../../Const";
import * as common from "../../common";
import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";
import DescriptionText from "../../components/DescriptionText";

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

function InvestMethod(props) {
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

    context.setStation_salesMethod(event.target.value);

    console.log(context.getStationObj);
  };
  const handleSlectChange = (event) => {
    console.log(event.target.value);
    context.setStation_salesPortion(event.target.value);
  };

  const bantoBody = (
    <>

      <EmptySpace />
      <EmptySpace />

      <SubTitle title="수익률 선택" />

      <DescriptionText title=
        "세일즈 파트너에게 분배할 수익률을 선택하세요"
      />

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
            value={context.getStationObj.salesPortion}
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
              return <MenuItem key={value} value={value}>{value} % </MenuItem>;
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
          {myPortionCalculater(maxPortion, context.getStationObj.salesPortion)}%
        </p>
      </div>
      <DescriptionText title=
        "*세일즈 파트너는 수익률을 확인해 설치할 기기를 선택합니다 " />
      <DescriptionText title="*현재 수익률내에서 세일즈와 가맹점이 수익을 나눕니다"
      />
    </>
  );
  function myPortionCalculater(maxPortion, salesPortion) {
    return maxPortion - salesPortion;
  }
  const ownSalesBody = (
    <>
      <EmptySpace />
      <EmptySpace />

      <SubTitle title="세일즈 파트너 등록" />
      <DescriptionText title=
        "세일즈 파트너의 아이디를 추가해주세요" />
      {invitations.map((value) => (
        <>
          {" "}
          <TextField
            variant="outlined"
            id="standard-full-width"
            // label="Phone Number"
            className={classes.textField}
            placeholder="추가할 세일즈 파트너 ID"
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
              세일즈 파트너 수익률
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
                return <MenuItem key={value} value={value}>{value} % </MenuItem>;
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
      <DescriptionText title=
        {`*세일즈 파트너의 아이디는 '내정보'에서 확인할 수 있습니다`} />
    </>
  );

  const yetSalesBody = (
    <DescriptionText title={`*영업 방법은 설치전까지 '구매자' -> '내 스테이션' 에서 수정합니다`} />);

  return (
    <>
      <Slide
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
            <NavBar title="추가정보 입력" backLink="/investor/depositor" />
          </header>

          <main>
            <section className={classes.section}>
              <div className={classes.amount}>
                <p
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "14px",
                    opacity: "0.8",
                    letterSpacing: "5px",
                    margin: "16px 0 0 24px"
                  }}
                >
                  3/3
                </p>
                <SubTitle title="영업 방법" />
                <DescriptionText title={"반토 파트너스 영업망을 통해 설치할 수 있습니다"} />


              </div>
              <div >
                <FormControl
                  component="fieldset"
                  style={{ margin: "24px 0 0 24px" }}
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
                      label="반토 파트너스를 통해 설치합니다"
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
                      label="자체영업(본인포함)을 통해 설치합니다"
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

              <DescriptionText
                title={value === constant.salesMethod.banto
                  ? "*파트너스에 가입한 영업자, 가맹점에 의해 자동으로 설치됩니다"
                  : value === constant.salesMethod.ownSales
                    ? "*지정한 영업자(본인포함)만 해당 스테이션을 설치할 수 있습니다"
                    : "*영업 방법이 설정되어야만 스테이션이 설치될 수 있습니다"}
              />
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
                      console.log("반토")
                      context.setStation_salesMethod(constant.salesMethod.banto);
                      // 세일즈 포션 자동 할당됌

                      context.setStation_preSalesIds([]);
                      context.setStation_preSalesManagers([]);
                    } else if (value === constant.salesMethod.ownSales) {
                      console.log("오운")
                      context.setStation_salesMethod(
                        constant.salesMethod.ownSales
                      );
                      context.setStation_salesPortion(0);
                      const managersId = invitations.map((value) => value.id);
                      context.setStation_preSalesIds(managersId);
                      context.setStation_preSalesManagers(invitations);
                    }
                    // 설정안함
                    else {
                      console.log("옛옛")
                      context.setStation_salesMethod(constant.salesMethod.yet);
                      context.setStation_salesPortion(0);

                      context.setStation_preSalesIds([]);
                      context.setStation_preSalesManagers([]);
                    }
                    console.log(context.getStationObj);
                    if (auth.userExtraInfo) {
                      context.setStation_buyer(auth.userExtraInfo.id);
                      context.setStation_buyerPortion(70);
                    } else {
                      context.setStation_buyer("example114");
                      context.setStation_buyerPortion(70);
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

export default InvestMethod;