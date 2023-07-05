"use strict";
const mongoose = require("mongoose");
const {
  DroneModel,
  DroneState,
} = require("../utils/constants/general");
const { Schema } = mongoose;

const Drone = new Schema(
  {
    serialNumber: {
      type: String,
      maxlength: 100, // Set the maximum length to 100 characters
      required: true, // Optional: Set to true if the field is required
    },
    model: {
      type: String,
      enum: [DroneModel.LIGHT_WEIGHT, DroneModel.MIDDLE_WEIGHT, DroneModel.CRUISER_WEIGHT, DroneModel.HEAVY_WEIGHT],
      default: DroneModel.LIGHT_WEIGHT,
    },
    weight: {
      type: Number,
      max: 500
    },
    unit: {
      type: String,
      default: "g"
    },
    state: {
      type: String,
      enum: [DroneState.IDLE, DroneState.LOADING, DroneState.LOADED, DroneState.DELIVERING, DroneState.DELIVERED, DroneState.RETURNING],
      default: DroneState.IDLE,
    },
  },
  {
    timestamps: true,
  }
);

Drone.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});

module.exports.Drone = mongoose.model("Drones", Drone);
