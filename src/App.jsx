import React, { useContext } from 'react';
import CoreProvider, { CoreContext } from './CoreProvider';
import CoreRenderer from './Core/CoreRenderer';
import CoreScene from './Core/CoreScene';
import CorePerspectiveCamera from './Core/CorePerspectiveCamera';
import SimpleBox from './SimpleBox';
import CoreMousePicker from './Core/CoreMousePicker';

const App = () => {
  const { setRenderer, setCamera, setScene } = useContext(CoreContext);
  return (
    <div className="App">
      <CoreRenderer onChange={setRenderer}>
        <CoreMousePicker />
        <CorePerspectiveCamera onChange={setCamera} />
        <CoreScene onChange={setScene} />
        <SimpleBox
          onClick={() => {
            console.log('CLICKED');
          }}
          onHover={() => {
            console.log('I AM THE CHOSEN ONE');
          }}
          onBlur={() => {
            console.log('I AM NOT THE CHOSEN ONE');
          }}
        />
        <SimpleBox x={0.3} />
        <SimpleBox x={0.6} />
      </CoreRenderer>
    </div>
  );
};

const HasProvider = (props) => (
  <CoreProvider>
    <App {...props} />
  </CoreProvider>
);

export default HasProvider;
