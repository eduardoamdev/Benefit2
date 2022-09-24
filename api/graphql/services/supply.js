class SupplyServices {
  db;

  constructor(_db) {
    this.db = _db;
  }

  services = {
    supply: async () => {
      const supply = await this.db
        .collection("info")
        .findOne({ type: "supply" });

      return {
        success: true,
        message: `Contract supply is: ${supply.supply}`,
      };
    },

    createSupply: async (_supply) => {
      await this.db
        .collection("info")
        .insertOne({ type: "supply", supply: _supply.supply });

      return {
        success: true,
        message: `A supply of ${_supply.supply} has been inserted`,
      };
    },
  };
}

module.exports = SupplyServices;
