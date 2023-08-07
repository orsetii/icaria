import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig'; // Import the API base URL from the folder above

interface Command {
  id: number;
  timestamp: string;
  data: string;
  expanded: boolean;
}

const CanBusDisplay: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [rollingCommands, setRollingCommands] = useState<Command[]>([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/CAN/latest/50`);
        const data = await response.json();
        setCommands(data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };

    const intervalId = setInterval(fetchCommands, 500); // Fetch commands every 0.5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Update rollingCommands whenever new commands are received
    setRollingCommands(commands.slice(-10));
  }, [commands]);

  const toggleExpand = (id: number) => {
    setRollingCommands((prevCommands) =>
      prevCommands.map((command) =>
        command.id === id ? { ...command, expanded: !command.expanded } : command
      )
    );
  };

  return (
    <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-10">
      <h5 className="text-xl font-semibold text-black dark:text-white p-3 border-b border-stroke">
        Latest Commands
      </h5>

          {/* <!-- Alerts Item --> */}
          <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                  fill="#FBBF24"
                ></path>
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                TODO NOTE
              </h5>
              <p className="leading-relaxed text-[#D0915C]">
                We will update this in the future when the CAN format that icaria/daedalus will receive is.
                Currently it works in a very scuffed way, but it works. Leaving until then.
              </p>
            </div>
          </div>
          {/* <!-- Alerts Item --> */}
      <div className="h-96 overflow-y-scroll p-3">
        {rollingCommands.map((command) => (
          <div
            key={command.id}
            className={`mb-2 p-2 border rounded-sm border-stroke dark:border-strokedark ${
              command.expanded ? 'expanded' : ''
            }`}
          >
            <div
              className="cursor-pointer"
              onClick={() => toggleExpand(command.id)}
            >
              {command.data}
            </div>
            {command.expanded && (
              <div className="mt-2 text-sm text-gray dark:text-gray-300">
                Timestamp: {command.timestamp}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanBusDisplay;
