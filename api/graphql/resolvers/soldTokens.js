const SoldTokensServices = require("../services/soldTokens");

class SoldTokensResolvers {
  soldTokensService;

  constructor(_db) {
    this.soldTokensServices = new SoldTokensServices(_db);
  }

  resolvers = {
    soldTokens: async () => {
      return this.soldTokensServices.services.soldTokens();
    },

    updateSoldTokens: async (_amount) => {
      return this.soldTokensServices.services.updateSoldTokens(_amount);
    },
  };
}

module.exports = SoldTokensResolvers;
