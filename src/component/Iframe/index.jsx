import React from 'react';
import './index.css';

const IframeRender = (props) => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  return (
    <div className='custom-iframe-box'>
      <iframe
        src={props.static}
        title='name'
        height={height}
        width={width}
        frameBorder={0}
      />
    </div>
  );
};
export default IframeRender;
