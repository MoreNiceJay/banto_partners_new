import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: "16px"
    }
  }
}));
export default function PTextField(props) {
  const classes = useStyles(props);

  const Talert = withStyles({
    // root: {
    // disabledButton: {
    //   border: "2px solid red"
    // }
    // }
    //   color: "black",
    //   "&$checked": {
    //     color: "black"
    //   }
    // },
    // checked: {
    //   color: "black"
    // }
  })((props) => (
    <Alert severity={props.type} {...props}>
      <AlertTitle>{props.title}</AlertTitle>
      {props.description}—
      <strong>
        <Link onClick={props.onClick}>{props.actionDescription}</Link>
      </strong>
    </Alert>
  ));
  return <Talert {...props} />;
}
