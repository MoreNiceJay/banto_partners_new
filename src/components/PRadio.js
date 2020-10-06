import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    "&$checked": {
      color: "black"
    }
  }
}));
export default function PTextField(props) {
  const classes = useStyles(props);
  const PRadio = withStyles({
    root: {
      color: "black",
      "&$checked": {
        color: "black"
      }
    }
  })((props) => (
    <Radio
      {...props}
      icon={<CircleUnchecked />}
      checkedIcon={<CircleCheckedFilled />}
      style={{
        color: "black",
        "&$checked": {
          color: "black"
        }
      }}
    ></Radio>
  ));
  return (
    <>
      <PRadio {...props} />
    </>
  );
}
