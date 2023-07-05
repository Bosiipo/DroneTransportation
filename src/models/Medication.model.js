"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicationSchema = new Schema(
  {
    name: {
      type: String,
    },
    weight: {
      type: Number
    },
    image: {
      type: String
    },
    code: {
      type: String,
      match: /^[A-Z0-9_]+$/,
    },
    droneId: {
      type: Schema.Types.ObjectId,
      ref: "drones",
    },
  },
  {
    timestamps: true,
  }
);

MedicationSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});

const Medication = mongoose.model("medications", MedicationSchema);

module.exports = Medication;

