import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';

const TempCard = () => {
  const [internalTemperature, setInternalTemperature] = useState(0);
  const [externalTemperature, setExternalTemperature] = useState(0);

  const fetchTemperatures = async () => {
    try {
      const internalResponse = await fetch(`${API_BASE_URL}/temperature/internal`);
      const internalData = await internalResponse.json();
      setInternalTemperature(internalData.temperature);

      const externalResponse = await fetch(`${API_BASE_URL}/temperature/external`);
      const externalData = await externalResponse.json();
      setExternalTemperature(Math.round(externalData.temperature));
    } catch (error) {
      console.error('Error fetching temperatures:', error);
    }
  };

  useEffect(() => {
    fetchTemperatures();

    const intervalId = setInterval(fetchTemperatures, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getCircleColor = (temperature: number) => {
    if (temperature < 10) {
      return 'bg-blue-300';
    } else if (temperature > 25) {
      return 'bg-red-300';
    } else {
      return 'bg-green-300';
    }
  };

  return (
    <div className="flex rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col justify-center items-center w-1/2 pr-4">
        <span className="text-xs font-medium mb-1">Internal Temp.</span>
        <div className={`h-16 w-16 rounded-full mb-2 flex items-center justify-center ${getCircleColor(internalTemperature)}`}>
          <h4 className="text-title-xl font-bold text-black dark:text-white">
            {internalTemperature}°C
          </h4>
        </div>
      </div>

      <div className="w-1/12"></div>

      <div className="flex flex-col justify-center items-center w-1/2 pl-4">
        <span className="text-xs font-medium mb-1">External Temp.</span>
        <div className={`h-16 w-16 rounded-full mb-2 flex items-center justify-center ${getCircleColor(externalTemperature)}`}>
          <h4 className="text-title-xl font-bold text-black dark:text-white">
            {externalTemperature}°C
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TempCard;
