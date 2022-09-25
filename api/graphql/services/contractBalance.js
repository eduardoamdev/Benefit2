class ContractBalanceServices {
  db;

  constructor(_db) {
    this.db = _db;
  }

  services = {
    balance: async () => {
      const balance = await this.db
        .collection("info")
        .findOne({ type: "contractBalance" });

      if (!balance.balance) {
        throw new Error(
          "Sold tokens has not been returned correctly to MongoDB"
        );
      }

      return {
        success: true,
        message: `The balance of our Benefit contract is ${balance.balance} MATIC`,
      };
    },

    updateBalance: async (_balance) => {
      const updatedInfo = await this.db
        .collection("info")
        .updateOne(
          { type: "contractBalance" },
          { $set: { balance: _balance.balance } },
          { upsert: true }
        );

      if (!updatedInfo.acknowledged) {
        throw new Error(
          "Contract balance have not been correctly updated to MongoDB"
        );
      }

      return {
        success: true,
        message: `A contract balance of ${_balance.balance} have been registered in our database`,
      };
    },
  };
}

module.exports = ContractBalanceServices;
