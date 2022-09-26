import InitialPriceService from "../services/initialPrice.mjs";

class InitialPriceResolvers {
  initialPriceService;

  constructor(_db) {
    this.initialPriceService = new InitialPriceService(_db);
  }

  resolvers = {
    initialPrice: async () => {
      return this.initialPriceService.methods.initialPrice();
    },

    createInitialPrice: async (_price) => {
      return this.initialPriceService.methods.createInitialPrice(_price);
    },
  };
}

export default InitialPriceResolvers;
