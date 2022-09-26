import SoldTokensService from "../services/soldTokens.mjs";

class SoldTokensResolvers {
  soldTokensService;

  constructor(_db) {
    this.soldTokensService = new SoldTokensService(_db);
  }

  resolvers = {
    soldTokens: async () => {
      return this.soldTokensService.methods.soldTokens();
    },

    updateSoldTokens: async (_amount) => {
      return this.soldTokensService.methods.updateSoldTokens(_amount);
    },
  };
}

export default SoldTokensResolvers;
