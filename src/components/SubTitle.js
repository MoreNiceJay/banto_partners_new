import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  section: { padding: "24px 0 0 24px" }
}));
export default function SubTitle(props) {
  const classes = useStyles(props);

  return (
    <section className={classes.section}>
      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold"
        }}
      >
        {props.title}
      </p>
    </section>
  );
}