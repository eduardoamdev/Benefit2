import SupplyService from "../services/supply.mjs";

class SupplyResolvers {
  supplyService;

  constructor(_db) {
    this.supplyService = new SupplyService(_db);
  }

  resolvers = {
    supply: async () => {
      return this.supplyService.methods.supply();
    },

    createSupply: async (_supply) => {
      return this.supplyService.methods.createSupply(_supply);
    },
  };
}

export default SupplyResolvers;
