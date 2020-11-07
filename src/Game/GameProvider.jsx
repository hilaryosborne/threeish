import React, { createContext, useMemo, useState } from 'react';
import { EventEmitter } from 'fbemitter';

export const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [intersects, setIntersects] = useState([]);
  const events = useMemo(() => new EventEmitter(), []);
  const value = useMemo(
    () => ({
      events,
      renderer,
      setRenderer,
      scene,
      setScene,
      camera,
      setCamera,
      intersects,
      setIntersects,
    }),
    [events, renderer, setRenderer, scene, setScene, camera, setCamera, intersects, setIntersects],
  );
  const loop = () => {
    requestAnimationFrame(loop);
    if (!scene || !camera || !renderer) return;
    events.emit('render', scene, camera, renderer);
    renderer.render(scene, camera);
  };
  loop();
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
