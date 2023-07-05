/* eslint-disable node/no-unsupported-features/es-syntax */
import Drone from '../models/Drone.model';
import Medication from '../models/Medication.model';
import { DroneState } from '../utils/constants/general';
import mongoose from 'mongoose';


class DroneController {
  static async registerDrone(req, res) {
    try {
      console.log("BEGIN!");
      const { serialNumber, model, weight, percentage, state } = req.body;
      let batteryCapacity = {
        percentage
      };

      const existingDrone = await Drone.findOne({serialNumber});

      if (existingDrone) {
        throw new Error('Drone with serial number already exists!');
      }

      let dronePayload = {
        serialNumber, 
        model, 
        weight, 
        batteryCapacity, 
        state
      };

      let drone = new Drone(dronePayload);
      drone = await drone.save();
 
      return res.status(201).json({
        status: 'success',
        message: 'Drone Created',
        drone
      });
    } catch (err) {
      console.log({err})
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async checkDroneBatteryLevel(req, res) {
    try {
      const { droneId } = req.params;

      let drone = await Drone.findById(droneId);

      if(!drone) throw new Error("Drone not found!");

      return res.status(200).json({
        status: 'success',
        batteryLevel: `${drone.batteryCapacity.percentage}%` 
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async checkAvailableDronesForLoading(req, res) {
    try {
      let availableDronesForLoading = await Drone.find({
        state: DroneState.LOADING
      });

      console.log({availableDronesForLoading});

      return res.status(200).json({
        status: 'success',
        drones: availableDronesForLoading
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }

  static async loadDroneWithMedicationItems(req, res) {
    try {
      const { droneId } = req.params;

      let medications = req.body.medications;

      let drone = await Drone.findById(droneId);

      if(!drone) throw new Error("Drone not found!");

      let medicationTotalWeight = medications.reduce((a,b) => a + b.weight, 0);

      if (medicationTotalWeight > drone.weightLimit) {
        throw new Error("Medication total weight is more than drone's weight limit of 500g")
      }

      medications = medications.map(med => ({
        ...med,
        droneId: mongoose.Types.ObjectId(droneId)
      }));

      let uploadedMedications = await Medication.insertMany(medications);
      await Drone.findByIdAndUpdate(droneId, {
        status: DroneState.LOADED,
      });

      return res.status(200).json({
        status: 'success',
        medications: uploadedMedications
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  }
}

export default DroneController;
