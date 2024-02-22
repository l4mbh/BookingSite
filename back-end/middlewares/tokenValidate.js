const UserToken = require("../models/userToken");

exports.tokenValidate = (req, res, next) => {
  const token = req.body.userToken;

  UserToken.findOne({ token: token }).then((userToken) => {
    if (!userToken) {
      res.status(401).send({ message: "Unauthorziation, or not login !" });
    }
    next();
  });
};
