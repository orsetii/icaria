import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';

const TempCard = () => {
  const [temperature, setTemperature] = useState(0); // Set initial temperature value

  // Determine circle color based on temperature value
  const getCircleColor = () => {
    if (temperature < 10) {
      return 'bg-blue-300';
    } else if (temperature > 25) {
      return 'bg-red-300';
    } else {
      return 'bg-green-300';
    }
  };

  // Fetch temperature from API
  const fetchTemperature = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/temperature/`);
      const data = await response.json();
      setTemperature(data.temp);
    } catch (error) {
      console.error('Error fetching temperature:', error);
    }
  };

  useEffect(() => {
    // Fetch temperature initially
    fetchTemperature();

    // Fetch temperature every 0.5 seconds
    const intervalId = setInterval(fetchTemperature, 500);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div className="flex rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Internal Temperature */}
      <div className="flex flex-col justify-center items-center w-1/2 pr-4">
        <span className="text-xs font-medium mb-1">Internal Temperature</span>
        <div className={`h-16 w-16 rounded-full bg-blue-300 mb-2 flex items-center justify-center ${getCircleColor()}`}>
          <h4 className="text-title-xl font-bold text-black dark:text-white">
            {temperature}°C
          </h4>
        </div>
      </div>

      {/* Gap between sides */}
      <div className="w-1/12"></div>

      {/* External Temperature */}
      <div className="flex flex-col justify-center items-center w-1/2 pl-4">
        <span className="text-xs font-medium mb-1">External Temperature</span>
        <div className={`h-16 w-16 rounded-full bg-blue-300 mb-2 flex items-center justify-center ${getCircleColor()}`}>
          <h4 className="text-title-xl font-bold text-black dark:text-white">
            {temperature}°C
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TempCard;
