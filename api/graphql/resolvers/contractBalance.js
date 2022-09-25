const ContractBalanceServices = require("../services/contractBalance");

class ContractBalanceResolvers {
  contractBalanceService;

  constructor(_db) {
    this.contractBalanceServices = new ContractBalanceServices(_db);
  }

  resolvers = {
    balance: async () => {
      return this.contractBalanceServices.services.balance();
    },

    updateBalance: async (_balance) => {
      return this.contractBalanceServices.services.updateBalance(_balance);
    },
  };
}

module.exports = ContractBalanceResolvers;
