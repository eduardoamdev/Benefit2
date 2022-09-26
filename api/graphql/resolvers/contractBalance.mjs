import ContractBalanceService from "../services/contractBalance.mjs";

class ContractBalanceResolvers {
  contractBalanceService;

  constructor(_db) {
    this.contractBalanceService = new ContractBalanceService(_db);
  }

  resolvers = {
    balance: async () => {
      return this.contractBalanceService.methods.balance();
    },

    updateBalance: async (_balance) => {
      return this.contractBalanceService.methods.updateBalance(_balance);
    },
  };
}

export default ContractBalanceResolvers;
