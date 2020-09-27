import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

const useStyles = makeStyles((theme) => ({}));
const CBottomNavigation = (props) => {
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);

  return (
    <>
      <BottomNavigation
        style={{
          position: "fixed",
          bottom: "32px",
          left: "32px",
          right: "32px",
          backgroundColor: "#000A12",
          borderRadius: "23px",
          boxShadow: "0px -8px 18px rgba(0, 10, 18, 0.3)"
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          style={{
            color: value === 0 ? "white" : "#263238",
            fontSize: "10px",
            fontFamily: "SF Pro Text"
          }}
          label="홈"
          icon={
            value === 0 ? (
              <img
                style={{ width: "28px", height: "28px" }}
                src={require("../assets/img/home - emphasis.png")}
                alt="logo"
              />
            ) : (
              <img
                style={{ width: "28px", height: "28px" }}
                src={require("../assets/img/home - nonemphasis.png")}
                alt="logo"
              />
            )
          }
        />
        <BottomNavigationAction
          style={{
            color: value === 1 ? "white" : "#263238",
            fontSize: "10px",
            fontFamily: "SF Pro Text"
          }}
          label="알림"
          icon={
            value === 1 ? (
              <img
                style={{ width: "28px", height: "28px" }}
                src={require("../assets/img/alarm - emphasis.png")}
                alt="logo"
              />
            ) : (
              <img
                style={{ width: "28px", height: "28px" }}
                src={require("../assets/img/alarm - nonemphasis.png")}
                alt="logo"
              />
            )
          }
        />
        <BottomNavigationAction
          style={{
            color: value === 2 ? "white" : "#263238",
            fontSize: "10px",
            fontFamily: "SF Pro Text"
          }}
          label="마이페이지"
          icon={
            value === 2 ? (
              <img
                style={{ width: "28px", height: "28px" }}
                src={require("../assets/img/my - emphasis.png")}
                alt="logo"
              />
            ) : (
              <img
                style={{ width: "28px", height: "28px" }}
                src={require("../assets/img/my - nonemphasis.png")}
                alt="logo"
              />
            )
          }
        />
      </BottomNavigation>
    </>
  );
};
export default CBottomNavigation;
