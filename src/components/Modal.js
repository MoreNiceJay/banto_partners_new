import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "90%",
        backgroundColor: "white",
        border: '2px solid #000',
        height: "400px",
        display: "flex",
        flexDirection: "column"

        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
}));
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top + 20}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function PolicyModal(props) {
    const classes = useStyles(props);
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <div style={modalStyle} className={classes.paper}>
            {props.children}
            <Button
                style={{ backgroundColor: "black", color: "white", marginTop: "5%", marginLeft: "10px", marginRight: "10px", marginBottom: "5px" }}
                // variant="contained"
                onClick={props.closeModal}
            >
                확인
      </Button>

        </div>
    );
}
export default PolicyModal;
