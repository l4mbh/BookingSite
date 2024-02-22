const User = require("../models/user");
const UserToken = require("../models/userToken");
const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");
const Room = require("../models/room");

function generateToken(n) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var token = "";
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

exports.postAdminLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username, isAdmin: true })
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "Login failed!" });
      } else if (user.password.toString() !== password) {
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
    })
    .catch((err) => {
      res.send(err);
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

exports.getStatisticData = async (req, res, next) => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); //Get last date of month, src: stackoverflow.com
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  const userCount = await User.countDocuments({ isAdmin: false });
  const transactionCount = await Transaction.countDocuments();
  const totalAmount = await Transaction.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$price" },
      },
    },
  ]);
  const avgMonthAmount = await Transaction.aggregate([
    {
      $match: {
        $and: [
          {
            dateEnd: { $lte: lastDayOfMonth.toISOString() },
          },
          {
            dateEnd: { $gte: firstDay.toISOString() },
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$price" },
      },
    },
  ]);

  const lastestTransactions = await Transaction.find()
    .sort({ dateEnd: "desc" })
    .populate("hotel")
    .limit(8);

  res.send({
    statistic: {
      user: userCount,
      transaction: transactionCount,
      totalAmount: totalAmount[0].total,
      avgMonth: Math.floor(avgMonthAmount[0].total / 12),
    },
    transactions: lastestTransactions,
  });
};

exports.getUsersList = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 8;

  try {
    const maxUser = await User.find().countDocuments();
    const usersList = await User.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ isAdmin: "desc" });

    res.send({
      maxUser: maxUser,
      users: usersList,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while getting user information!" } || error);
  }
};

exports.getHotelsList = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 8;

  try {
    const maxHotels = await Hotel.countDocuments();
    const hotelsData = await Hotel.find()
      .sort({ name: "asc" })
      .skip(perPage * page - perPage)
      .limit(perPage);

    res.send({ maxHotels, hotelsData });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while fetching hotels data !" } || error);
  }
};

exports.postDeleteHotel = async (req, res, next) => {
  const hotelId = req.body.hotelId;

  if (!hotelId) {
    res.status(400).send({ message: "Error!" });
    res.end();
  } else {
    const inTransaction = await Transaction.countDocuments({ hotel: hotelId });

    if (inTransaction > 0) {
      res.status(400).send({
        message:
          "This hotel is currently in a transaction and cannot be deleted at this time.",
      });
    } else {
      Hotel.findOneAndDelete({ _id: hotelId }).then((result) => {
        res.send({ message: "Deleted!", hotelId });
      });
    }
  }
};

exports.getRoomsList = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 8;

  try {
    const maxRooms = await Room.countDocuments();
    const roomsData = await Room.find()
      .sort({ title: "asc" })
      .skip(perPage * page - perPage)
      .limit(perPage);

    res.send({ maxRooms, roomsData });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while fetching rooms data !" } || error);
  }
};

exports.postDeleteRoom = async (req, res, next) => {
  const roomId = req.body.roomId;

  if (!roomId) {
    res.status(400).send({ message: "Error!" });
    res.end();
  } else {
    const hotelsBelongTo = await Hotel.find({ rooms: roomId });

    hotelsBelongTo.map((hotel) => {
      Transaction.findOne({ hotel: hotel._id }).then((found) => {
        if (found) {
          return res.status(400).send({
            message:
              "This room is currently in a transaction and cannot be deleted at this time.",
          });
        }
      });
    });

    if (hotelsBelongTo.length === 0) {
      Room.findOneAndDelete({ _id: roomId }).then((result) => {
        res.send({ message: "Deleted!", roomId });
      });
    }
  }
};

exports.getTransactionsList = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 8;

  try {
    const maxTransactions = await Transaction.countDocuments();
    const transactionsData = await Transaction.find()
      .populate("hotel")
      .sort({ title: "asc" })
      .skip(perPage * page - perPage)
      .limit(perPage);

    res.send({ maxTransactions, transactionsData });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while fetching transactions data !" } || error);
  }
};

exports.postAddNewHotel = (req, res, next) => {
  const hotelInfo = req.body.hotelInfo;

  const newHotel = new Hotel({
    name: hotelInfo.name,
    title: hotelInfo.title,
    address: hotelInfo.address,
    type: hotelInfo.type,
    city: hotelInfo.city,
    desc: hotelInfo.desc,
    distance: hotelInfo.desc,
    featured: hotelInfo.feature,
    photos: hotelInfo.photos,
    rooms: hotelInfo.rooms,
    rating: 0,
    cheapestPrice: hotelInfo.cheapestPrice,
  });

  newHotel
    .save()
    .then((result) => res.end())
    .catch((err) => {
      res.send(err);
    });
};

exports.getHotelsNameList = (req, res, next) => {
  Hotel.find()
    .select("name _id")
    .sort({ name: "asc" })
    .then((hotels) => {
      return hotels;
    })
    .then((hotelArray) => {
      res.send(hotelArray);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddNewRoom = (req, res, next) => {
  const { roomData, hotelId } = req.body;

  const newRoom = new Room({
    desc: roomData.desc,
    maxPeople: roomData.maxPeople,
    price: roomData.price,
    roomNumbers: roomData.roomNumbers,
    title: roomData.title,
  });

  newRoom
    .save()
    .then((room) => {
      return Hotel.findOne({ _id: hotelId }).then((hotel) => {
        let hotelRooms = hotel.rooms;
        hotelRooms = [...hotelRooms, room._id];
        hotel.rooms = hotelRooms;
        return hotel.populate("rooms").then((hotelWithRooms) => {
          // Re-assigned cheapestPrice for the hotel each time we add new room.
          const rooms = hotelWithRooms.rooms;
          rooms.sort((a, b) => a.price - b.price);
          const cheapestPrice = rooms[0].price;
          hotelWithRooms.cheapestPrice = cheapestPrice;
          hotelWithRooms
            .save()
            .then((lastestResult) => {
              return res.end();
            })
            .catch((err) => {
              return err;
            });
        });
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
