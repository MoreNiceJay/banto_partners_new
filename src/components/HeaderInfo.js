import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  headerInfo: { padding: "25px 0 0 32px" },
  headerTitle: { fontSize: "36px", fontWeight: "700" },
  headerDescription: { paddingTop: "16px", fontSize: "16px", color: "#000A12" }
}));
export function HeaderInfo(props) {
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.headerInfo}>
        <h5 className={classes.headerTitle}>{props.title}</h5>
        <p className={classes.headerDescription}>{props.description}</p>
      </div>
    </>
  );
}
