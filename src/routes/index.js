import express from 'express';
import DroneController from '../controllers/drone.controller';

const Router = express.Router();

Router.get('/', (req, res) => {
  return res.json({
    message: 'Test Default Running'
  });
});

Router.post('/register-drone', DroneController.registerDrone);
Router.get('/drone/battery-level/:droneId', DroneController.checkDroneBatteryLevel);
Router.get('/drones-available-for-loading', DroneController.checkAvailableDronesForLoading);
Router.post('/load-drone-with-medication-items/:droneId', DroneController.loadDroneWithMedicationItems);


export default Router;
