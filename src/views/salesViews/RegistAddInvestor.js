import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { useGlobal } from "../../globalContext";
import { useAuth } from "../../AuthContext";
import * as common from "../../common";
import { set } from "lodash";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { fetchPartnerStations } from "../../common.js";

const useStyles = makeStyles((theme) => ({
  contact: { padding: "0px 0 0 25px" },
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
  radioButtonGroup: { padding: "30px 30px 0 30px " },

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
  function mySubmitHandler() {}
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [investorContact, setInvestorContact] = React.useState("");
  const [investorPortion, setInvestorPortion] = React.useState(0);
  const [bInvestor, setBInvestor] = React.useState("noBuyer");
  const context = useGlobal();
  const auth = useAuth();
  const [ownBuyer, setOwnBuyer] = React.useState({ stationId: "" });
  const [partnersStations, setPartnersStations] = React.useState(null);
  const [ownSalesStations, setownSalesStations] = React.useState(null);

  const [ownStation, setOwnStation] = React.useState({
    stationId: "",
    buyerPortion: 0
  });
  const [otherStation, setOtherStation] = React.useState(null);
  const [otherBuyer, setOtherBuyer] = React.useState({
    stationId: "",
    buyerPortion: 0
  });

  React.useEffect(() => {
    (async () => {
      const result = await common.fetchPartnerStations();
      // await common.insertStationExample();
      if (result.code !== 200) {
        alert(result.msg);
        return;
      }
      setPartnersStations(result.data);
    })();
  }, [bInvestor]);
  React.useEffect(() => {
    (async () => {
      const result = await common.fetchOwnSalesStations(auth.userExtraInfo.id);
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
    if (buyerStatus === "noBuyer") {
      context.setStore_buyerStatus("otherBuyer");
      //todo 서버에서 가져오기 스테이션 아이디로 가져오기
      context.setStore_buyer("");
      //todo 서버에서 가져오기
      context.setStore_buyerPortion(0);
      //todo 서버에서 있는지 없는지 확인하기
      context.setStore_stationId("");
    } else if (buyerStatus === "otherBuyer") {
      context.setStore_buyerStatus("otherBuyer");
      //todo 서버에서 가져오기 스테이션 아이디로 가져오기
      context.setStore_buyer(auth.user.email);
      //todo 서버에서 가져오기
      context.setStore_buyerPortion(0);
      //todo 서버에서 있는지 없는지 확인하기
      context.setStore_stationId("");
    } else if (buyerStatus === "ownBuyer") {
      context.setStore_buyerStatus("otherBuyer");
      //todo 서버에서 가져오기 스테이션 아이디로 가져오기
      context.setStore_buyer(auth.user.email);
      //todo 서버에서 가져오기
      context.setStore_buyerPortion(0);
      //todo 서버에서 있는지 없는지 확인하기
      context.setStore_stationId("");
    }
  };

  const onChangeInvestorContact = (event) => {
    setInvestorContact(event.target.value);
    let stationId = event.target.value;
    setOtherBuyer((prev) => {
      return { ...prev, stationId: stationId };
    });
  };

  const onChangeInvestorPortion = (event) => {
    setInvestorPortion(event.target.value);
    let portion = event.target.value;
    setOtherBuyer((prev) => {
      return { ...prev, portion: portion };
    });
  };

  const handleChange = (event) => {
    console.log("오운?", event.target.value);
    let json = JSON.parse(event.target.value);
    console.log("오운?2", json);
    setOwnStation(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  React.useEffect(() => {
    setOwnBuyer(auth.userStations[0]);
  }, []);

  const bantoBody = (
    <>
      {/* <hr style={{ borderStyle: "dotted", marginBottom: "20px" }} /> */}
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>
              반토 프로그램에 등록된 스테이션
            </span>
            <span className={classes.contactPersonDescription}>
              스테이션 오너ID / 영업자에게 할당되는 수익률
            </span>
          </div>
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
                {!auth.userStations.length ? (
                  <option value={"0"}>등록된 스테이션 없음</option>
                ) : (
                  partnersStations &&
                  partnersStations.map((value) => {
                    return (
                      <>
                        <option value={JSON.stringify(value)}>
                          {value.stationId}, {value.buyerPortion} %
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
      {/* <hr style={{ borderStyle: "dotted", marginBottom: "20px" }} /> */}
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>
              협의된 구매자의 스테이션
            </span>
            <span className={classes.contactPersonDescription}>
              스테이션 오너ID / 영업자에게 할당되는 수익률
            </span>
          </div>
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
                {!auth.userStations.length ? (
                  <option value={"0"}>등록된 스테이션 없음</option>
                ) : (
                  ownSalesStations &&
                  ownSalesStations.map((value) => {
                    return (
                      <>
                        <option value={JSON.stringify(value)}>
                          {value.stationId}, {value.buyerPortion} %
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
      {/* <hr style={{ borderStyle: "dotted", marginBottom: "20px" }} /> */}
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>내 스테이션</span>
            <span className={classes.contactPersonDescription}></span>
          </div>
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
                {!auth.userStations.length ? (
                  <option value={"0"}>등록된 스테이션 없음</option>
                ) : (
                  auth.userStations.map((value) => {
                    return (
                      <>
                        <option value={JSON.stringify(value)}>
                          {value.stationId}, {value.buyerPortion} %
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
      <header>
        <NavBar title="" backLink="/sales/regist/portion" />
        <HeaderInfo
          title={"등록할 스테이션이 있으신가요"}
          description="내가 구매한 스테이션이나 미리 협의된 구매자의 스테이션을 설치 할수 있습니다"
        />
      </header>
      <main>
        <div className={classes.radioButtonGroup}>
          <FormControl
            component="fieldset"
            error={error}
            className={classes.formControl}
          >
            <FormLabel component="legend" className={classes.consentInvestor}>
              등록할 스테이션이 있으신가요?
            </FormLabel>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={bInvestor}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="noBuyer"
                control={
                  <Radio
                    classes={{ root: classes.radio, checked: classes.checked }}
                  />
                }
                label="반토 파트너스 프로그램을 통해 무료로 신청하겠습니다"
                checked={bInvestor === "noBuyer"}
              />
              <FormControlLabel
                value="ownBuyer"
                control={
                  <Radio
                    classes={{ root: classes.radio, checked: classes.checked }}
                  />
                }
                label="네. 구매한 스테이션이 있습니다"
              />
              <FormControlLabel
                value="otherBuyer"
                control={
                  <Radio
                    classes={{ root: classes.radio, checked: classes.checked }}
                  />
                }
                label="네. 다른 구매자의 스테이션을 설치하기로 협의했습니다"
              />
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
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
        {bInvestor === "noBuyer"
          ? bantoBody
          : bInvestor === "otherBuyer"
          ? ownSalesBody
          : ownBody}

        <Button
          className={classes.nextButton}
          size="large"
          variant="outlined"
          type="submit"
          style={{ marginBottom: "40px" }}
          onClick={async () => {
            context.setStore_buyerStatus("");
            context.setStore_buyer("");
            context.setStore_buyerPortion(0);
            context.setStore_stationId("");

            if (bInvestor === "otherBuyer") {
              // TODO 여기서 otherBuyer.stationId 스테이션 아이디로 가져오기
              const bIsAvailable = await context.isAvailable(
                otherBuyer.stationId
              );
              if (bIsAvailable.code !== 200) {
                alert(bIsAvailable.msg);
                return;
              }
              if (bIsAvailable.data === null) {
                alert("등록 불가한 스테이션입니다.");
                return;
              }
              const buyerId = await context.getBuyerId(otherBuyer.stationId);
              if (buyerId.code !== 200) {
                alert(bIsAvailable.msg);
                return;
              }
              if (buyerId.data === null) {
                alert("등록 불가한 스테이션입니다.");
                return;
              }
              console.log("버이어아이디", buyerId.data.buyer);
              context.setSales_BInvestor(true);
              context.setStore_buyer();

              context.setStore_buyerStatus("otherBuyer");
              //todo 서버에서 가져오기 스테이션 아이디로 가져오기
              context.setStore_buyer(buyerId.data.buyer);
              //todo 텍스트 필드에서 가져오기
              context.setStore_buyerPortion(buyerId.data.buyerPortion);
              //todo 서버에서 있는지 없는지 확인하기
              context.setStore_stationId(otherBuyer.stationId);

              //TODO 바이어 포션 비율 함수
            } else if (bInvestor === "noBuyer") {
              context.setStore_buyer("banto");
              context.setStore_buyerStatus("noBuyer");
              let bantoPortion =
                context.salesInfo.salesPortion + context.salesInfo.storePortion;
              context.setStore_buyerPortion(bantoPortion);
            } else if (bInvestor === "ownBuyer") {
              console.log("오운 스테이션", ownStation);
              let ownObject = JSON.parse(ownStation);
              context.setStore_buyerStatus("ownBuyer");
              //todo 서버에서 가져오기 스테이션 아이디로 가져오기
              context.setStore_buyer(auth.user.email);
              //todo 서버에서 가져오기
              context.setStore_buyerPortion(ownObject.buyerPortion);
              //todo 서버에서 있는지 없는지 확인하기
              context.setStore_stationId(ownObject.stationId);
            }
            props.history.push("/sales/regist/final");
          }}
        >
          다음
        </Button>
      </main>
      <footer></footer>
    </>
  );
}

export default RegistAddInvestor;
