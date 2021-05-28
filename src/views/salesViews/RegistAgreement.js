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
import * as common from "../../common"
import ProgressBreadcum from "../../components/ProgressBreadcum"
import SubTitle from "../../components/SubTitle";
import EmptySpace from "../../components/EmptySpace";
import firebase from "../../firebaseConfig";

import DescriptionText from "../../components/DescriptionText";
import SquareButton from "../../components/SquareButton.js";

// import SignaturePad from "signature_pad";
import SignaturePad from "react-signature-canvas";


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

    const [imageURL, setImageURl] = useState(null);
    const sigCanvas = React.useRef({});
    const clear = () => sigCanvas.current.clear();
    const save = () => {
        setImageURl(sigCanvas.current.getTrimmedCanvas().toDataURL("image/jpg"));


        // Upload file and metadata to the object 'images/mountains.jpg'
        // var uploadTask = storageRef.child('images/' + "hello").put(imageURL, metadata);

        console.log(imageURL)

    }
    // var getFileBlob = function (url, cb) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", url);
    //     xhr.responseType = "blob";
    //     xhr.addEventListener('load', function () {
    //         cb(xhr.response);
    //     });
    //     xhr.send();
    // };
    // var uploadToStorage = (imageURL) => {
    //     try {
    //         getFileBlob(imageURL, blob => {
    //             common.storage.ref().put(blob).then(function (snapshot) {
    //                 console.log('Uploaded a blob or file!');
    //             })
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


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
        // uploadToStorage(imageURL)

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
                            props.history.push("/sales/regist/add-investor");
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
                    <div style={{ width: "calc(100% - 48px", margin: "auto" }} >
                        <h3>가맹점주님 서명</h3>
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
                            <button onClick={clear}>다시 사인</button>
                            <button onClick={save}>Save</button>
                            {/* <button onClick={undo}>Undo</button> */}
                        </div>
                        {console.log("imageURL", imageURL)}
                        {imageURL ? (
                            <img
                                src={imageURL}
                                alt="Sign"
                                style={{
                                    display: "block",
                                    width: "150px",
                                    minHeight: "50px",
                                    border: "1px solid #000"
                                }}
                            />
                        ) : null}
                    </div>

                    <EmptySpace />



                    <SquareButton
                        onClick={async () => {
                            save()
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
                                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                    console.log('File available at', downloadURL);
                                });
                            });
                            console.log(storeName, mainAddress, restAddress);
                            if (!storeName || !mainAddress || !restAddress) {
                                alert("정보를 기입해주세요");
                                return;
                            }

                            context.setSales_storeName(storeName);
                            context.setSales_storeMainAddress(mainAddress);
                            context.setSales_storeRestAddress(restAddress);
                            props.history.push("/sales/regist/final");
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
