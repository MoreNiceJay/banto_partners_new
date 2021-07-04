// message
export const messageCategory = Object.freeze({ info: "INFO" });

export const role = Object.freeze({
  sales: "salesManager",
  buyer: "buyer",
  store: "storeOwner"
});
export const dbCollection = Object.freeze({
  station: "Stations",
  contract: "Contracts",
  franchise: "Franchises",
  buyerApplication: "BuyerApplications",

});

export const contractType = Object.freeze({
  sales: "SALES",
  franchise: "FRANCHISE",
});

export const applicationStatus = Object.freeze({
  approve: "APPROVED",
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
