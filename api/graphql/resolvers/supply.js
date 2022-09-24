const SupplyServices = require("../services/supply");

class SupplyResolvers {
  supplyService;

  constructor(_db) {
    this.supplyServices = new SupplyServices(_db);
  }

  resolvers = {
    supply: async () => {
      return this.supplyServices.services.supply();
    },
  };
}

module.exports = SupplyResolvers;