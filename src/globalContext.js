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
  const [register, setRegister] = React.useState({
    phoneNumber: "",
    email: "",
    name: "",
    birthdate: "",
    bank: "",
    accountNumber: "",
    accountHolder: "",
    bBusinessLicense: false,
    businessLicenseImg: ""
  });

  const [store, setStore] = React.useState({
    storeOwnerPhoneNumber: "",
    storePhoneNumber: "",
    storeName: "",
    storeMainAddress: "",
    storeRestAddress: "",
    bBuying: false,
    bSales: false,
    salesContact: "",
    salesPortion: 0,
    bInvestor: false,
    investorContact: "",
    investorPortion: 0
  });

  const [invest, setInvest] = React.useState({
    investAmount: 0,
    totalPrice: 0,
    depositor: ""
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
  // register
  async function setRegister_phoneNumber(a) {
    await setRegister((prevState) => {
      return { ...prevState, phoneNumber: a };
    });
  }
  async function setRegister_email(a) {
    await setRegister((prevState) => {
      return { ...prevState, email: a };
    });
  }

  async function setRegister_name(a) {
    await setRegister((prevState) => {
      return { ...prevState, name: a };
    });
  }

  async function setRegister_birthdate(a) {
    await setRegister((prevState) => {
      return { ...prevState, birthdate: a };
    });
  }

  async function setRegister_bank(a) {
    await setRegister((prevState) => {
      return { ...prevState, bank: a };
    });
  }

  async function setRegister_accountNumber(a) {
    await setRegister((prevState) => {
      return { ...prevState, accountNumber: a };
    });
  }

  async function setRegister_accountHolder(a) {
    await setRegister((prevState) => {
      return { ...prevState, accountHolder: a };
    });
  }

  async function setRegister_bBusinessLicense(a) {
    await setRegister((prevState) => {
      return { ...prevState, bBusinessLicense: a };
    });
  }
  async function setRegister_businessLicenseImg(a) {
    await setRegister((prevState) => {
      return { ...prevState, businessLicenseImg: a };
    });
  }
  // store
  async function setStore_StoreOwnerPhonenumber(a) {
    await setStore((prevState) => {
      return { ...prevState, storeOwnerPhoneNumber: a };
    });
  }
  async function setStore_StorePhoneNumber(a) {
    await setStore((prevState) => {
      return { ...prevState, storePhoneNumber: a };
    });
  }
  async function setStore_StoreName(a) {
    await setStore((prevState) => {
      return { ...prevState, storeName: a };
    });
  }
  async function setStore_StoreMainAddress(a) {
    await setStore((prevState) => {
      return { ...prevState, storeMainAddress: a };
    });
  }
  async function setStore_StoreRestAddress(a) {
    await setStore((prevState) => {
      return { ...prevState, storeRestAddress: a };
    });
  }
  async function setStore_bBuying(a) {
    await setStore((prevState) => {
      return { ...prevState, bBuying: a };
    });
  }
  async function setStore_bSales(a) {
    await setStore((prevState) => {
      return { ...prevState, bSales: a };
    });
  }
  async function setStore_salesContact(a) {
    await setStore((prevState) => {
      return {
        ...prevState,
        salesContact: a
      };
    });
  }

  async function setStore_salesPortion(a) {
    await setStore((prevState) => {
      return {
        ...prevState,
        salesPortion: a
      };
    });
  }

  async function setStore_bInvestor(a) {
    await setStore((prevState) => {
      return {
        ...prevState,
        bInvestor: a
      };
    });
  }

  async function setStore_investorContact(a) {
    await setStore((prevState) => {
      return {
        ...prevState,
        investorContact: a
      };
    });
  }
  async function setStore_investorPortion(a) {
    await setStore((prevState) => {
      return {
        ...prevState,
        investorPortion: a
      };
    });
  }
  // invest

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
  // sales
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
          // getUser: userInfo,
          // setUser: setUser,
          // register
          getRegisterInfo: register,
          setRegister_email,
          setRegister_phoneNumber,
          setRegister_name,
          setRegister_birthdate,
          setRegister_bank,
          setRegister_accountNumber,
          setRegister_accountHolder,
          setRegister_bBusinessLicense,
          setRegister_businessLicenseImg,
          // invest
          getInvestInfo: invest,
          setInvest_investAmount,
          setInvest_totalPrice,
          setInvest_depositor,
          // sales
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
          setSales_InvestorPortion,
          // Store
          getStoreInfo: store,
          setStore_StoreOwnerPhonenumber,
          setStore_StorePhoneNumber,
          setStore_StoreName,
          setStore_StoreMainAddress,
          setStore_StoreRestAddress,
          setStore_bBuying,
          setStore_bSales,
          setStore_salesContact,
          setStore_salesPortion,
          setStore_bInvestor,
          setStore_investorContact,
          setStore_investorPortion
        }}
      >
        {/* <ThemeUpdateContext.Provider value={{ userNinfo, getUserNinfo }}> */}
        {children}
        {/* </ThemeUpdateContext.Provider> */}
      </GlobalContext.Provider>
    </>
  );
}
