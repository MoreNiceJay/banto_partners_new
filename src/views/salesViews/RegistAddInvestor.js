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

  const [bInvestor, setBInvestor] = React.useState("banto");
  const context = useGlobal();
  const auth = useAuth();
  const [partnersStations, setPartnersStations] = React.useState(null);
  const [ownSalesStations, setownSalesStations] = React.useState(null);
  const [myStations, setMyStations] = React.useState(null);

  const [ownStation, setOwnStation] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const result = await common.fetchOwnSalesStations(auth.userExtraInfo.id);
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
      const result = await common.fetchUserStations(auth.userExtraInfo.id);
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
                value="banto"
                control={
                  <Radio
                    classes={{ root: classes.radio, checked: classes.checked }}
                  />
                }
                label="반토 파트너스 프로그램을 통해 무료로 신청하겠습니다"
                checked={bInvestor === "banto"}
              />
              <FormControlLabel
                value="mine"
                control={
                  <Radio
                    classes={{ root: classes.radio, checked: classes.checked }}
                  />
                }
                label="네. 구매한 스테이션이 있습니다"
              />
              <FormControlLabel
                value="ownSales"
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
        {bInvestor === "banto"
          ? bantoBody
          : bInvestor === "ownSales"
          ? ownSalesBody
          : ownBody}

        <Button
          className={classes.nextButton}
          size="large"
          variant="outlined"
          type="submit"
          style={{ marginBottom: "40px" }}
          onClick={() => {
            console.log("비인베스터", bInvestor);
            const choosedStation = JSON.parse(ownStation);
            if (!!!choosedStation) {
              alert("스테이션을 선택해주세요");
              return;
              console.log("추스드", choosedStation);
            }
            if (bInvestor === "ownSales") {
              // TODO 여기서 otherBuyer.stationId 스테이션 아이디로 가져오기
              context.setSales_salesManager(auth.userExtraInfo.id);
              context.setSales_stationDoc(choosedStation.id);

              const salesPortion = choosedStation.data.preSalesManagers.find(
                (e) => e.id === auth.userExtraInfo.id
              ).portion;
              context.setSales_salesPortion(salesPortion);
              context.setSales_stationId(choosedStation.data.stationId);
              context.setSales_buyer(choosedStation.data.buyer);
              context.setSales_buyerPortion(choosedStation.data.buyerPortion);

              //TODO 바이어 포션 비율 함수
            } else if (bInvestor === "banto") {
              context.setSales_salesManager(auth.userExtraInfo.id);
              context.setSales_stationDoc(choosedStation.id);

              context.setSales_salesPortion(choosedStation.data.salesPortion);
              context.setSales_stationId(choosedStation.data.stationId);
              context.setSales_buyer(choosedStation.data.buyer);
              context.setSales_buyerPortion(choosedStation.data.buyerPortion);
            } else if (bInvestor === "mine") {
              context.setSales_salesManager(auth.userExtraInfo.id);
              context.setSales_stationDoc(choosedStation.id);

              context.setSales_salesPortion(choosedStation.data.buyerPortion);
              context.setSales_stationId(choosedStation.data.stationId);
              context.setSales_buyer(choosedStation.data.buyer);
              context.setSales_buyerPortion(choosedStation.data.buyerPortion);
            }
            props.history.push("/sales/regist/portion");
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
