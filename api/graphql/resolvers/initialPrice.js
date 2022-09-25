const InitialPriceServices = require("../services/initialPrice");

class InitialPriceResolvers {
  initialPriceService;

  constructor(_db) {
    this.initialPriceServices = new InitialPriceServices(_db);
  }

  resolvers = {
    initialPrice: async () => {
      return this.initialPriceServices.services.initialPrice();
    },

    createInitialPrice: async (_price) => {
      return this.initialPriceServices.services.createInitialPrice(_price);
    },
  };
}

module.exports = InitialPriceResolvers;
