class SoldTokensServices {
  db;

  constructor(_db) {
    this.db = _db;
  }

  services = {
    soldTokens: async () => {
      const soldTokens = await this.db
        .collection("info")
        .findOne({ type: "soldTokens" });

      if (!soldTokens.amount) {
        throw new Error(
          "Sold tokens has not been returned correctly to MongoDB"
        );
      }

      return {
        success: true,
        message: `${soldTokens.amount} tokens have been sold`,
      };
    },

    updateSoldTokens: async (_amount) => {
      const updatedInfo = await this.db
        .collection("info")
        .updateOne(
          { type: "soldTokens" },
          { $set: { amount: _amount.amount } },
          { upsert: true }
        );

      if (!updatedInfo.acknowledged) {
        throw new Error(
          "Sold tokens amount have not been correctly updated to MongoDB"
        );
      }

      return {
        success: true,
        message: `An amount of ${_amount.amount} sold tokens have been registered in our database`,
      };
    },
  };
}

module.exports = SoldTokensServices;
