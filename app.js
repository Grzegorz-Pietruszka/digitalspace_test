const CAR = { tank_capacity: 10, fuel_types: ["Diesel", "LPG", "Unleaded"] };
const VAN = { tank_capacity: 80, fuel_types: ["Diesel", "LPG"] };
const HGV = { tank_capacity: 80, fuel_types: ["Diesel"] };
const vehicleTypes = [CAR, VAN, HGV];
const fuelTypes = ["Diesel", "LPG", "Unleaded"];
let totalLitresDispensed = 0;
let vehiclesServiced = 0;
let vehiclesLeft = 0;
let fuellingTransactions = [];

const getRandomArrIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomVehicle = () => vehicleTypes[getRandomArrIndex(vehicleTypes)];

const getRandomFuelType = (vehicle) =>
  vehicle.fuel_types[getRandomArrIndex(vehicle.fuel_types)];

const getRandomFuelAmount = (vehicle) =>
  Math.floor(Math.random() * (vehicle.tank_capacity / 4));

const getRandomWaitTime = () =>
  Math.floor(Math.random() * (2200 - 1500 + 1) + 1500);

const simulateForecourt = () => {
  let queue = [];
  let pipes = {
    pipe1: { isAvailable: true },
    pipe2: { isAvailable: true },
    pipe3: { isAvailable: true },
    pipe4: { isAvailable: true },
    pipe5: { isAvailable: true },
    pipe6: { isAvailable: true },
    pipe7: { isAvailable: true },
    pipe8: { isAvailable: true },
    pipe9: { isAvailable: true },
  };

  setInterval(() => {
    if (queue.length < 5) {
      const vehicle = getRandomVehicle();
      const fuelAmount = vehicle.tank_capacity - getRandomFuelAmount(vehicle);
      queue.push({ vehicle, fuelAmount });
    }

    for (let i = 0; i < queue.length; i++) {
      const { vehicle, fuelAmount } = queue[i];
      const fuelType = getRandomFuelType(vehicle);
      const waitTime = getRandomWaitTime();

      const pipeKey = Object.keys(pipes).find((key) => pipes[key].isAvailable);
      if (pipeKey && waitTime < 2000) {
        pipes[pipeKey].isAvailable = false;
        totalLitresDispensed += fuelAmount;
        vehiclesServiced++;
        fuellingTransactions.push({
          dateTime: new Date(),
          fuelType,
          litresDispensed: fuelAmount,
        });

        setTimeout(() => {
          pipes[pipeKey].isAvailable = true;
        }, waitTime);
        queue.splice(i, 1);
        i--;
      } else {
        vehiclesLeft++;
        queue.splice(i, 1);
        i--;
      }
    }
    console.log({
      totalLitresDispensed,
      vehiclesServiced,
      vehiclesLeft,
      fuellingTransactions,
      pipes,
    });
  }, 1500);
};

simulateForecourt();
