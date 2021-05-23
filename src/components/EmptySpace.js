import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    emptySpace: { width: "100%", height: "20px" }
  }));


export default function EmptySpace(props) {
    const classes = useStyles(props);
  
    return (
                 <div className={classes.emptySpace} />

    );
  }





