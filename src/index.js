import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./styles.css";
import { GlobalProvider } from "./globalContext";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./AuthContext";
import App from "./App";
import MainPage from "./views/MainPage.js";
import BatteryServiceRoll from "./views/BatteryServiceRoll.js";
/* buyer */
import InvestorMenu from "./views/investorViews/InvestorMenu.js";
import InvestStart from "./views/investorViews/InvestStart.js";
import InvestDepositor from "./views/investorViews/InvestDepositor.js";
import InvestMethod from "./views/investorViews/InvestMethod.js";

import InvestFinal from "./views/investorViews/InvestFinal.js";
import InvestDone from "./views/investorViews/InvestDone.js";

/* sales */
import SalesMenu from "./views/salesViews/SalesMenu.js";
import RegistContact from "./views/salesViews/RegistContact.js";
import RegistFinal from "./views/salesViews/RegistFinal.js";
import RegistAddress from "./views/salesViews/RegistAddress.js";
import RegistPortion from "./views/salesViews/RegistPortion.js";
import RegistAgreement from "./views/salesViews/RegistAgreement.js";

import RegistAddInvestor from "./views/salesViews/RegistAddInvestor.js";
/* member store */
import StoreMenu from "./views/storeViews/StoreMenu.js";
import ApplyContact from "./views/storeViews/ApplyContact.js";
import ApplyAddress from "./views/storeViews/ApplyAddress.js";
import ApplyPortion from "./views/storeViews/ApplyPortion.js";
import ApplyBuy from "./views/storeViews/ApplyBuy.js";
import ApplyAddInvestor from "./views/storeViews/ApplyAddInvestor.js";
import ApplyFinal from "./views/storeViews/ApplyFinal.js";
import ApplyDone from "./views/storeViews/ApplyDone.js";

/* Login */
import LoginPage from "./views/loginViews/LoginPage.js";
import LoginForgotPassword from "./views/loginViews/LoginForgotPassword.js";
import RegisterFirstPage from "./views/loginViews/RegisterFirstPage.js";
import RegisterSecondPage from "./views/loginViews/RegisterSecondPage.js";
import RegisterThirdPage from "./views/loginViews/RegisterThirdPage.js";

import RegisterFourthPage from "./views/loginViews/RegisterFourthPage.js";
import RegisterFinalPage from "./views/loginViews/RegisterFinalPage.js";
import RegisterFifthPage from "./views/loginViews/RegisterFifthPage.js";
import RegisterSixthPage from "./views/loginViews/RegisterSixthPage.js";
import RegisterSeventhPage from "./views/loginViews/RegisterSeventhPage.js";
import RegisterEighthPage from "./views/loginViews/RegisterEighthPage.js";
import RegisterNinethPage from "./views/loginViews/RegisterNinethPage.js";
import RegisterTenthPage from "./views/loginViews/RegisterTenthPage.js";

// Tables
import EarningTable from "./views/EarningTable.js";
import StationTable from "./views/StationTable.js";
import StationDetail from "./views/StationDetail.js";
import StationSalesMethod from "./views/StationSalesMethod.js";

import ApplicationDetail from "./views/ApplicationDetail.js";

import ApplicationTable from "./views/ApplicationTable.js";

// myPages
import MyPage from "./views/myPage/MyPage.js";
import Message from "./views/myPage/Message.js";
import Deposit from "./views/myPage/Deposit.js";
import Settings from "./views/myPage/Settings.js";
import UserInfo from "./views/myPage/UserInfo.js";

// Settings
import AlramSettings from "./views/myPage/settings/AlarmSetting";
import CustomerCenter from "./views/myPage/settings/CustomerCenter.js";
import Notice from "./views/myPage/settings/Notice.js";
import Policies from "./views/myPage/settings/Policies.js";
import PhoneAuth from "./views/myPage/settings/PhoneAuth.js";
import InfoEdit from "./views/myPage/infoEdit/InfoEdit";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <GlobalProvider>
      <AuthProvider>
        <AnimatePresence exitBeforeEnter>
          <React.StrictMode>
            <Switch>
              <Route Z exact path="/" component={App} />
              <Route exact path="/main" component={MainPage} />
              <Route
                exact
                path="/battery-service-roll"
                component={BatteryServiceRoll}
              />
              {/* investor */}
              <Route exact path="/investormenu" component={InvestorMenu} />
              <Route exact path="/investor/invest" component={InvestStart} />

              <Route
                exact
                path="/investor/depositor"
                component={InvestDepositor}
              />
              <Route exact path="/investor/method" component={InvestMethod} />
              <Route exact path="/investor/done" component={InvestDone} />

              <Route exact path="/investor/final" component={InvestFinal} />
              {/* slaes */}
              <Route exact path="/salesmenu" component={SalesMenu} />
              <Route
                exact
                path="/sales/regist/contact"
                component={RegistContact}
              />
              <Route
                exact
                path="/sales/regist/address"
                component={RegistAddress}
              />
              <Route
                exact
                path="/sales/regist/portion"
                component={RegistPortion}
              />
              <Route
                exact
                path="/sales/regist/add-investor"
                component={RegistAddInvestor}
              />

              <Route
                exact
                path="/sales/regist/agreement"
                component={RegistAgreement}
              />
              <Route exact path="/sales/regist/final" component={RegistFinal} />

              {/* member store */}
              <Route exact path="/storemenu" component={StoreMenu} />
              <Route
                exact
                path="/store/apply/contact"
                component={ApplyContact}
              />
              <Route
                exact
                path="/store/apply/address"
                component={ApplyAddress}
              />
              <Route
                exact
                path="/store/apply/portion"
                component={ApplyPortion}
              />
              <Route exact path="/store/apply/buy" component={ApplyBuy} />
              <Route
                exact
                path="/store/apply/addinvestor"
                component={ApplyAddInvestor}
              />
              <Route exact path="/store/apply/final" component={ApplyFinal} />
              <Route exact path="/store/apply/done" component={ApplyDone} />

              {/* login */}
              <Route exact path="/login/login" component={LoginPage} />

              <Route
                exact
                path="/login/forgotpassword"
                component={LoginForgotPassword}
              />

              <Route
                exact
                path="/login/register/first"
                component={RegisterFirstPage}
              />
              <Route
                exact
                path="/login/register/second"
                component={RegisterSecondPage}
              />

              <Route
                exact
                path="/login/register/third"
                component={RegisterThirdPage}
              />

              <Route
                exact
                path="/login/register/fourth"
                component={RegisterFourthPage}
              />
              <Route
                exact
                path="/login/register/final"
                component={RegisterFinalPage}
              />
              <Route
                exact
                path="/login/register/fifth"
                component={RegisterFifthPage}
              />
              <Route
                exact
                path="/login/register/sixth"
                component={RegisterSixthPage}
              />
              <Route
                exact
                path="/login/register/seventh"
                component={RegisterSeventhPage}
              />
              <Route
                exact
                path="/login/register/eighth"
                component={RegisterEighthPage}
              />
              <Route
                exact
                path="/login/register/nineth"
                component={RegisterNinethPage}
              />
              <Route
                exact
                path="/login/register/tenth"
                component={RegisterTenthPage}
              />

              {/* Tables */}
              <Route exact path="/table/earning" component={EarningTable} />
              <Route exact path="/table/station" component={StationTable} />
              <Route
                exact
                path="/table/application"
                component={ApplicationTable}
              />
              <Route
                exact
                path="/table/stationdetail"
                component={StationDetail}
              />
              <Route
                exact
                path="/table/stationsalesmethod"
                component={StationSalesMethod}
              />

              <Route
                exact
                path="/table/applicationdetail"
                component={ApplicationDetail}
              />
              {/* Mypage */}
              <Route exact path="/mypage" component={MyPage} />
              <Route exact path="/mypage/message" component={Message} />
              <Route exact path="/mypage/deposit" component={Deposit} />
              <Route exact path="/mypage/settings" component={Settings} />
              <Route exact path="/mypage/userinfo" component={UserInfo} />

              {/* settings */}
              <Route
                exact
                path="/mypage/settings/alarmsetting"
                component={AlramSettings}
              />
              <Route
                exact
                path="/mypage/settings/customercenter"
                component={CustomerCenter}
              />
              <Route exact path="/mypage/settings/notice" component={Notice} />
              <Route
                exact
                path="/mypage/settings/policies"
                component={Policies}
              />

              {/* phoneAUth */}
              <Route
                exact
                path="/mypage/userinfo/phoneauth"
                component={PhoneAuth}
              />
              {/* infoEdit */}
              <Route exact path="/mypage/userinfo/edit" component={InfoEdit} />
            </Switch>
          </React.StrictMode>
        </AnimatePresence>
      </AuthProvider>
    </GlobalProvider>
  </BrowserRouter>,

  rootElement
);
