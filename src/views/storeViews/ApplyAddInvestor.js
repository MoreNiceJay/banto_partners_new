import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../../globalContext";
import { useAuth } from "../../AuthContext";
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
import ProgressText from "../../components/ProgressText.js";
import InputTitle from "../../components/InputTitle.js";
import PTextField from "../../components/PTextField.js";
import SquareButton from "../../components/SquareButton.js";
import PRadio from "../../components/PRadio.js";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import PortionTextField from "../../components/PortionTextField.js";
import InputLabel from "@material-ui/core/InputLabel";

var _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  emptySpace: { width: "100%", height: "44px" },
  headerSpace: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "60px"
  },

  root: {
    width: 200,
    "& .MuiOutlinedInput-input": {
      color: "green",
      textAlign: "center",
      height: "100px"
    },
    "& .MuiInputLabel-root": {
      color: "green",
      textAlign: "center"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
      textAlign: "center"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "red",
      textAlign: "center"
    },
    "&:hover .MuiInputLabel-root": {
      color: "red",
      textAlign: "center"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
      textAlign: "center"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "purple",
      textAlign: "center"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "purple",
      textAlign: "center"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
      textAlign: "center"
    }
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
  },
  textLabelInput: {
    "&::placeholder": {
      color: "blue"
    },
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "blue"
        },
        inputCenter: {
          textAlign: "center",
          color: "red"
        },
        color: "white"
      }
    }
  },
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
  contactPersonTextField: { marginTop: "10px", width: "calc(100% - 25px)" }
}));
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    },
    textAlign: "right"
  },
  input: {
    // borderRadius: 4,
    // position: "relative",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    // fontSize: 16,
    padding: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

function LoginPage(props) {
  const classes = useStyles(props);
  const [ownStation, setOwnStation] = React.useState({
    stationId: "",
    buyerPortion: 0
  });
  const [investorContact, setInvestorContact] = React.useState("");
  const [investorPortion, setInvestorPortion] = React.useState(0);

  const [ownBuyer, setOwnBuyer] = React.useState({ stationId: "" });
  const [otherBuyer, setOtherBuyer] = React.useState({
    stationId: "",
    buyerPortion: 0
  });
  const [bInvestor, setBInvestor] = React.useState("noBuyer");
  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setBInvestor(event.target.value);

    // TODO 여기 바꾸기 setStore로
    let buyerStatus = event.target.value;
    setBInvestor(event.target.value);

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
  const context = useGlobal();
  const auth = useAuth();
  let percentage = _.range(0, 26);

  React.useEffect(() => {
    setOwnBuyer(auth.userStations[0]);
  }, []);

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

  const otherBody = (
    <>
      <div style={{ marginTop: "40px" }}>
        <InputTitle text="투자자의 전화번호" />
        <PTextField
          placeholder="Phone Number"
          value={context.getStoreInfo.investorContact}
          onChange={(e) => {
            context.setStore_buyer(e.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "60px" }}>
        <InputTitle text="약속된 수익률" />

        <PortionTextField
          className={classes.textLabelInput}
          id="standard-full-width"
          // label="0"
          placeholder="%"
          // helperText="투자하신 기기 수량만큼 수익이 창출됩니다"
          value={otherBuyer.portion}
          o12nChange={onChangeInvestorPortion}
        />
      </div>
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
            <NavBar title="추가정보 입력" backLink="/store/apply/portion" />
          </header>

          <main>
            <section className={classes.section}>
              <ProgressText text="4/5" />
              <InputTitle text="등록할 스테이션이 있으신가요?" />
              <div style={{ marginLeft: "8px" }}>
                <FormControl
                  component="fieldset"
                  style={{ margin: "28px 0 0 24px" }}
                >
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={bInvestor}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="noBuyer"
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
                      label="아니오. 반토 본사를 통해 무료로 신청하겠습니다"
                      checked={bInvestor === "noBuyer"}
                    />
                    <FormControlLabel
                      value="ownBuyer"
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
                      label="네. 구매한 스테이션이 있습니다"
                    />
                    <FormControlLabel
                      value="otherBuyer"
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
                      label="네 다른분의 스테이션을 설치하기로 협의했습니다"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {bInvestor === "noBuyer"
                ? ""
                : bInvestor === "otherBuyer"
                ? otherBody
                : ownBody}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  variant="outlined"
                  onClick={async () => {
                    // props.history.push("/store/apply/final");

                    //todo요기 바꾸기
                    context.setStore_buyerStatus("");
                    context.setStore_buyer("");
                    context.setStore_buyerPortion(0);
                    context.setStore_stationId("");
                    props.history.push("/store/apply/final");

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
                      const buyerId = await context.getBuyerId(
                        otherBuyer.stationId
                      );
                      if (buyerId.code !== 200) {
                        alert(bIsAvailable.msg);
                        return;
                      }
                      if (buyerId.data === null) {
                        alert("등록 불가한 스테이션입니다.");
                        return;
                      }
                      console.log("버이어아이디", buyerId.data.buyer);

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
                        context.salesInfo.salesPortion +
                        context.salesInfo.storePortion;
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
                      props.history.push("/store/apply/final");
                    }
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
                  next
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
