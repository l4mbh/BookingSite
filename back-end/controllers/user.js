const User = require("../models/user");
const UserToken = require("../models/userToken");
const Transaction = require("../models/transaction");

function generateToken(n) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var token = "";
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

exports.postSignupUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Username already existed!" });
    } else {
      const user = new User({
        username: username,
        password: password,
        isAdmin: false,
      });
      user
        .save()
        .then((result) => {
          res.end();
        })
        .catch((err) => {
          if (err) {
            res.status(400).send({ message: "Create new user fail !" });
          }
        });
    }
  });
};

exports.postLoginUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (!user) {
      res.status(400).send({ message: "Username not existed !" });
    } else if (user.password.toString() !== password.toString()) {
      res.status(401).send({
        message: "Username or Password is not correct, please check again !",
      });
    } else {
      UserToken.findOne({ user: user._id })
        .select("token")
        .then((token) => {
          let newToken = "";
          if (!token) {
            newToken = generateToken(24);
            const userToken = new UserToken({
              user: user._id,
              token: newToken,
            });
            userToken.save();
          } else {
            newToken = token.token;
          }
          req.user = user;
          res.send({
            user: {
              username: user.username,
              userId: user._id,
              token: newToken,
            },
          });
        });
    }
  });
};

exports.postLogout = (req, res, next) => {
  const token = req.body.userToken;
  UserToken.findOneAndDelete({ token: token })
    .then((result) => {
      res.end();
    })
    .catch((err) => {
      res.send({ message: `Logout failed with error :  ${err}` });
    });
};

exports.postCreateTransaction = (req, res, next) => {
  const transactionInfo = {
    username: req.body.username,
    hotel: req.body.hotel,
    room: req.body.room,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    price: req.body.price,
    payment: req.body.payment,
    status: req.body.status,
  };

  const newTranscation = new Transaction(transactionInfo);
  newTranscation.save();

  res.send(transactionInfo);
};

exports.getUserTransaction = (req, res, next) => {
  const username = req.query.u;

  const responseData = [];

  Transaction.find({ username: username })
    .populate("hotel")
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            "Something went wrong, cant get transactions ! ERR : " +
            err.message,
        });
    });
};
