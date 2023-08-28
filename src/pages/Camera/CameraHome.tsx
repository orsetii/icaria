import React from 'react';
import CameraFeed from '../../components/camera/CameraFeed';

const CameraHome: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <CameraFeed source="http://192.168.0.136:8000/stream.mjpg" placeholderText="Front Door" />
      <CameraFeed source="" placeholderText="Placeholder" />
      <CameraFeed source="" placeholderText="Placeholder" />
      <CameraFeed source="" placeholderText="Placeholder" />
      <CameraFeed source="" placeholderText="Placeholder" />
      <CameraFeed source="" placeholderText="Placeholder" />
    </div>
  );
};

export default CameraHome;
