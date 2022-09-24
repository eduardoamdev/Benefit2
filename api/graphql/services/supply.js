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

      return { success: true, info: supply.supply };
    },
  };
}

module.exports = SupplyServices;
