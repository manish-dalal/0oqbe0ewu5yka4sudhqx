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
        sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation '
      />
    </div>
  );
};
export default IframeRender;
