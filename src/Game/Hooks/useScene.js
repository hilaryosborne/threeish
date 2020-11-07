import { useContext } from 'react';
import { GameContext } from '../GameProvider';

const useScene = () => {
  const { scene } = useContext(GameContext);
  return scene;
};

export default useScene;
