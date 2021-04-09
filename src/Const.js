// message
export const messageCategory = Object.freeze({ info: "INFO" });

export const role = Object.freeze({
  sales: "SALES",
  buyer: "BUYER",
  store: "STORE"
});
export const dbCollection = Object.freeze({
  station: "Stations",
  franchise: "Franchises",
  buyerApplication: "BuyerApplications",
  salesApplication: "SalesApplications",
  storeApplication: "StoreApplications"
});

export const applicationStatus = Object.freeze({
  approve: "APPROVE",
  waiting: "WAITING",
  rejected: "REJECTED"
});

export const buyerStatus = Object.freeze({
  noBuyer: "noBuyer",
  otherBuyer: "otherBuyer",
  ownBuyer: "ownBuyer"
});
export const salesMethod = Object.freeze({
  banto: "banto",
  ownSales: "ownSales",
  yet: "yet"
});
export const urls = Object.freeze({
  domain: "https://partners.mulli.world"
});

export const exampleUserId = Object.freeze("a1111");
