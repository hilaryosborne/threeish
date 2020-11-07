import { useContext } from 'react';
import { GameContext } from '../GameProvider';

const useRenderer = () => {
  const { renderer } = useContext(GameContext);
  return renderer;
};

export default useRenderer;
