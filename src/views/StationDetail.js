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

function StationDetail(props) {
  const auth = useAuth();
  const [apiData, setApiData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const query = qs.parse(props.location.search, {
    ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });
  const role = query.role;
  const stationId = query.stationId;

  React.useEffect(() => {

    (async () => {

      setId(stationId);
      console.log("스테이션 아이디", stationId);
      let db = firebase.firestore();
      const applicationRef = await db
        .collection(constant.dbCollection.station)
        .doc(stationId)

      const querySnapshot = await applicationRef.get();


      if (typeof querySnapshot.data().contractDoc === "undefined" || querySnapshot.data().contractDoc === "") {
        return { id: querySnapshot.id, data: querySnapshot.data() };

      }

      const contractRef = await db.collection(constant.dbCollection.contract).doc(querySnapshot.data().contractDoc).get();

      console.log(contractRef.data())

      let franchiseData = {}


      const result = async () => {
        if (typeof contractRef.data().franchiseDoc !== "undefined" && contractRef.data().franchiseDoc !== "") {

          console.log("스테이션 디테일", constant.dbCollection.franchise);
          console.log("스테이션 디테일", contractRef.data().franchiseDoc);

          const franchiseResult = await db
            .collection(constant.dbCollection.franchise)
            .doc(contractRef.data().franchiseDoc)
            .get();
          franchiseData = franchiseResult.data();
          return { id: querySnapshot.id, data: querySnapshot.data(), contract: contractRef.data(), franchise: franchiseData };

        } else {
          return { id: querySnapshot.id, data: querySnapshot.data(), contract: contractRef.data(), franchise: franchiseData };
        }
      }
      console.log(await result())
      setApiData(await result());


      // querySnapshot.forEach((doc) => {
      //   data = doc.data();
      //   const franchiseData =
      //     console.log("데이터", data);
      //   setApiData(data);
      // });
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
  const bCheckNull = (value) => typeof value === "object" && value === null
  const infoBody = (role, stationObj) => {
    let hasFranchiseInfo = bCheckNull(stationObj.franchise)
    console.log("hasFranchise", hasFranchiseInfo)
    console.log(role)
    if (role === "buyer") {
      if (!hasFranchiseInfo) {
        const buyerUnreservedData = [
          {
            title: "스테이션 아이디",
            data: (stationObj && stationObj.data.stationId),
            link: "/sales/regist/contact"
          },
          {
            title: "상태",
            data: (stationObj && stationObj.data.bReserved) ? ("[설치승인 대기중]") : ("[세일즈 진행중]"),
            link: "/sales/regist/contact"
          },
          {
            title: "세일즈 방법",
            data: salesMethod == "banto" ? ("반토 영업망") : (salesMethod == "ownSales" ? ("자체 영업") : ("미설정")),
            link: "/sales/regist/contact"
          },

          (salesMethod === "banto") && ({
            title: "세일즈 파트너 수익률",
            data: stationObj && stationObj.data.salesPortion + "%",
            link: "/sales/regist/portion"
          }),
          (salesMethod === "ownSales") && ({
            title: "예약된 영업자",
            data: stationObj && stationObj.data.preSalesManagers.map(v => {
              return <p style={{ lineHeight: "120%" }}>{`${v.id}, ${v.portion}%`}</p>
            })
            ,
            link: "/sales/regist/portion"
          }),
          {
            title: "구매자 최초 수익률",
            data:
              stationObj && stationObj.data.buyerPortion + "%"
            ,
            link: "/sales/regist/portion"
          }
        ];
        //franchise 없음
        //return without franchise
        const buyerBody = (<><section className={classes.section}>
          {buyerUnreservedData.map((value) => {
            if (!(value)) {
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

              </div>


              {(stationObj && !stationObj.data.bReserved) && (<Button
                variant="outlined"
                onClick={async () => {

                  props.history.push(`/table/stationsalesmethod?role=${role}&stationId=${stationId}`);

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
                영업방법 설정
              </Button>)
              }
            </div >
          </section ></>)
        return buyerBody


      }
      //franchise 있음
      const buyerReservedData = [
        {
          title: "매장명",
          data: stationObj && stationObj.franchise && stationObj.franchise.storeName,
          link: "/sales/regist/address"
        },
        {
          title: "매장 주소",
          data: [
            stationObj && stationObj.franchise.storeMainAddress,
            stationObj && stationObj.franchise.storeRestAddress
          ].join(" "),
          link: "/sales/regist/address"
        },

        {
          title: "매장 연락처",
          data: stationObj && stationObj.franchise.storePhoneNumber,
          link: "/sales/regist/contact"
        },
        {
          title: "설치 날짜",
          data: stationObj && stationObj.franchise.approvedBy,
          link: "/sales/regist/contact"
        },

        {
          title: "가맹점 수익",
          data: stationObj && (stationObj.contract.storePortion + stationObj.contract.storeBonusPortion) + "%",
          link: "/sales/regist/portion"
        },
        {
          title: "세일즈 파트너",
          data: stationObj && stationObj.contract.salesManager,
          link: "/sales/regist/portion"
        },

        {
          title: "세일즈 파트너 수익",
          data: stationObj && stationObj.contract.salesPortion + "%",
          link: "/sales/regist/portion"
        },
        {
          title: "구매자 최초 수익률",
          data:
            stationObj && stationObj.data.buyerPortion + "%"
          ,
          link: "/sales/regist/portion"
        }
      ];
      const buyerBody = (<><section className={classes.section}>
        {buyerReservedData.map((value) => {
          if (!(value)) {
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

            </div>


            {(stationObj && !stationObj.data.bReserved) && (<Button
              variant="outlined"
              onClick={async () => {

                props.history.push(`/table/stationsalesmethod?role=${role}&stationId=${stationId}`);

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
              영업방법 설정
            </Button>)
            }
          </div >
        </section ></>)



      return buyerBody
    } else if (role === "salesManger") {

      const salesData = [


        apiData && (apiData.approvedBy !== "") && {
          title: "승인 날짜",
          data: apiData && common.getMonthDayTimeMinute(apiData.data.approvedBy),
          link: "/sales/regist/address"
        },
        {
          title: "가맹점 이름",
          data: apiData && apiData.franchise && apiData.franchise.storeName,
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

      return salesBody
    } else if (role === "storeOwner") {
      const storeData = [

        apiData && (apiData.approvedBy !== "") && {
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
          data: apiData && apiData.contract.storePortion + apiData.contract.storeBonusPortion + "%",
          link: "/sales/regist/portion"
        },
        {
          title: "세일즈 파트너 수익률",
          data:
            `${(apiData && apiData.contract.salesPortion) - (apiData && apiData.contract.storePortion)}%`,
          link: "/sales/regist/portion"
        },



      ];
      const storeBody = (<><section className={classes.section}>
        {console.log("apiData", apiData)}
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

            </div>
            {/* 
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
  </Button> */}
          </div>
        </section></>)
      return storeBody
    }
    //오류

    return (<div style={{ width: "100%", height: "100px", backgroundColor: "red" }}></div>)

  }



  const salesMethod = (apiData && apiData.data.salesMethod)





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
            <NavBar title="스테이션 정보" backLink={`/popToTop/`} />
          </header>

          <main>
            {/* {role === "buyer" ? buyerBody : null}
            {role === "salesManager" ? salesBody : null}
            {role === "store" ? storeBody : null} */}
            {apiData && infoBody(role, apiData)}

          </main>
          <footer></footer>
        </div>
      </Slide>
    </>
  );
}

export default StationDetail;
