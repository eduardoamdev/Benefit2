const authorization = (req, res, next) => {
  if (req.headers.authorization !== process.env.PASSWORD) {
    throw new Error("Bad authorization");
  }

  next();
};

export default authorization;
