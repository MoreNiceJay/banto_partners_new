import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderInfo } from "../components/HeaderInfo.js";
import NavBar from "../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useGlobal } from "../globalContext";
import { useAuth } from "../AuthContext";
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
import * as common from "../common";
import qs from "qs";
import firebase from "../firebaseConfig";
import Alert from "../components/Alert.js";
import * as constant from "../Const";

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
  }
}));

function LoginPage(props) {
  const auth = useAuth();
  const query = qs.parse(props.location.search, {
    ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });
  const [apiData, setApiData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const applicationId = query.applicationId;
  const role = query.role;
  const doc =
    role === "buyer"
      ? constant.dbCollection.buyerApplication
      : role === "salesManager"
      ? constant.dbCollection.salesApplication
      : query.role === "storeOwner"
      ? constant.dbCollection.storeApplication
      : null;
  React.useEffect(() => {
    (async () => {
      if (!doc) {
        alert("오류 : 메인으로 이동 합니다");
        props.history.push("/main");
        return;
      }

      setId(applicationId);
      let db = firebase.firestore();
      const applicationRef = db
        .collection(doc)
        .where("applicationId", "==", applicationId);

      const querySnapshot = await applicationRef.get();
      let data;
      querySnapshot.forEach((doc) => {
        data = doc.data();
        console.log("데이터", data);
        setApiData(data);
      });
    })();
  }, []);
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });
  const context = useGlobal();
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
  const data = [
    {
      title: "매장명",
      data: apiData && apiData.storeName,
      link: "/sales/regist/address"
    },
    {
      title: "매장 주소",
      data: [
        apiData && apiData.storeMainAddress,
        apiData && apiData.storeRestAddress
      ].join(" "),
      link: "/sales/regist/address"
    },
    {
      title: "점주님 연락처",
      data: apiData && apiData.storeOwnerPhoneNumber,
      link: "/sales/regist/contact"
    },

    {
      title: "매장 연락처",
      data: apiData && apiData.storePhoneNumber,
      link: "/sales/regist/contact"
    },

    {
      title: "가맹점 수익",
      data: apiData && apiData.storePortion + "%",
      link: "/sales/regist/portion"
    },
    {
      title: "영업인 (수익률)",
      data: `${
        auth.userExtraInfo ? auth.userExtraInfo.id : constant.exampleUserId
      }(${apiData && apiData.salesPortion}%)`,
      link: "/sales/regist/portion"
    },
    {
      title: "스테이션 보유자(스테이션 ID)(수익률%)",
      data: `${
        apiData && apiData.buyerStatus === "noOwner"
          ? "반토 무료 스테이션 신청"
          : apiData && apiData.buyerStatus === "ownBuyer"
          ? `${auth.user.email} (${apiData && apiData.stationId}) (${
              apiData && apiData.buyerPortion
            }%)`
          : `${apiData && apiData.buyer} (${apiData && apiData.stationId}) (${
              apiData && apiData.buyerPortion
            }%)`
      }`,
      link: "/sales/regist/portion"
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
          {!auth.userExtraInfo && (
            <>
              <Alert
                type="info"
                title="체험하기"
                description="현재 체험히기를 이용중입니다"
                actionDescription="로그인"
                link="/login/login"
              ></Alert>
            </>
          )}
          <header>
            <NavBar title="스테이션 정보" backLink={`/popToTop/`} search=" " />
          </header>

          <main>
            <section className={classes.section}>
              {apiData &&
                data.map((value) => {
                  return (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirextion: "rows",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "16px 0 0 24px"
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

                        {/* <Link
                          style={{
                            textDecoration: "underline",
                            fontFamily: "Noto Sans CJK KR",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "12px",
                            marginRight: "24px"
                          }}
                        >
                          수정
                        </Link> */}
                      </div>
                      <p
                        style={{
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                          fontWeight: "bold",
                          fontSize: "24px",
                          margin: "16px 0 60px 24px",
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
                  {/* <FormControlLabel
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
                        2020년 하반기 정책사항에 동의 합니다
                      </span>
                    }
                  />
                  <p style={{ textAlign: "right" }}>
                    <Link
                      style={{
                        marginRight: "24px",
                        textDecoration: "underline"
                      }}
                    >
                      약관확인
                    </Link>
                  </p> */}
                </div>

                <Button
                  variant="outlined"
                  onClick={async () => {
                    if (window.confirm("신청서를 삭제하시겠습니까")) {
                      const result = await common.deleteApplication(id);
                      if (result.code !== 200) {
                        alert(result.msg);
                        return;
                      }
                      alert("삭제되었습니다");
                      props.history.push("/table/application?role=sales");
                    } else {
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
                  삭제하기
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
