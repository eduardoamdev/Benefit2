const authServices = require("../services/auth");

const authResolvers = {
  signup: () => {
    return authServices.signup();
  },

  login: () => {
    return authServices.login();
  },
};

module.exports = authResolvers;
