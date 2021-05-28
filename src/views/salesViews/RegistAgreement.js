import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import DaumPostcode from "react-daum-postcode";
import Button from "@material-ui/core/Button";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import NavBar from "../../components/NavBar.js";
import { TextField } from "../../components/TextField.js";
import MTextField from "@material-ui/core/TextField";
import { FormButton } from "../../components/FormButton.js";
import { useGlobal } from "../../globalContext";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
import Modal from "@material-ui/core/Modal";

import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";

import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";

import SignaturePad from "signature_pad";


import moment from "moment";
const useStyles = makeStyles((theme) => ({
    addressContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "55px 0 0 25px"
    },
    contactPersonTitle: { fontSize: "24px", fontWeight: "700", marginBottom: "8px" },
    firstAddressWithButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    addressTextField: { width: "calc(100% - 24px)", marginTop: "10px", marginBottom: "8px" }
}));
function RegistAgreement(props) {
    const context = useGlobal();
    const auth = useAuth();

    const classes = useStyles(props);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [storeName, setStoreName] = React.useState("");
    const [mainAddress, setMainAddress] = React.useState(null);
    const [restAddress, setRestAddress] = React.useState(null);

    const [sigPadData, setSigPadData] = useState(null);
    let sigPad = null;
    const handleRestSignature = () => {
        sigPad.clear();
        setSigPadData();
    };


    useEffect(() => {
        sigPad = new SignaturePad(document.querySelector("canvas"), {
            onBegin: () => {
                setSigPadData(sigPad.toDataURL()); // data:image/png;base64,iVBORw0K...
                /**
                 * signaturePad.toDataURL(); // save image as PNG
                 * signaturePad.toDataURL("image/jpeg"); // save image as JPEG
                 * signaturePad.toDataURL("image/svg+xml"); // save image as SVG
                 * */
            }
        });
    }, []);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setMainAddress(fullAddress);
        setOpen(false);
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };
    React.useEffect(() => {
        // console.log(context.salesInfo.storeOwnerPhoneNumber);
        setStoreName(context.salesInfo.storeName);
        setMainAddress(context.salesInfo.mainAddress);
        setRestAddress(context.salesInfo.restAddress);
        // setStoreContact(context.salesInfo.storePhoneNumber);
    }, []);
    function getModalStyle() {
        return {
            top: `0px`,
            left: `0px`
        };
    }

    const onChangeStoreName = (e) => {
        setStoreName(e.target.value);
    };
    const onChangeRestAddress = (e) => {
        console.log(e.target.value);
        setRestAddress(e.target.value);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function mySubmitHandler() { }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <DaumPostcode onComplete={handleComplete} {...props} />
            <Button
                style={{ position: "absolute", marginTop: "5px", right: "5px" }}
                variant="contained"
                onClick={handleClose}
            >
                취소
      </Button>
        </div>
    );

    return (
        <>

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
                <NavBar title="" backLink="/salesmenu" />
                {/* <HeaderInfo
          title={"등록" + "\u00A0" + "\u00A0" + "\u00A0" + "1/3"}
          description="가맹점을 등록합니다"
        /> */}
            </header>
            <main style={{ width: "100%", height: "100vh" }}>
                <ProgressBreadcum title="1/4" />
                <SubTitle title="가맹점과 계약 체결" />
                <DescriptionText title={"가맹점주님께 계약 체결정보를 확인드리고 서명을 받아 계약을 완료합니다"} />
                <section>
                    <EmptySpace />
                    <EmptySpace />
                    <TextField
                        title="매장명"
                        description="예) 스타벅스 구로점"
                        // label="필수"
                        placeholder={"필수"}
                        value={storeName}
                        onChange={onChangeStoreName}
                    />
                    <div className={classes.addressContainer}>
                        <span className={classes.contactPersonTitle}>매장 주소</span>

                        <MTextField
                            className={classes.addressTextField}
                            disabled
                            id="outlined-basic"
                            inputProps={{ inputMode: "numeric" }}
                            variant="outlined"
                            value={mainAddress}
                            placeholder={"필수"}

                            onClick={handleOpen}
                            style={{ marginBottom: "8px" }}
                        />
                        <MTextField
                            className={classes.addressTextField}
                            id="outlined-basic2"
                            variant="outlined"
                            // label="*필수 나머지 주소"
                            placeholder={"필수 나머지 주소"}

                            value={restAddress}
                            onChange={onChangeRestAddress}
                        />
                    </div>


                    <EmptySpace />
                    <EmptySpace />
                    <EmptySpace />

                    <div className="Signature">
                        <canvas
                            width={100}
                            height={125}
                            style={{ border: "1px solid #cdcdcd" }}
                        />
                        <button onClick={handleRestSignature}>리셋</button>
                    </div>


                    <EmptySpace />
                    <EmptySpace />
                    <EmptySpace />
                    <EmptySpace />
                    <EmptySpace />


                    <SquareButton
                        onClick={() => {
                            console.log(storeName, mainAddress, restAddress);
                            if (!storeName || !mainAddress || !restAddress) {
                                alert("정보를 기입해주세요");
                                return;
                            }

                            context.setSales_storeName(storeName);
                            context.setSales_storeMainAddress(mainAddress);
                            context.setSales_storeRestAddress(restAddress);
                            props.history.push("/sales/regist/contact");
                        }}
                        text="다음"
                    />

                </section>
            </main>
            <footer></footer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
}

export default RegistAgreement;
