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
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import * as common from "../common";
import qs from "qs";
import firebase from "../firebaseConfig";
import Alert from "../components/Alert.js";
import * as constant from "../Const";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PolicyModal from "../components/PolicyModal"

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import SubTitle from "../components/SubTitle";
import EmptySpace from "../components/EmptySpace";
import DescriptionText from "../components/DescriptionText";

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
    }
}));

function StationSalesMethod(props) {
    const auth = useAuth();
    const maxPortion = 70;
    const [apiData, setApiData] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [value, setValue] = React.useState("banto");
    const [open, setOpen] = React.useState(false);

    const [invitations, setInvitatations] = React.useState([
        { key: "1111", id: "", portion: 0 }
    ]);
    const [stationDoc, setStationDoc] = React.useState(null)

    const [salesPortion, setSalesPortion] = React.useState(0)
    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    const role = query.role;
    const stationId = query.stationId;
    const handleChangeValue = (event) => {
        setValue(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleSelectChange = (event) => {
        console.log(event.target.value);
        setSalesPortion(event.target.value);
    };
    React.useEffect(() => {
        (async () => {
            setId(stationId);
            console.log("스테이션 아이디", stationId);
            let db = firebase.firestore();
            const applicationRef = db
                .collection("Stations")
                .where("stationId", "==", stationId);

            const querySnapshot = await applicationRef.get();
            let data;
            querySnapshot.forEach((doc) => {
                data = doc.data();
                console.log("데이터", data);
                setApiData(data);
                setStationDoc(doc.id)
            });
        })();
    }, []);
    const classes = useStyles(props);
    const [state, setState] = React.useState({
        checkedA: false,
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

    const salesMethod = (apiData && apiData.salesMethod === "banto" ? "반토 영업망" : (apiData && apiData.salesMethod === "ownSales" ? "자체 영업" : "미설정"))
    const data = [

        {
            title: "세일즈 방법",
            data: salesMethod,
            link: "/sales/regist/portion"
        },

        (salesMethod === "반토 영업망") && {
            title: "세일즈 파트너 수익",
            data: apiData && apiData.salesPortion + "%",
            link: "/sales/regist/portion"
        },

        (salesMethod === "자체 영업") && {
            title: "예약된 세일즈 파트너",
            data: apiData && apiData.preSalesManagers.map(v => {
                return <p><p style={{ lineHeight: "120%" }}>{`${v.id}, ${v.portion}%`}</p></p>
            }),
            link: "/sales/regist/portion"
        },
        {
            title: "구매자 최초 수익률",
            data:
                apiData && apiData.buyerPortion + "%"
            ,
            link: "/sales/regist/portion"
        }
    ];

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
                        width: "calc(100% - 48px)"
                    }}
                >
                    <InputLabel
                        shrink={false}
                        style={{
                            paddingLeft: "0px",
                            fontSize: "26px",
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
                        value={salesPortion}
                        placeholder="Bank"
                        variant="outlined"
                        style={{
                            fontSize: "26px",
                            fontWeight: "bold"
                            // boxSizing: "border-box"
                        }}
                        onChange={handleSelectChange}
                        inputProps={{
                            style: {
                                fontSize: "26px",
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
                        margin: "16px 24px 24px 24px",
                        textAlign: "right"
                    }}
                >
                    내 수익 계산기 :{" "}
                    {myPortionCalculater(maxPortion, salesPortion)}%
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
            <DescriptionText title=
                {`*세일즈 파트너의 아이디는 '내정보'에서 확인할 수 있습니다`} />
        </>
    );


    const buyerBody = (<><section className={classes.section}>
        {apiData &&
            data.map((value) => {
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
                                margin: "8px 0 0 24px"
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
                                margin: "16px 0 28px 24px",
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

                {/* <Button
          variant="outlined"
          onClick={async () => {
            if (window.confirm("설치된 스테이션을 회수 하시겠습니까")) {
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
          회수하기
      </Button> */}

            </div>
        </section></>)


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
                        <NavBar title="스테이션 정보" backLink={(`/table/stationdetail?stationId=${stationId}&role=${query.role}`)} />
                    </header>

                    <main>

                        {/* {role === "buyer" ? buyerBody : (role === "salesManager" ? salesBody : storeBody)} */}

                        <EmptySpace />

                        <div style={{
                            border: '1px solid black',
                            marginLeft: "24px",
                            marginRight: "24px",
                            borderRadius: "30px"
                        }}>
                            <SubTitle title="현재 설정" />
                            <EmptySpace />
                            {buyerBody}
                        </div>
                        <EmptySpace />

                        <SubTitle title="세일즈 방법 변경" />
                        <DescriptionText title={"현재 설정된 세일즈 방법을 변경할 수 있습니다"} />
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
                                    onChange={handleChangeValue}
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
                            ? bantoBody : ownSalesBody
                        }
                        <EmptySpace />
                        <EmptySpace />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "rows",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <FormControlLabel
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
                                        {common.getTodayYear()}년 정책에 동의합니다
                  </span>
                                }
                            />
                            <p style={{ textAlign: "right" }}>
                                <Link
                                    style={{
                                        marginRight: "24px",
                                    }}
                                    onClick={handleOpen}
                                >
                                    약관확인
                </Link>
                            </p>
                        </div>


                        <Button
                            variant="outlined"
                            onClick={async () => {

                                if (!state.checkedA) {
                                    alert("약관을 읽고 동의 해주세요")
                                    return
                                }

                                if (value === constant.salesMethod.banto) {
                                    const result = await common.updateStationSalesMethod(stationDoc, value, salesPortion, [], [])
                                    if (result.code !== 200) {
                                        alert(result.msg)
                                        return
                                    }

                                } else if (value === constant.salesMethod.ownSales) {
                                    const managersId = invitations.map((value) => value.id);

                                    const result = await common.updateStationSalesMethod(stationDoc, value, 0, managersId, invitations)
                                    if (result.code !== 200) {
                                        alert(result.msg)
                                        return
                                    }

                                }
                                alert("세일즈 방법이 변경 되었습니다")


                                props.history.push(`/table/station?role=${query.role}`);

                            }}
                            style={{
                                width: "calc(100% - 48px)",
                                height: "64px",
                                margin: "24px 24px",
                                borderRadius: "15px",
                                backgroundColor: "#000A12",
                                border: "2px solid #000A12",
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: "18px",
                                color: "white"
                            }}
                        >
                            완료
                </Button>
                        {open && (<PolicyModal url="https://bantoservice.xyz/policy" closeModal={() => { setOpen(false) }}></PolicyModal>)}

                    </main>
                    <footer></footer>
                </div>
            </Slide >
        </>
    );
}

export default StationSalesMethod;
