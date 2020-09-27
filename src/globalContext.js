import React from "react";
const GlobalContext = React.createContext();
export function useGlobal() {
  return React.useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState({
    phoneNumber: ""
  });
  async function setUser(a) {
    await setUserInfo((prevState) => {
      return { ...prevState, phoneNumber: a };
    });
  }
  const [invest, setInvest] = React.useState({
    investAmount: 0,
    totalPrice: 0,
    depositor: "ㅇㅇㅇ"
  });
  const [salesRegisterationInfo, setSalesRegisterationInfo] = React.useState({
    storeOwnerPhoneNumber: "",
    storePhoneNumber: "",
    storeName: "",
    storeAddress: { mainAddress: "", restAddress: "" },
    storePortion: 0,
    bBuying: false,
    investor: { bInvestor: false, investorPhonenumber: "", portion: "" }
  });

  async function setInvest_investAmount(a) {
    await setInvest((prevState) => {
      return { ...prevState, investAmount: a };
    });
  }

  async function setInvest_totalPrice(a) {
    await setInvest((prevState) => {
      return { ...prevState, totalPrice: a };
    });
  }
  async function setInvest_depositor(a) {
    await setInvest((prevState) => {
      return { ...prevState, depositor: a };
    });
  }

  async function setSales_StoreOwnerPhonenumber(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeOwnerPhoneNumber: a };
    });
  }
  async function setSales_StorePhoneNumber(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storePhoneNumber: a };
    });
  }
  async function setSales_StoreName(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storeName: a };
    });
  }
  async function setSales_StoreMainAddress(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, ...(prevState.storeAddress.mainAddress = a) };
    });
  }
  async function setSales_StoreRestAddress(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, ...(prevState.storeAddress.restAddress = a) };
    });
  }
  async function setSales_StorePortion(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, storePortion: a };
    });
  }
  async function setSales_Buying(a) {
    await setSalesRegisterationInfo((prevState) => {
      return { ...prevState, bBuying: a };
    });
  }
  async function setSales_BInvestor(a) {
    await setSalesRegisterationInfo((prevState) => {
      return {
        ...prevState,
        ...(prevState.investor.bInvestor = a)
      };
    });
  }
  async function setSales_InvestorPhoneNumber(a) {
    await setSalesRegisterationInfo((prevState) => {
      return {
        ...prevState,
        ...(prevState.investor.investorPhonenumber = a)
      };
    });
  }
  async function setSales_InvestorPortion(a) {
    await setSalesRegisterationInfo((prevState) => {
      return {
        ...prevState,
        ...(prevState.investor.portion = a)
      };
    });
  }
  return (
    <>
      <GlobalContext.Provider
        value={{
          getInvestInfo: invest,
          setInvest_investAmount,
          setInvest_totalPrice,
          setInvest_depositor,
          getUser: userInfo,
          setUser: setUser,
          salesInfo: salesRegisterationInfo,
          setSales_StoreOwnerPhonenumber,
          setSales_StorePhoneNumber,
          setSales_StoreName,
          setSales_StoreMainAddress,
          setSales_StoreRestAddress,
          setSales_StorePortion,
          setSales_Buying,
          setSales_BInvestor,
          setSales_InvestorPhoneNumber,
          setSales_InvestorPortion
        }}
      >
        {/* <ThemeUpdateContext.Provider value={{ userNinfo, getUserNinfo }}> */}
        {children}
        {/* </ThemeUpdateContext.Provider> */}
      </GlobalContext.Provider>
    </>
  );
}
