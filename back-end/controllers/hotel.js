const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const DateFns = require("date-fns");

// Models
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

exports.getHotelsByCity = (req, res, next) => {
  Hotel.find()
    .select("city")
    .then((result) => {
      let response = {
        "Ha Noi": 0,
        "Ho Chi Minh": 0,
        "Da Nang": 0,
      };
      // Count hotels for each city ( count result[item.city] )
      result.forEach((item) => {
        response[item.city] = (response[item.city] || 0) + 1;
      });

      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPropertyType = (req, res, next) => {
  Hotel.find()
    .select("type")
    .then((result) => {
      let response = {
        hotel: 0,
        apartment: 0,
        resort: 0,
        vailla: 0,
        cabin: 0,
      };
      // Count hotels for each type ( count result[item.type] )
      result.forEach((item) => {
        response[item.type] = (response[item.type] || 0) + 1;
      });

      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTopRate = (req, res, next) => {
  Hotel.find()
    .select("name cheapestPrice city type photos")
    .sort({ rating: "desc" })
    .then((result) => {
      res.send(result.slice(0, 3));
    })
    .catch((err) => console.log(err));
};

exports.getHotelDetail = (req, res, next) => {
  const hotelId = req.params.id;

  if (!hotelId) {
    res.status(400).send({ message: "No hotelId found !" });
  } else {
    Hotel.findOne({ _id: hotelId })
      .populate("rooms")
      .exec()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send({ message: err });
      });
  }
};

exports.postSearchHotels = (req, res, next) => {
  const searchData = req.body;

  const searchLocation = searchData.location;
  const startDate = new Date(searchData.startDate);
  const endDate = new Date(searchData.endDate);
  const rooms = searchData.rooms;

  const searchingDateRange = {
    start: new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    ),
    end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
  };
  // Get list of Hotels by user search input
  Hotel.find({ city: { $regex: searchLocation.toLowerCase(), $options: "i" } })
    .populate("rooms")
    .exec()
    .then(async (result) => {
      for (const hotel of result) {
        // Check if hotel have enough rooms , if not  remvoe from result.
        const hotelRoomList = hotel.rooms
          .map((room) => room.roomNumbers)
          .flat();
        if (hotelRoomList.length < rooms) {
          const hotelIndex = result.indexOf(hotel);
          result.splice(hotelIndex, 1);
        }
        // Check if any hotel in list is "booked | checkedin"
        const bookedHotels = await Transaction.find({
          $and: [{ hotel: hotel._id }, { status: { $ne: "checkedout" } }],
        }).populate("hotel");
        // Then check if booked hotel dateRange is overlapped with searching dateRange
        if (bookedHotels.length > 0) {
          for(const bookedHotel of bookedHotels) {
            const bookedStartDate = new Date(bookedHotel.dateStart);
            const bookedEndDate = new Date(bookedHotel.dateEnd);
            const bookedTransactionDateRange = {
              start: new Date(
                bookedStartDate.getFullYear(),
                bookedStartDate.getMonth(),
                bookedStartDate.getDate()
              ),
              end: new Date(
                bookedEndDate.getFullYear(),
                bookedEndDate.getMonth(),
                bookedEndDate.getDate()
              ),
            };
            const isOverlapped = DateFns.areIntervalsOverlapping(
              searchingDateRange,
              bookedTransactionDateRange
            );
            // If dateRange is overlapping , check if any rooms remaining empty or not
            // If room(s) is reserved on overlapped dateRange, return remaining  rooms.
            if (isOverlapped) {
              const hotelRoomList = hotel.rooms
                .map((room) => room.roomNumbers)
                .flat();
              const bookedRooms = bookedHotel.room;
              for(const room of bookedRooms) {
                if(hotelRoomList.includes(room)) {
                  const roomIndex = hotelRoomList.indexOf(room);
                  hotelRoomList.splice(roomIndex,1);
                }
              }
            }
          };
        }
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json({ message: "Something went wrong !" });
    });
};

exports.postSearchRemainRooms = async (req, res, next) => {
  const hotelId = req.body.hotelId;
  const dateStart = new Date(req.body.dateStart);
  const dateEnd = new Date(req.body.dateEnd);

  const searchingDateRange = {
    start: new Date(
      dateStart.getFullYear(),
      dateStart.getMonth(),
      dateStart.getDate()
    ),
    end: new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate()),
  };

  const overlapBookedHotelRooms = [];
  let flag = false;

  const bookedHotels = await Transaction.find({
    $and: [{ hotel: hotelId }, { status: { $ne: "checkedout" } }],
  })
    .populate("hotel")
    .catch((err) => {
      res.status(500).send({ message: "Cant not get hotel rooms" });
    });

  for (const bookedHotel of bookedHotels) {
    const bookedStartDate = new Date(bookedHotel.dateStart);
    const bookedEndDate = new Date(bookedHotel.dateEnd);
    const bookedTransactionDateRange = {
      start: new Date(bookedStartDate),
      end: new Date(
        bookedEndDate.getFullYear(),
        bookedEndDate.getMonth(),
        bookedEndDate.getDate()
      ),
    };
    const isOverlapped = DateFns.areIntervalsOverlapping(
      searchingDateRange,
      bookedTransactionDateRange
    );

    // Check overlaped dateRange and push all overlapping rooms into one array;
    if (isOverlapped) {
      flag = true;
      overlapBookedHotelRooms.push(...bookedHotel.room);
    }
  }

  if (overlapBookedHotelRooms.length > 0) {
    const hotelData = await Hotel.findOne({ _id: hotelId }).populate("rooms");

    const bookedRooms = overlapBookedHotelRooms;

    // Checked if any rooms is remaining then return new hotel data with only remaining rooms (removed reserved rooms);
    hotelData.rooms.map((room) => {
      room.roomNumbers.map((number) => {
        if (bookedRooms.includes(number)) {
          const numberIndex = room.roomNumbers.indexOf(number);
          room.roomNumbers.splice(numberIndex, 1);
        }
      });
    });

    for (const room of hotelData.rooms) {
      // If that room have no more roomNumbers, either remove from hotel data;
      if (room.roomNumbers.length === 0) {
        const roomIndex = hotelData.rooms.indexOf(room);
        hotelData.rooms.splice(roomIndex, 1);
      }
    }

    res.send(hotelData);
  }

  if (!flag) {
    Hotel.findOne({ _id: hotelId })
      .populate("rooms")
      .exec()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send({ message: err });
      });
  }
};
