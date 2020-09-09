import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./styles.css";

import App from "./App";
import MainPage from "./views/MainPage.js";
import BatteryServiceRoll from "./views/BatteryServiceRoll.js";
/* member store */
import InvestorMenu from "./views/investorViews/InvestorMenu.js";
import InvestStart from "./views/investorViews/InvestStart.js";
import InvestFinal from "./views/investorViews/InvestFinal.js";
/* sales */
import SalesMenu from "./views/salesViews/SalesMenu.js";
import RegistContact from "./views/salesViews/RegistContact.js";
import RegistFinal from "./views/salesViews/RegistFinal.js";
import RegistAddress from "./views/salesViews/RegistAddress.js";
import RegistPortion from "./views/salesViews/RegistPortion.js";
import RegistAddInvestor from "./views/salesViews/RegistAddInvestor.js";
/* member store */
import StoreMenu from "./views/storeViews/StoreMenu.js";
import ApplyContact from "./views/storeViews/ApplyContact.js";
import ApplyAddress from "./views/storeViews/ApplyAddress.js";
import ApplyPortion from "./views/storeViews/ApplyPortion.js";
import ApplyBuy from "./views/storeViews/ApplyBuy.js";
import ApplyAddInvestorAndSales from "./views/storeViews/ApplyAddInvestorAndSales.js";
import ApplyFinal from "./views/storeViews/ApplyFinal.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
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
      <Route exact path="/investor/final" component={InvestFinal} />
      {/* slaes */}
      <Route exact path="/salesmenu" component={SalesMenu} />
      <Route exact path="/sales/regist/contact" component={RegistContact} />
      <Route exact path="/sales/regist/address" component={RegistAddress} />
      <Route exact path="/sales/regist/portion" component={RegistPortion} />
      <Route
        exact
        path="/sales/regist/add-investor"
        component={RegistAddInvestor}
      />
      <Route exact path="/sales/regist/final" component={RegistFinal} />

      {/* member store */}
      <Route exact path="/storemenu" component={StoreMenu} />
      <Route exact path="/store/apply/contact" component={ApplyContact} />
      <Route exact path="/store/apply/address" component={ApplyAddress} />
      <Route exact path="/store/apply/portion" component={ApplyPortion} />
      <Route exact path="/store/apply/buy" component={ApplyBuy} />
      <Route
        exact
        path="/store/apply/add-investor&sales"
        component={ApplyAddInvestorAndSales}
      />
      <Route exact path="/store/apply/final" component={ApplyFinal} />
    </React.StrictMode>
  </BrowserRouter>,

  rootElement
);
