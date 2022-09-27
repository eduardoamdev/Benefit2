class SupplyService {
  db;

  constructor(_db) {
    this.db = _db;
  }

  methods = {
    supply: async () => {
      const supply = await this.db
        .collection("info")
        .findOne({ type: "supply" });

      if (!supply.supply) {
        throw new Error("Supply has not been returned correctly to MongoDB");
      }

      return {
        success: true,
        message: `Contract supply is: ${supply.supply}`,
        info: supply.supply,
      };
    },

    createSupply: async (_supply) => {
      const creationInfo = await this.db
        .collection("info")
        .insertOne({ type: "supply", supply: _supply.supply });

      if (!creationInfo.insertedId) {
        throw new Error("Supply has not been injected correctly to MongoDB");
      }

      return {
        success: true,
        message: `A supply of ${_supply.supply} has been inserted`,
        info: _supply.supply,
      };
    },
  };
}

export default SupplyService;
