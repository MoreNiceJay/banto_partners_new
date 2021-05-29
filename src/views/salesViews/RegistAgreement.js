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
// import Modal from "@material-ui/core/Modal";
import * as common from "../../common"
import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";
import firebase from "../../firebaseConfig";

import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";
import PolicyModal from "../../components/PolicyModal"
import Modal from "../../components/Modal"

import { Link } from "react-router-dom";



// import SignaturePad from "signature_pad";
import SignaturePad from "react-signature-canvas";
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
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
    , sigatureCanvas: {
        width: "100%",
        height: "100%"
    }
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
    const [signatureOpen, setSignatureOpen] = React.useState(false);

    const [imageURL, setImageURl] = useState(null);
    const sigCanvas = React.useRef({});
    const clear = () => sigCanvas.current.clear();
    const save = async () => {
        await setImageURl(sigCanvas.current.getTrimmedCanvas().toDataURL("image/jpg"));
    }





    function getModalStyle() {
        return {
            top: `0px`,
            left: `0px`
        };
    }



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // uploadToStorage(imageURL)

        setOpen(false);
    };

    const signatureBody = (<><DescriptionText title={"위 사항에 대해 충분히 이해했습니다"} />
        <div style={{ width: "calc(100% - 48px", margin: "auto" }} >

            <div style={{
                width: "100%",
                border: "1px dashed #666",
                height: "100px",

            }}>
                <SignaturePad
                    ref={sigCanvas}
                    backgroundColor="white"
                    // className={classes.sigatureCanvas}
                    canvasProps={{
                        // width: "200%",
                        // height: "200%",
                        className: "signatureCanvas"
                    }}

                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button style={{ backgroundColor: "white" }} onClick={clear}>지우기</button>
                    <button style={{ backgroundColor: "black", color: "white" }} onClick={save}>저장</button>
                </div>
                {/* <button onClick={undo}>Undo</button> */}
            </div>
            {imageURL ? (
                <img
                    src={imageURL}
                    alt="Sign"
                    style={{
                        display: "hidden",
                        width: "0px",
                        minHeight: "0px",
                    }}
                />
            ) : null}
            {imageURL ? (<p style={{ marginTop: "32px", textAlign: "center" }}>완료</p>) : (<p style={{ marginTop: "32px", textAlign: "center" }}>서명 후 저장을 눌러주세요</p>)}
        </div></>
    )



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
                            window.location.href("/login/login");
                        }}
                    ></Alert>
                </>
            )}
            <header>
                <NavBar title="" backLink="/sales/regist/add-investor" />
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
                    <SubTitle title="확인 사항" />
                    <DescriptionText title={"가맹점주님께  확인 드려야할 사항입니다"} />
                    <ul style={{
                        display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", height: "280px", marginLeft: "24px", marginRight: "24px", marginTop: "24px", lineHeight: "130%"
                    }} >
                        <li style={{
                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}> <CheckCircleOutlineIcon style={{ color: "green", fontSize: "28px" }} /><span> 가맹점주님이 받으실 수익은 0% 입니다</span></li>
                        <li style={{
                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}> <CheckCircleOutlineIcon style={{ color: "green", fontSize: "28px" }} /><span> 계약 기간은 2년 입니다</span></li>
                        <li style={{
                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}> <CheckCircleOutlineIcon style={{ color: "green", fontSize: "28px" }} /><span> 수익은 파트너스앱을 통해 확인 할 수 있습니다</span></li>
                        <li style={{
                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}> <CheckCircleOutlineIcon style={{ color: "green", fontSize: "28px" }} /> <span>정산은 매월 15일날 등록하신 계좌로 입금 됩니다</span></li>
                        <li style={{
                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}> <CheckCircleOutlineIcon style={{ color: "green", fontSize: "28px" }} /><span> 정책에 따라 스테이션은 회수 될 수 있습니다</span></li>
                        <li style={{
                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}> <CheckCircleOutlineIcon style={{ color: "green", fontSize: "28px" }} /><span> {common.getTodayYear()}년 하반기 가맹점 정책사항에 동의 합니다 </span></li>


                    </ul>


                    <p style={{ textAlign: "right", }}>
                        <Link
                            onClick={handleOpen}
                            style={{
                                marginRight: "24px",
                                textDecoration: "underline"
                            }}
                        >
                            약관확인
                    </Link>
                    </p>
                    <EmptySpace />
                    <EmptySpace />


                    <EmptySpace />
                    <SubTitle title="가맹점주님 서명" />


                    <button onClick={() => {
                        setSignatureOpen(true)
                    }}>서명하기</button>


                    <EmptySpace />
                    <EmptySpace />



                    <SquareButton
                        onClick={async () => {
                            if (!imageURL) {
                                alert("서명이 필요합니다. 서명하기를 눌러주세요")
                                return
                            }
                            // props.history.push("/sales/regist/final")
                            window.location.href = "/sales/regist/final"

                            // console.log(storeName, mainAddress, restAddress);
                            // if (!storeName || !mainAddress || !restAddress) {
                            //     alert("정보를 기입해주세요");
                            //     return;
                            // }



                        }}
                        text="다음"
                    />

                </section>
            </main>

            <footer>


            </footer>
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal> */}
            {open && (<PolicyModal url="https://bantoservice.xyz/policy" closeModal={() => { setOpen(false) }}></PolicyModal>)}
            {signatureOpen && (<Modal closeModal={() => {
                if (!imageURL) {
                    alert("서명이 필요합니다. 저장을 눌러주세요")
                    return
                }
                // // Base64 formatted string
                // var message = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
                // common.storage.ref().putString(message, 'base64').then(function (snapshot) {
                //     console.log('Uploaded a base64 string!');
                // });
                var uploadTask = common.storage.ref().child('sign/name.jpg').putString(imageURL, 'data_url')

                uploadTask.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                    // Handle unsuccessful uploads
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
                        console.log('File available at', downloadURL);
                        context.setSales_storeOwnerSignature(downloadURL)
                        alert(downloadURL)
                        return await context.setSales_storeOwnerSignature(downloadURL)

                    }).then(() => {
                        console.log(context.salesInfo.storeOwnerSignature)
                        // window.location.href = "/sales/regist/final"

                    })


                });



                setSignatureOpen(false)
            }}><div>{signatureBody}</div></Modal>
            )}

        </>
    );
}

export default RegistAgreement;
