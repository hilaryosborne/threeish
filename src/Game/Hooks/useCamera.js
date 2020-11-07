import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../GameProvider';

const useCamera = () => {
  const { camera } = useContext(GameContext);
  const [currentCamera, setCurrentCamera] = useState(camera);
  useEffect(() => {
    setCurrentCamera(camera);
  }, [camera]);
  return currentCamera;
};

export default useCamera;
