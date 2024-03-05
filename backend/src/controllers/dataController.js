const Data = require("../models/analyticsData");
const mongoose = require("mongoose");

const MAX_LIMIT = 50;

exports.getData = async (req, res) => {
  try {
    // const filters = req.query;
    // const filterObject = {};
    // for (const key in filters) {
    //     if (filters.hasOwnProperty(key)) {
    //         filterObject[key] = filters[key];
    //     }
    // }

    const data = await Data.find({}).limit(MAX_LIMIT);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getData = async (req, res) => {
//   try {
//     const data = await Data.find({});
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getData = async (req, res) => {
//   try {
//     console.log("Fetching data...");
//     const data = await Data.find({});
//     console.log("Data fetched:", data);
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.addData = async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getDataById = async (req, res) => {
//   try {
//     const data = await Data.findById(req.params.id);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getDataById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const data = await Data.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateData = async (req, res) => {
  try {
    const data = await Data.findByIdAndUpdate(req.params.id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
