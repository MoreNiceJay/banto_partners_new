import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Alert from "../../components/Alert";
import { useAuth } from "../../AuthContext";
const useStyles = makeStyles((theme) => ({}));
function ApplyBuy(props) {
  const classes = useStyles(props);
  const auth = useAuth();

  return <>ApplyBuy</>;
}

export default ApplyBuy;
