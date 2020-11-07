import React, { Fragment, useEffect, useRef } from 'react';
import { Scene, Color } from 'three';

const CoreScene = ({ onChange = () => {} }) => {
  const scene = useRef(new Scene());
  useEffect(() => {
    scene.current.background = new Color('skyblue');
    onChange(scene.current);
  }, [scene.current]);
  return <Fragment />;
};

export default CoreScene;
