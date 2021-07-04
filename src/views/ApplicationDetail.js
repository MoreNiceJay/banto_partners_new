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
import DescriptionText from "../components/DescriptionText.js";

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
  },
  description: {
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    marginTop: "16px",
    marginLeft: "24px"
  },
}));

function LoginPage(props) {
  const auth = useAuth();
  const query = qs.parse(props.location.search, {
    ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });
  const [apiData, setApiData] = React.useState(null);
  console.log("세일즈 메소드", (apiData && (apiData.data.salesMethod)))



  const [id, setId] = React.useState(null);
  const applicationId = query.applicationId;
  const role = query.role;
  const doc =
    role === "buyer"
      ? constant.dbCollection.buyerApplication
      : role === "salesManager"
        ? constant.dbCollection.contract
        : query.role === "storeOwner"
          ? constant.dbCollection.contract
          : null;

  React.useEffect(() => {
    (async () => {
      // console.log("닥", doc)
      // if (!doc) {
      //   alert("오류 : 메인으로 이동 합니다");
      //   props.history.push("/main");
      //   return;
      // }
      console.log("닥", doc)
      console.log("닥", applicationId)
      setId(applicationId);
      let db = firebase.firestore();
      const applicationRef = db
        .collection(doc).doc(applicationId)


      const querySnapshot = await applicationRef.get();
      // let data;
      // querySnapshot.forEach((doc) => {
      //   data = { id: doc.id, data: doc.data() }
      //   console.log("데이터", data);
      let hasFranchiseDoc = typeof querySnapshot.data().franchiseDoc !== "undefined"

      if (hasFranchiseDoc) {

        console.log("프레", querySnapshot.data().franchiseDoc)

        let franchiseRef = await db.collection("Franchises").doc(querySnapshot.data().franchiseDoc).get()
        console.log("프레", franchiseRef.data())
        setApiData({ id: querySnapshot.id, data: querySnapshot.data(), franchise: franchiseRef.data() });
        return

      }
      setApiData({ id: querySnapshot.id, data: querySnapshot.data() });
      return
      // });
    })();
  }, []);
  const infoBody = (role, data) => {


    if (role === "buyer") {

      let buyerData = [
        {
          title: "스테이션 수",
          data: apiData && apiData.data.amount,
          link: "/sales/regist/address"
        },
        {
          title: "총 금액",
          data:
            // apiData && common.numberWithCommas(apiData.totalPrice)+"원",
            apiData && (apiData.data.totalPrice) + "원",
          link: "/sales/regist/address"
        },
        {
          title: "입금자",
          data: apiData && apiData.data.depositor,
          link: "/sales/regist/contact"
        },
        {
          title: "은행",
          data: apiData && apiData.data.bank,
          link: "/sales/regist/address"
        },
        {
          title: "계좌번호",
          data: apiData && apiData.data.bankAccount,
          link: "/sales/regist/address"
        },
        {
          title: "신청서 상태",
          data: apiData && apiData.data.status === "WAITING" ? "입금 확인중" : "승인 완료",
          link: "/sales/regist/contact"
        },
        {
          title: "신청 날짜",
          data: apiData && common.getMonthDayTimeMinute(apiData.data.createdBy),
          link: "/sales/regist/portion"
        },
        apiData && (apiData.data.approvedBy !== "" ?
          {
            title: "승인 날짜",
            data: apiData && common.getMonthDayTimeMinute(apiData.data.approvedBy),
            link: "/sales/regist/portion"
          } : {}),
        {
          title: "영업 방법",
          data: apiData && (apiData.data.salesMethod === constant.salesMethod.banto ? "반토 영업망" : (apiData.data.salesMethod === constant.salesMethod.ownSales ? "자체 영업" : "선택되지 않음")),
          link: "/sales/regist/contact"
        },
        apiData && (apiData.data.salesMethod === constant.salesMethod.banto ?
          {
            title: "세일즈 파트너에게 할당된 수익률",
            data: apiData && apiData.data.salesPortion + "%",
            link: "/sales/regist/portion"
          } : {}),
        {
          title: "나의 수익률",
          data: apiData && apiData.data.buyerPortion - apiData.data.salesPortion + "%",
          link: "/sales/regist/portion"
        },
        apiData && apiData.data.salesMethod === constant.salesMethod.ownSales &&
        {
          title: "영업인 (수익률)",
          data: apiData && apiData.data.preSalesManagers.map((value) => <p style={{ marginTop: "8px" }}>{`${value.id}(${value.portion}%)`}</p>),
          // data: `${
          //   auth.userExtraInfo ? auth.userExtraInfo.id + apiData.preSalesIds: constant.exampleUserId
          // }(${apiData && apiData.salesPortion}%)`,
          link: "/sales/regist/portion"
        }


      ]

      const buyerBody = (<><section className={classes.section}>
        {apiData &&
          buyerData.map((value) => {
            if (Object.keys(value).length === 0)
              return


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

            <DescriptionText title={`영업 방법은 '구매자'->'내 스테이션' 에서 변경할 수 있습니다`}></DescriptionText>
            <p className={classes.description}>
            </p>
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
                  window.location.href = "/popToTop/"
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

        </section></>)
      return buyerBody

    } else if (role === "salesManager") {
      console.log("데이터", data)

      const salesData = [
        {
          title: "신청서 상태",
          data: apiData && apiData.data.status,
          link: "/sales/regist/address"
        },
        {
          title: "신청 날짜",
          data: apiData && common.getMonthDayTimeMinute(apiData.data.createdBy),
          link: "/sales/regist/address"
        },
        apiData && (apiData.data.approvedBy !== "") && {
          title: "승인 날짜",
          data: apiData && common.getMonthDayTimeMinute(apiData.data.approvedBy),
          link: "/sales/regist/address"
        },
        {
          title: "가맹점 이름",
          data: apiData && apiData.franchise.storeName,
          link: "/sales/regist/address"
        },
        {
          title: "가맹점 주소",
          data: [
            apiData && apiData.franchise.storeMainAddress,
            apiData && apiData.franchise.storeRestAddress
          ].join(" "),
          link: "/sales/regist/address"
        },

        {
          title: "가맹점 전화번호",
          data: apiData && apiData.franchise.storePhoneNumber,
          link: "/sales/regist/contact"
        },
        {
          title: "점주님 연락처",
          data: apiData && apiData.franchise.storeOwnerPhoneNumber,
          link: "/sales/regist/contact"
        },


        {
          title: "가맹점 수익",
          data: apiData && apiData.data.storePortion + apiData.data.storeBonusPortion + "%",
          link: "/sales/regist/portion"
        },
        {
          title: "세일즈 파트너 수익률",
          data:
            `${(apiData && apiData.data.salesPortion) - (apiData && apiData.data.storePortion)}%`,
          link: "/sales/regist/portion"
        },

      ];
      const salesBody = (<><section className={classes.section}>
        {apiData &&
          salesData.map((value) => {
            if (!value) {
              return
            }
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
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "24px",
                    margin: "16px 0 60px 24px",
                    color: "#000A12",
                    lineHeight: "120%"
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
        </section></>)

      return salesBody


    } else if (role === "storeOwner") {

      console.log(apiData && apiData)
      const storeData = [
        {
          title: "신청서 상태",
          data: apiData && apiData.data.status,
          link: "/sales/regist/address"
        },
        {
          title: "신청 날짜",
          data: apiData && common.getMonthDayTimeMinute(apiData.data.createdBy),
          link: "/sales/regist/address"
        },
        apiData && (apiData.data.approvedBy !== "") && {
          title: "승인 날짜",
          data: apiData && common.getMonthDayTimeMinute(apiData.data.approvedBy),
          link: "/sales/regist/address"
        },
        {
          title: "가맹점 이름",
          data: apiData && apiData.franchise.storeName,
          link: "/sales/regist/address"
        },
        {
          title: "가맹점 주소",
          data: [
            apiData && apiData.franchise.storeMainAddress,
            apiData && apiData.franchise.storeRestAddress
          ].join(" "),
          link: "/sales/regist/address"
        },

        {
          title: "가맹점 전화번호",
          data: apiData && apiData.franchise.storePhoneNumber,
          link: "/sales/regist/contact"
        },
        {
          title: "점주님 연락처",
          data: apiData && apiData.franchise.storeOwnerPhoneNumber,
          link: "/sales/regist/contact"
        },


        {
          title: "가맹점 수익",
          data: apiData && apiData.data.storePortion + apiData.data.storeBonusPortion + "%",
          link: "/sales/regist/portion"
        },


      ];
      const storeBody = (<><section className={classes.section}>
        {apiData &&
          storeData.map((value) => {
            if (!value) {
              return
            }
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
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "24px",
                    margin: "16px 0 60px 24px",
                    color: "#000A12",
                    lineHeight: "120%"
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

            {/* <Button
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
            </Button> */}
          </div>
        </section></>)
      return storeBody
    }
    //error 처리

  }



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
  console.log("salesMethod", constant.salesMethod)




  const data = [
    {
      title: "스테이션 수",
      data: apiData && apiData.data.amount,
      link: "/sales/regist/address"
    },
    {
      title: "총 금액",
      data:
        apiData && apiData.data.totalPrice,
      link: "/sales/regist/address"
    },
    {
      title: "입금자",
      data: apiData && apiData.data.storeOwnerPhoneNumber,
      link: "/sales/regist/contact"
    },
    {
      title: "은행",
      data: apiData && apiData.data.storeName,
      link: "/sales/regist/address"
    },
    {
      title: "계좌번호",
      data: [
        apiData && apiData.data.storeMainAddress,
        apiData && apiData.data.storeRestAddress
      ].join(" "),
      link: "/sales/regist/address"
    },
    {
      title: "점주님 연락처",
      data: apiData && apiData.data.storeOwnerPhoneNumber,
      link: "/sales/regist/contact"
    },

    {
      title: "매장 연락처",
      data: apiData && apiData.data.storePhoneNumber,
      link: "/sales/regist/contact"
    },

    {
      title: "가맹점 수익",
      data: apiData && apiData.data.storePortion + "%",
      link: "/sales/regist/portion"
    },
    {
      title: "영업인 (수익률)",
      data: `${auth.userExtraInfo ? auth.userExtraInfo.id : constant.exampleUserId
        }(${apiData && apiData.data.salesPortion}%)`,
      link: "/sales/regist/portion"
    },
    {
      title: "스테이션 보유자(스테이션 ID)(수익률%)",
      data: `${apiData && apiData.data.buyerStatus === "noOwner"
        ? "반토 무료 스테이션 신청"
        : apiData && apiData.data.buyerStatus === "ownBuyer"
          ? `${auth.user.email} (${apiData && apiData.data.stationId}) (${apiData && apiData.data.buyerPortion
          }%)`
          : `${apiData && apiData.data.buyer} (${apiData && apiData.data.stationId}) (${apiData && apiData.data.buyerPortion
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
            <NavBar title="신청서 정보" backLink={`/popToTop/`} />
          </header>

          <main>
            {/* {role === "buyer" ? buyerBody : (role === "salesManager" ? salesBody : storeBody)} */}
            {apiData && infoBody(role, apiData)}
          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default LoginPage;
