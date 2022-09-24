const infoServices = require("../services/info");

const infoResolvers = {
  totalSupply: () => {
    return infoServices.totalSupply();
  },

  soldTokens: () => {
    return infoServices.soldTokens();
  },
};

module.exports = infoResolvers;
