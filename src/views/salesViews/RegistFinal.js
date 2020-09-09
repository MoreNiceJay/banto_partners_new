import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { FormButton } from "../../components/FormButton.js";

const useStyles = makeStyles((theme) => ({
  section: { padding: "55px 0 0 30px" },
  infoTitle: { fontSize: "25px", fontWeight: "700" },
  dataUnlistOrder: { margin: "5px auto", "& li ": { padding: "5px 0 5px 0" } },
  dataTitleSpan: { fontSize: "14px", fontWeight: "600" },
  dataValueSpan: { fontSize: "14px", fontWeight: "300" },
  dataLink: {
    marginLeft: "10px",
    fontSize: "14px",
    textDecoration: "underline"
  },
  checkboxLabel: { marginTop: "20px", marginRight: "25px" },
  checkbox: {},
  policyLink: {
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    verticalAlign: "middle",
    position: "absolute",
    right: "25px",
    fontSize: "14px",
    textDecoration: "underline"
  }
}));
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

function RegistFinal(props) {
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });
  function mySubmitHandler() {}
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const data = [
    { title: "매장명", data: "스타벅스 구로점", link: "#" },
    { title: "매장 연락처", data: "01099993333", link: "#" },
    { title: "점주님 연락처", data: "01099993333", link: "#" },
    {
      title: "매장 주소",
      data: "경기도 고양시 일산서구 주엽2동 문촌마을",
      link: "#"
    },
    {
      title: "가맹점 수익",
      data: "10%",
      link: "#"
    },
    {
      title: "영업 수익",
      data: "20%",
      link: "#"
    }
  ];
  return (
    <>
      <header>
        <NavBar title="" backLink="/sales/regist/add-investor" />
        <HeaderInfo
          title={"등록"}
          description="기입된 정보를 확인하고 신청 완료해주세요"
        />
      </header>
      <main>
        <section className={classes.section}>
          <h1 className={classes.infoTitle}>정보</h1>
          <ul className={classes.dataUnlistOrder}>
            {data.map((value) => {
              return (
                <li>
                  <span className={classes.dataTitleSpan}>{value.title}:</span>{" "}
                  <span className={classes.dataValueSpan}>{value.data}</span>
                  <Link className={classes.dataLink} to={value.link}>
                    수정
                  </Link>
                </li>
              );
            })}
          </ul>
          <FormControlLabel
            className={classes.checkboxLabel}
            control={
              <GreenCheckbox
                className={classes.checkbox}
                checked={state.checkedG}
                onChange={handleChange}
                name="checkedG"
              />
            }
            label="본인은 반토 2020년 하반기 정책 내용을 확인하였고 이에 동의합니다"
          />
          <div>
            <Link className={classes.policyLink} to="#">
              하반기 정책 보기
            </Link>
            <FormButton
              className={classes.infoTitle}
              onClick={() => {
                props.history.push("/salesmenu");
              }}
              title="신청 완료"
            />
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default RegistFinal;
