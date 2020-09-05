import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  headerInfo: { padding: "25px 0 0 30px" },
  headerTitle: { fontSize: "30px", fontWeight: "700" },
  headerDescription: { paddingTop: "10px", fontSize: "14px", color: "#6f6f6f" }
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
