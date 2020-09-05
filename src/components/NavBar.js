import React from "react";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  backButton: {
    padding: "12px 10px 12px 20px"
  },
  backButtonImg: { width: "12px", height: "auto" },
  emptySpace: { width: "100%", height: "44px" },
  headerSpace: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "60px"
  },
  headerTitle: { marginLeft: "-44px" }
}));
export const NavBar = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <div className={classes.emptySpace} />
      <div className={classes.headerSpace}>
        <a href={props.backLink} className={classes.backButton}>
          <img
            className={classes.backButtonImg}
            src={require("../assets/img/backButton.png")}
            alt="logo"
          />
        </a>
        <span className={classes.headerTitle}>{props.title}</span>
        <span />
      </div>
    </>
  );
};
