// src/utils/generateRandomReadings.js
export const generateRandomReadings = () => {
    const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const systolic = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
    const diastolic = Math.floor(Math.random() * (85 - 70 + 1)) + 70;
    const respiratoryRate = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    const temperature = (Math.random() * (37.2 - 36.1) + 36.1).toFixed(1);
    const oxygenSaturation = Math.floor(Math.random() * (100 - 95 + 1)) + 95;
    const bloodGlucose = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
  
    return {
      heartRate,
      bloodPressure: { systolic, diastolic },
      respiratoryRate,
      temperature,
      oxygenSaturation,
      bloodGlucose,
      timestamp: new Date(),
    };
  };
  