class InitialPriceService {
  db;

  constructor(_db) {
    this.db = _db;
  }

  methods = {
    initialPrice: async () => {
      const initialPrice = await this.db
        .collection("info")
        .findOne({ type: "initialPrice" });

      if (!initialPrice.price) {
        throw new Error(
          "Initial price has not been returned correctly to MongoDB"
        );
      }

      return {
        success: true,
        message: `The initial price of the token is ${initialPrice.price}`,
        info: initialPrice.price,
      };
    },

    createInitialPrice: async (_price) => {
      const creationInfo = await this.db
        .collection("info")
        .insertOne({ type: "initialPrice", price: _price.price });

      if (!creationInfo.insertedId) {
        throw new Error(
          "Initial token price has not been injected correctly to MongoDB"
        );
      }

      return {
        success: true,
        message: `A initial token price of ${_price.price} has been inserted`,
        info: _price.price,
      };
    },
  };
}

export default InitialPriceService;
