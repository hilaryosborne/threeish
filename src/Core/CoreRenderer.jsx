import React, { Fragment, useEffect, useRef } from 'react';
import { WebGLRenderer } from 'three';

const CoreRenderer = ({ children, onChange = () => {} }) => {
  const renderer = useRef(new WebGLRenderer({ antialias: true }));
  useEffect(() => {
    document.body.appendChild(renderer.current.domElement);
    onChange(renderer.current);
  }, [renderer.current]);
  useEffect(() => {
    renderer.current.setSize(window.innerWidth, window.innerHeight);
  }, [renderer.current]);
  return <Fragment>{children}</Fragment>;
};

export default CoreRenderer;
