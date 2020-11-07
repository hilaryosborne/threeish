import React, { createContext, useMemo, useState } from 'react';
import { EventEmitter } from 'fbemitter';

export const CoreContext = createContext({});

const CoreProvider = ({ children }) => {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [highlighted, setHighlighted] = useState([]);
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
      highlighted,
      setHighlighted,
    }),
    [events, renderer, setRenderer, scene, setScene, camera, setCamera, highlighted, setHighlighted],
  );
  // console.log(highlighted);
  const loop = () => {
    requestAnimationFrame(loop);
    if (!scene || !camera || !renderer) return;
    events.emit('render', scene, camera, renderer);
    renderer.render(scene, camera);
  };
  loop();
  return <CoreContext.Provider value={value}>{children}</CoreContext.Provider>;
};

export default CoreProvider;
