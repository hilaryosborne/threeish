import React, { Fragment, useEffect, useRef } from 'react';
import { PerspectiveCamera } from 'three';

const CorePerspectiveCamera = ({ fov = 70, near = 0.01, far = 10, onChange = () => {} }) => {
  const camera = useRef(new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far));
  useEffect(() => {
    camera.current.position.z = 1;
    onChange(camera.current);
  }, [camera]);
  return <Fragment />;
};

export default CorePerspectiveCamera;
