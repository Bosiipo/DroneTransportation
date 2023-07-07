"use strict";
const mongoose = require("mongoose");
const {
  DroneModel,
  DroneState,
} = require("../utils/constants/general");
const { Schema } = mongoose;

const DroneBatteryLogSchema = new Schema(
  {
    model: {
      type: String,
      enum: [DroneModel.LIGHT_WEIGHT, DroneModel.MIDDLE_WEIGHT, DroneModel.CRUISER_WEIGHT, DroneModel.HEAVY_WEIGHT],
      default: DroneModel.LIGHT_WEIGHT,
    },
    weightLimit: {
      type: Number,
      max: 500
    },
    unit: {
      type: String,
      default: "g"
    },
    batteryCapacity: {
      type: { type: String, default: "percentage" },
      percentage: Number,
    },
    state: {
      type: String,
      enum: [DroneState.IDLE, DroneState.LOADING, DroneState.LOADED, DroneState.DELIVERING, DroneState.DELIVERED, DroneState.RETURNING],
      default: DroneState.IDLE,
    },
    droneId: {
      type: Schema.Types.ObjectId,
      ref: "drones",
    }
  },
  {
    timestamps: true,
  }
);

DroneBatteryLogSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});

const DroneBatteryLog = mongoose.model("dronebatterylogs", DroneBatteryLogSchema);

module.exports = DroneBatteryLog;
