import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BoxGeometry, MeshNormalMaterial, Mesh, Vector3 } from 'three';
import { CoreContext } from './CoreProvider';
import { useFocusedGameObjects } from './Core/CoreMousePicker';

const SimpleBox = ({ x = 0, y = 0, z = 0, onClick = () => {}, onHover = () => {}, onBlur = () => {} }) => {
  const { scene, events } = useContext(CoreContext);
  const geometry = useMemo(() => new BoxGeometry(0.2, 0.2, 0.2), []);
  const material = useMemo(() => new MeshNormalMaterial(), []);
  const mesh = useMemo(() => new Mesh(geometry, material), []);
  const [focused, setFocused] = useState(false);
  const FocusedGameObjects = useFocusedGameObjects();
  useEffect(() => {
    if (!scene) return;
    scene.add(mesh);
    mesh.position.set(x, y, z);
  }, [scene]);
  const onRender = useCallback(() => {
    if (!focused) {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;
    }
  }, [mesh, focused]);
  useEffect(() => {
    const subscription = events.addListener('render', onRender);
    return () => {
      subscription.remove();
    };
  }, [onRender]);
  useEffect(() => {
    const isHere = FocusedGameObjects.find((item) => item.object.uuid === mesh.uuid);
    if (isHere) {
      setFocused(true);
      onHover();
    } else if (focused) {
      setFocused(false);
      onBlur();
    }
  }, [FocusedGameObjects]);
  return <Fragment />;
};

export default SimpleBox;
