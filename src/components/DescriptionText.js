

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    description: {
        textAlign: "left",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        marginTop: "16px",
        marginLeft:"24px",
        marginRight:"24px",
        color:"black",
        lineHeight: "150%"
        
      },
}));
export default function DescriptionText(props) {
  const classes = useStyles(props);

  return (
      <p className={classes.description}>
               
              
        {props.title}
      </p>
  );
}