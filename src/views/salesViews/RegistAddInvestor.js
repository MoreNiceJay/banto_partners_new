import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import * as common from "../../common";
import * as constant from "../../Const";
import Slide from "@material-ui/core/Slide";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";
import EmptySpace from "../../components/EmptySpace";

const useStyles = makeStyles((theme) => ({
  contact: { padding: "0px 0 0 24px" },
  contactPerson: { display: "flex", flexDirection: "column" },
  contactTexts: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "baseline"
  },
  contactPersonTitle: {
    fontSize: "25px",
    fontWeight: "700",
    marginTop: "40px"
  },
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
  radioButtonGroup: {
    //  padding: "30px 30px 0 30px " 
  },

  consentInvestor: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "black"
  },
  radio: {
    "&$checked": {
      color: "black"
    }
  },
  checked: {}
}));
function RegistAddInvestor(props) {
  const classes = useStyles(props);
  function mySubmitHandler() { }
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const [bInvestor, setBInvestor] = React.useState("banto");
  const context = useGlobal();
  const auth = useAuth();
  const [partnersStations, setPartnersStations] = React.useState(null);
  const [ownSalesStations, setownSalesStations] = React.useState(null);
  const [myStations, setMyStations] = React.useState(null);

  const [ownStation, setOwnStation] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const id = auth.userExtraInfo
        ? auth.userExtraInfo.id
        : constant.exampleUserId;
      const result = await common.fetchOwnSalesStations(id);
      // await common.insertStationExample();
      if (result.code !== 200) {
        alert(result.msg);
        return;
      }
      console.log(result.data, "리저트데이터");
      setownSalesStations(result.data);
    })();
    (async () => {
      const result = await common.fetchPartnerStations();
      // await common.insertStationExample();
      if (result.code !== 200) {
        alert(result.msg);
        return;
      }
      setPartnersStations(result.data);
    })();
    (async () => {
      const id = auth.userExtraInfo
        ? auth.userExtraInfo.id
        : constant.exampleUserId;
      const result = await common.fetchUserStations(id);
      // await common.insertStationExample();
      if (result.code !== 200) {
        alert(result.msg);
        return;
      }
      setMyStations(result.data);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const id = auth.userExtraInfo
        ? auth.userExtraInfo.id
        : constant.exampleUserId;
      const result = await common.fetchOwnSalesStations(id);
      // await common.insertStationExample();
      if (result.code !== 200) {
        alert(result.msg);
        return;
      }
      setownSalesStations(result.data);
    })();
  }, [bInvestor]);

  const handleRadioChange = (event) => {
    let buyerStatus = event.target.value;
    setBInvestor(event.target.value);

    setHelperText(" ");
    setError(false);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setOwnStation(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const bantoBody = (
    <>
      <DescriptionText title="*할당된 수익률로 영업활동을 할 수 있습니다" />
      <EmptySpace />
      <EmptySpace />

      <SubTitle title="반토에 등록된 스테이션" />
      <DescriptionText title="할당된 수익률을 확인해 선택하세요" />

      {/* <hr style={{ borderStyle: "dotted", marginBottom: "20px" }} /> */}
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          {/* <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>
              반토에 등록된 스테이션
            </span>
            <span className={classes.contactPersonDescription}>
              스테이션 오너ID / 영업자에게 할당되는 수익률
            </span>
          </div> */}
          <div style={{ width: "100%" }}>
            <FormControl
              variant="outlined"
              style={{ width: "calc(100% - 40px)", marginTop: "24px" }}
              className={classes.formControl}
            >
              <InputLabel
                className={classes.portionSelectInputLabel}
                htmlFor="outlined-age-native-simple"
              >
                선택
              </InputLabel>
              <Select
                native
                value={ownStation}
                className={classes.portionSelect}
                onChange={handleChange}
                label="비율"
                inputProps={{
                  id: "outlined-age-native-simple"
                }}
              >
                <option value={"0"}>스테이션을 선택해주세요</option>

                {!partnersStations ? (
                  <option value={"0"}>
                    현재 모든 스테이션이 등록되었습니다
                  </option>
                ) : (
                  partnersStations &&
                  partnersStations.map((value) => {
                    return (
                      <>
                        <option value={JSON.stringify(value)}>
                          {console.log(value, "벨류")}
                          {value.data.buyer}님의 스테이션 : 영업인 할당 수익률
                          {value.data.salesPortion}%
                        </option>
                      </>
                    );
                  })
                )}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );

  const ownSalesBody = (
    <>
      <DescriptionText title="*스테이션 구매자가 직접 입력한 세일즈파트너스에게만 노출됩니다" />
      <EmptySpace />
      <EmptySpace />

      <SubTitle title="협의된 구매자의 스테이션" />
      <DescriptionText title="구매자ID를 확인하세요" />
      {/* <hr style={{ borderStyle: "dotted", marginBottom: "20px" }} /> */}
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          {/* <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>
              협의된 구매자의 스테이션
            </span>
            <span className={classes.contactPersonDescription}>
              스테이션 오너ID / 영업자에게 할당되는 수익률
            </span>
          </div> */}
          <div style={{ width: "100%" }}>
            <FormControl
              variant="outlined"
              style={{ width: "calc(100% - 40px)", marginTop: "24px" }}
              className={classes.formControl}
            >
              <InputLabel
                className={classes.portionSelectInputLabel}
                htmlFor="outlined-age-native-simple"
              >
                선택
              </InputLabel>
              <Select
                native
                value={ownStation}
                className={classes.portionSelect}
                onChange={handleChange}
                label="비율"
                inputProps={{
                  id: "outlined-age-native-simple"
                }}
              >
                <option value={"0"}>스테이션을 선택해주세요</option>

                {!ownSalesStations ? (
                  <option value={"0"}>등록된 스테이션 없음</option>
                ) : (
                  ownSalesStations &&
                  ownSalesStations.map((value) => {
                    return (
                      <>
                        <option value={JSON.stringify(value)}>
                          {value.data.stationId},
                          {
                            value.data.preSalesManagers.find(
                              (e) => e.id === auth.userExtraInfo.id
                            ).portion
                          }
                          %
                        </option>
                      </>
                    );
                  })
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        <span className={classes.contactPersonDescription}>
          스테이션 오너ID / 영업자에게 할당되는 수익률
        </span>
      </div>
    </>
  );
  const ownBody = (
    <>
      <DescriptionText title="*내가 구매한 스테이션을 직접 설치할 수 있습니다" />
      <EmptySpace />
      <EmptySpace />

      <SubTitle title="내 스테이션" />
      <DescriptionText title="'구매자'->'구매하기'에서 스테이션을 구매할 수 있습니다" />
      {/* <hr style={{ borderStyle: "dotted", marginBottom: "20px" }} /> */}
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          {/* <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>내 스테이션</span>
            <span className={classes.contactPersonDescription}></span>
          </div> */}
          <div style={{ width: "100%" }}>
            <FormControl
              variant="outlined"
              style={{ width: "calc(100% - 40px)", marginTop: "24px" }}
              className={classes.formControl}
            >
              <InputLabel
                className={classes.portionSelectInputLabel}
                htmlFor="outlined-age-native-simple"
              >
                선택
              </InputLabel>
              <Select
                native
                value={ownStation}
                className={classes.portionSelect}
                onChange={handleChange}
                label="비율"
                inputProps={{
                  id: "outlined-age-native-simple"
                }}
              >
                <option value={"0"}>스테이션을 선택해주세요</option>

                {!myStations ? (
                  <option value={"0"}>등록된 스테이션 없음</option>
                ) : (
                  myStations.map((value) => {
                    return (
                      <>
                        <option value={JSON.stringify(value)}>
                          {value.data.stationId}, {value.data.buyerPortion} %
                        </option>
                      </>
                    );
                  })
                )}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
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
            <NavBar title="" backLink="/sales/regist/contact" />
            {/* <HeaderInfo
          title={"등록할 스테이션이 있으신가요"}
          description="내가 구매한 스테이션이나 미리 협의된 구매자의 스테이션을 설치 할수 있습니다"
        /> */}
          </header>
          <main>
            <ProgressBreadcum title="3/4" />
            <SubTitle title="반토 스테이션 선택" />
            <DescriptionText title={"반토에 등록되어있는 스테이션을 선택해 무료로 설치하고 수익을 얻을 수 있습니다"} />
            <EmptySpace />

            <div className={classes.radioButtonGroup}>
              <FormControl
                component="fieldset"
                error={error}
                className={classes.formControl}
              >


                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
                  value={bInvestor}
                  onChange={handleRadioChange}
                  style={{ marginLeft: "24px", marginTop: "24px" }}
                >
                  <FormControlLabel
                    value="banto"
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
                    label="반토 파트너스 프로그램을 통해 무료로 신청하겠습니다"
                    checked={bInvestor === "banto"}
                  />
                  <FormControlLabel
                    value="mine"
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
                    label="구매한 스테이션이 있습니다"
                  />
                  <FormControlLabel
                    value="ownSales"
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
                    label="다른 구매자의 스테이션을 설치하기로 협의했습니다"
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
            {bInvestor === "banto"
              ? bantoBody
              : bInvestor === "ownSales"
                ? ownSalesBody
                : ownBody}

            <SquareButton
              // className={classes.nextButton}
              // size="large"
              // variant="outlined"
              // type="submit"
              text="다음"
              style={{ marginBottom: "40px" }}
              onClick={() => {
                console.log("비인베스터", bInvestor);
                const choosedStation = JSON.parse(ownStation);
                if (!!!choosedStation) {
                  alert("스테이션을 선택해주세요");
                  return;
                  console.log("추스드", choosedStation);
                }
                const id = auth.userExtraInfo
                  ? auth.userExtraInfo.id
                  : constant.exampleUserId;
                if (bInvestor === "ownSales") {
                  const salesPortion = choosedStation.data.preSalesManagers.find(
                    (e) => e.id === id
                  ).portion;

                  context.setContract_stationMethod("ownSales");
                  context.setContract_salesPortion(salesPortion);

                } else if (bInvestor === "banto") {
                  context.setContract_stationMethod("banto");
                  context.setContract_salesPortion(choosedStation.data.salesPortion);


                } else if (bInvestor === "mine") {
                  context.setContract_stationMethod("mine");
                  context.setContract_salesPortion(choosedStation.data.salesPortion);

                }
                context.setContract_salesManager(id);
                context.setFranchise_stationDocs([{ [choosedStation.data.stationId]: choosedStation.id, }]);
                context.setContract_stationDoc(choosedStation.id)
                context.setContract_stationId(choosedStation.data.stationId)
                context.setContract_buyer(choosedStation.data.buyer)
                context.setContract_buyerPortion(choosedStation.data.buyerPortion)

                props.history.push("/sales/regist/portion");
              }}
            >
              다음
        </SquareButton>
            {console.log("세일즈", context.getContractObj)}
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default RegistAddInvestor;
