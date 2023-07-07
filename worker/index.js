const { default: mongoose } = require("mongoose");
const Drone = require("../src/models/Drone.model");
const DroneBatteryLog = require("../src/models/DroneBatteryLogs.model");
const {
  connectMongoose
} = require("../src/utils/database/mongoose");
const { DroneState } = require("../src/utils/constants/general");


const updateDroneState = async () => {
  try {
    try {
      console.log("Trying to connect MongoDB......");
      // eslint-disable-next-line global-require
      await connectMongoose();
    } catch (e) {
      console.error(e);
      console.error("Error In Connecting to MongoDB");
      process.exit();
    }

    let droneCursor = Drone.find({}).cursor();
    for await (const drone of droneCursor) {

      if(drone.batteryCapacity.percentage < 25){
        await Drone.findByIdAndUpdate(drone._id, {
          state: DroneState.IDLE
        });
      }

     let log =  await DroneBatteryLog.create({
        model: drone.model,
        weightLimit: drone.weightLimit,
        unit: drone.unit,
        batteryCapacity: drone.batteryCapacity,
        state: drone.state,
        droneId: mongoose.Types.ObjectId(drone._id)
      });

      await log.save();
    }

    process.exit();
  } catch (error) {
    console.log("Error in cron", error);
    process.exit();
  }
};


const myArgs = process.argv.slice(2);
switch (myArgs[0]) {
  case "updateDroneState":
    updateDroneState();
    break;
  default:
    console.log("No Args found. I am not Running the Cron....");
}
