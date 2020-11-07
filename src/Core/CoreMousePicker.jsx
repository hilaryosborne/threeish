import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import { Raycaster, Vector2 } from 'three';
import { CoreContext } from '../CoreProvider';

export const FocusedObjectState = {
  current: [],
  set: function (GameObjects) {
    if (!this.changed(GameObjects)) {
      return undefined;
    }
    this.current = GameObjects;
    this.observable.next(GameObjects);
  },
  changed: function (GameObjects) {
    const _current = this.current.map((gameObject) => gameObject.object.uuid);
    const _next = GameObjects.map((gameObject) => gameObject.object.uuid);
    return JSON.stringify(_current) !== JSON.stringify(_next);
  },
  subscribe: function (args) {
    return this.observable.subscribe(args);
  },
  observable: new Subject(),
};

export const useFocusedGameObjects = () => {
  const [GameObjects, setGameObjects] = useState([]);
  useEffect(() => {
    FocusedObjectState.subscribe((NextGameObjects) => {
      setGameObjects(NextGameObjects);
    });
  }, []);
  return GameObjects;
};

const CoreMousePicker = () => {
  const { camera, scene, events } = useContext(CoreContext);
  const raycaster = useMemo(() => new Raycaster(), []);
  const mouse = useRef(new Vector2());
  const onMouseMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);
  const onRender = useCallback(() => {
    if (!scene || !camera) return;
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse.current, camera);
    // calculate objects intersecting the picking ray var intersects =
    const intersects = raycaster.intersectObjects(scene.children);
    FocusedObjectState.set(intersects);
  }, [scene, camera, raycaster]);
  useEffect(() => {
    const sub = events.addListener('render', onRender);
    return () => {
      sub.remove();
    };
  }, [onRender]);
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false);
    return () => {
      window.removeEventListener('mousemove', onMouseMove, false);
    };
  }, []);
  return <Fragment />;
};

export default CoreMousePicker;
