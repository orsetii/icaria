import React from 'react';

interface CameraFeedProps {
  source: string;
  placeholderText: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ source, placeholderText }) => {
  return (
    <div className="flex flex-col items-center justify-center border rounded border-gray-300 shadow-md">
      <h3 className="text-lg font-medium mb-2">{placeholderText}</h3>
      {source ? (
        <img src={source} alt={`${placeholderText}`} className="max-w-full h-auto" />
      ) : (
        <div className="bg-gray-300 text-white w-full h-64 flex items-center justify-center">
          Placeholder {placeholderText}
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
