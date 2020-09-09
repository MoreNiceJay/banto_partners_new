import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { HeaderInfo } from "../../components/HeaderInfo.js";
import { NavBar } from "../../components/NavBar.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
const useStyles = makeStyles((theme) => ({
  contact: { padding: "0px 0 0 25px" },
  contactPerson: { display: "flex", flexDirection: "column" },
  contactTexts: {
    display: "flex",
    flexDirection: "rows",
    alignItems: "baseline"
  },
  contactPersonTitle: { fontSize: "25px", fontWeight: "700" },
  contactPersonDescription: {
    fontSize: "14px",
    color: "#6f6f6f",
    paddingLeft: "10px"
  },
  contactPersonTextField: { marginTop: "10px", width: "calc(100% - 25px)" },
  nextButton: {
    fontSize: "25px",
    fontWeight: "700",
    borderRadius: "0",
    border: "none",
    marginTop: "40px",
    position: "absolute",
    padding: "0 25px",
    right: "0px",
    display: "block",
    margin: "0 auto"
  },
  radioButtonGroup: { padding: "30px 30px 0 30px " },

  consentInvestor: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "black"
  }
}));
function RegistAddInvestor(props) {
  const classes = useStyles(props);
  function mySubmitHandler() {}
  const [value, setValue] = React.useState("worst");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "best") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else if (value === "worst") {
      setHelperText("You got it!");
      setError(false);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  const body = (
    <>
      {/* <hr style={{ borderStyle: "dotted", marginBottom: "20px" }} /> */}
      <div className={classes.contact}>
        <div className={classes.contactPerson}>
          <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>투자자 연락처</span>
            <span className={classes.contactPersonDescription}>
              (파트너스에 등록된 전화번호)
            </span>
          </div>
          <TextField
            className={classes.contactPersonTextField}
            id="outlined-basic"
            inputProps={{ inputMode: "numeric" }}
            label="*필수"
            variant="outlined"
          />
        </div>
        <div className={classes.contactPerson} style={{ marginTop: "40px" }}>
          <div className={classes.contactTexts}>
            <span className={classes.contactPersonTitle}>약속된 수익률</span>
            <span className={classes.contactPersonDescription}>
              투자자가 <span style={{ fontWeight: "700" }}> 알림함</span>
              에서 확인합니다
            </span>
          </div>
          <TextField
            className={classes.contactPersonTextField}
            id="outlined-basic"
            inputProps={{ inputMode: "numeric" }}
            variant="outlined"
          />{" "}
        </div>
      </div>
    </>
  );
  return (
    <>
      <header>
        <NavBar title="" backLink="/sales/regist/portion" />
        <HeaderInfo
          title={"투자자 입력하기"}
          description="투자자와 직접 협의하여 영업 수익률을 조절할 수 있습니다"
        />
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className={classes.radioButtonGroup}>
            <FormControl
              component="fieldset"
              error={error}
              className={classes.formControl}
            >
              <FormLabel component="legend" className={classes.consentInvestor}>
                협의된 투자자가 있으신가요?
              </FormLabel>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="worst"
                  control={<Radio />}
                  label="아니요. 없습니다"
                  checked={value === "worst"}
                />
                <FormControlLabel
                  value="best"
                  control={<Radio color="primary" />}
                  label="네. 있습니다"
                />
              </RadioGroup>
              <FormHelperText>{helperText}</FormHelperText>
              {/* <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Check Answer
            </Button> */}
            </FormControl>
          </div>
          {value === "worst" ? "" : body}

          <Button
            className={classes.nextButton}
            size="large"
            variant="outlined"
            type="submit"
            style={{ marginBottom: "40px" }}
            onClick={() => {
              props.history.push("/sales/regist/final");
            }}
          >
            다음
          </Button>
        </form>
      </main>
      <footer></footer>
    </>
  );
}

export default RegistAddInvestor;
