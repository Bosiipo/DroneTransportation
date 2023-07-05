"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const Medication = new Schema(
  {
    name: {
      type: String,
    },
    weight: {
      type: String,
    },
    image: {
      type: Number,
      max: 500
    },
    code: {
      type: String,
      // required: true,
      match: /^[A-Z0-9_]+$/,
    },
  },
  {
    timestamps: true,
  }
);

Medication.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});

module.exports.Medication = mongoose.model("Medications", Medication);
